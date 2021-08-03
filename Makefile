REPOSITORY = 094814489188.dkr.ecr.us-east-2.amazonaws.com
REGION = us-east-2
APIPOD = $$(kubectl get pod -l app=bitmaker-django-api -o jsonpath="{.items[0].metadata.name}")
API_DOC = docs/api.yaml
DEVTAG = dev-$$USER


.PHONY: start
start:
	-minikube start --feature-gates="TTLAfterFinished=true"
	-docker compose up -d


.PHONY: stop
stop:
	-minikube stop
	-docker compose stop


.PHONY: setup
setup: build-api-image upload-api-image
	-kubectl apply -f config/kubernetes-local/bitmaker-api-secrets.yaml
	-kubectl apply -f config/kubernetes-local/bitmaker-api-configmaps.yaml
	-kubectl apply -f config/kubernetes-local/aws-registry-cronjob.yaml
	-kubectl apply -f config/kubernetes-local/bitmaker-api-deployments.yaml
	-kubectl set image deployment/bitmaker-django-api bitmaker-django-api=$(REPOSITORY)/bitmaker-django-api:$(DEVTAG)


.PHONY: rebuild
rebuild: build-api-image upload-api-image
	-kubectl apply -f config/kubernetes-local/bitmaker-api-secrets.yaml
	-kubectl apply -f config/kubernetes-local/bitmaker-api-configmaps.yaml
	-kubectl rollout restart deployment bitmaker-django-api
	-kubectl set image deployment/bitmaker-django-api bitmaker-django-api=$(REPOSITORY)/bitmaker-django-api:$(DEVTAG)


.PHONY: down
down:
	-kubectl delete -f config/kubernetes-local/bitmaker-api-secrets.yaml
	-kubectl delete -f config/kubernetes-local/bitmaker-api-configmaps.yaml
	-kubectl delete -f config/kubernetes-local/aws-registry-cronjob.yaml
	-kubectl delete -f config/kubernetes-local/bitmaker-api-services.yaml
	-kubectl delete -f config/kubernetes-local/bitmaker-api-deployments.yaml
	-kubectl delete jobs $$(kubectl get jobs -o custom-columns=:.metadata.name)
	-kubectl delete cronjobs $$(kubectl get cronjobs -o custom-columns=:.metadata.name)
	-minikube delete
	-docker compose down


.PHONY: test
test:
	-kubectl exec $(APIPOD) -- pytest -svx


.PHONY: makemigrations
makemigrations:
	-kubectl exec $(APIPOD) -- python manage.py makemigrations


.PHONY: migrate
migrate:
	-kubectl exec $(APIPOD) -- python manage.py migrate


.PHONY: createsuperuser
createsuperuser:
	-kubectl exec --stdin --tty $(APIPOD) -- python manage.py createsuperuser


.PHONY: login-ecr
login-ecr:
	-aws ecr get-login-password --region $(REGION) | docker login \
	   --username AWS --password-stdin  $(REPOSITORY)


.PHONY: build-all-images
build-all-images:
	-docker build . --file docker-conf/Dockerfile-django-api --tag bitmaker-django-api:$(DEVTAG)
	-docker build . --file docker-conf/Dockerfile-celery-worker --tag bitmaker-celery-worker:$(DEVTAG)
	-docker build . --file docker-conf/Dockerfile-celery-beat --tag bitmaker-celery-beat:$(DEVTAG)
	-docker build . --file docker-conf/Dockerfile-redis --tag bitmaker-redis:$(DEVTAG)


.PHONY: upload-all-images
upload-all-images: login-ecr
	-docker tag bitmaker-django-api:$(DEVTAG) $(REPOSITORY)/bitmaker-django-api:$(DEVTAG)
	-docker tag bitmaker-celery-beat:$(DEVTAG) $(REPOSITORY)/bitmaker-celery-beat:$(DEVTAG)
	-docker tag bitmaker-celery-worker:$(DEVTAG) $(REPOSITORY)/bitmaker-celery-worker:$(DEVTAG)
	-docker tag bitmaker-redis:$(DEVTAG) $(REPOSITORY)/bitmaker-redis:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-django-api:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-celery-beat:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-celery-worker:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-redis:$(DEVTAG)


.PHONY: build-api-image
build-api-image:
	-docker build . --file docker-conf/Dockerfile-django-api --tag bitmaker-django-api:$(DEVTAG)


.PHONY: upload-api-image
upload-api-image: login-ecr
	-docker tag bitmaker-django-api:$(DEVTAG) $(REPOSITORY)/bitmaker-django-api:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-django-api:$(DEVTAG)


.PHONY: docs
docs:
	-rm $API_DOC
	-kubectl exec $(APIPOD) -- rm $(API_DOC)
	-kubectl exec $(APIPOD) -- python manage.py generate_swagger -f yaml $(API_DOC)
	-(kubectl exec $(APIPOD) -- cat $(API_DOC)) > $(API_DOC)


.PHONY: lint
lint:
	-black .

REPOSITORY = 094814489188.dkr.ecr.us-east-2.amazonaws.com
REGION = us-east-2
DEVTAG = dev-$$USER


.PHONY: login-ecr
login-ecr:
	-aws ecr get-login-password --region $(REGION) | docker login \
	   --username AWS --password-stdin  $(REPOSITORY)


.PHONY: start
start:
	-docker compose start


.PHONY: stop
stop:
	-docker compose stop


.PHONY: setup
setup:
	-docker compose up -d
	-kubectl apply -f kubernetes/local/bitmaker-kafka-secrets.yaml
	-kubectl apply -f kubernetes/local/bitmaker-kafka-services.yaml
	-kubectl apply -f kubernetes/local/bitmaker-kafka-consumers.yaml
	-kubectl set image deployment/kafka-items-consumer consumer=$(REPOSITORY)/bitmaker-consumer:$(DEVTAG)
	-kubectl set image deployment/kafka-requests-consumer consumer=$(REPOSITORY)/bitmaker-consumer:$(DEVTAG)


.PHONY: down
down:
	-kubectl delete -f kubernetes/local/bitmaker-kafka-secrets.yaml
	-kubectl delete -f kubernetes/local/bitmaker-kafka-services.yaml
	-kubectl delete -f kubernetes/local/bitmaker-kafka-consumers.yaml
	-docker compose down


.PHONY: rebuild
rebuild: build-consumer-image upload-consumer-image
	-kubectl apply -f kubernetes/local/bitmaker-kafka-secrets.yaml
	-kubectl apply -f kubernetes/local/bitmaker-kafka-consumers.yaml
	-kubectl set image deployment/kafka-items-consumer consumer=$(REPOSITORY)/bitmaker-consumer:$(DEVTAG)
	-kubectl set image deployment/kafka-requests-consumer consumer=$(REPOSITORY)/bitmaker-consumer:$(DEVTAG)


.PHONY: build-consumer-image
build-consumer-image:
	-docker build . --tag bitmaker-consumer:$(DEVTAG)


.PHONY: upload-consumer-image
upload-consumer-image: login-ecr
	-docker tag bitmaker-consumer:$(DEVTAG) $(REPOSITORY)/bitmaker-consumer:$(DEVTAG)
	-docker push $(REPOSITORY)/bitmaker-consumer:$(DEVTAG)

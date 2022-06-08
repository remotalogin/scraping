from datetime import timedelta

from api import errors
from api.serializers.job_specific import (
    SpiderJobArgSerializer,
    SpiderJobEnvVarSerializer,
    SpiderJobTagSerializer,
)
from config.job_manager import job_manager
from core.models import SpiderJob, SpiderJobArg, SpiderJobEnvVar, SpiderJobTag
from rest_framework import serializers


class SpiderJobSerializer(serializers.ModelSerializer):
    args = SpiderJobArgSerializer(many=True, required=False)
    env_vars = SpiderJobEnvVarSerializer(many=True, required=False)
    tags = SpiderJobTagSerializer(many=True, required=False)

    class Meta:
        model = SpiderJob
        fields = (
            "jid",
            "spider",
            "created",
            "name",
            "lifespan",
            "total_response_bytes",
            "args",
            "env_vars",
            "tags",
            "job_status",
            "cronjob",
        )


class SpiderJobCreateSerializer(serializers.ModelSerializer):
    args = SpiderJobArgSerializer(many=True, required=False)
    env_vars = SpiderJobEnvVarSerializer(many=True, required=False)
    tags = SpiderJobTagSerializer(many=True, required=False)

    class Meta:
        model = SpiderJob
        fields = (
            "jid",
            "name",
            "args",
            "env_vars",
            "tags",
            "job_status",
            "cronjob",
        )

    def create(self, validated_data):
        args_data = validated_data.pop("args", [])
        env_vars_data = validated_data.pop("env_vars", [])
        tags_data = validated_data.pop("tags", [])

        job = SpiderJob.objects.create(**validated_data)
        for arg in args_data:
            SpiderJobArg.objects.create(job=job, **arg)

        for env_var in env_vars_data:
            SpiderJobEnvVar.objects.create(job=job, **env_var)

        for tag_data in tags_data:
            tag, _ = SpiderJobTag.objects.get_or_create(**tag_data)
            job.tags.add(tag)

        job.save()

        return job


class SpiderJobUpdateSerializer(serializers.ModelSerializer):
    allowed_status_to_stop = [
        SpiderJob.WAITING_STATUS,
        SpiderJob.RUNNING_STATUS,
        SpiderJob.ERROR_STATUS,
    ]

    class Meta:
        model = SpiderJob
        fields = (
            "jid",
            "status",
            "lifespan",
            "total_response_bytes",
        )

    def update(self, instance, validated_data):
        status = validated_data.get("status", instance.status)
        if status != instance.status:
            if instance.status == SpiderJob.STOPPED_STATUS:
                raise serializers.ValidationError({"error": "Job is stopped"})
            if status == SpiderJob.WAITING_STATUS:
                raise serializers.ValidationError({"error": "Invalid status"})
            if status == SpiderJob.STOPPED_STATUS:
                if not instance.status in self.allowed_status_to_stop:
                    raise serializers.ValidationError(
                        {
                            "error": errors.JOB_NOT_STOPPED.format(
                                *self.allowed_status_to_stop
                            )
                        }
                    )
                else:
                    job_manager.delete_job(instance.name)
            instance.status = status

        if instance.lifespan.seconds == 0:
            lifespan = validated_data.get("lifespan", instance.lifespan)
            instance.lifespan = lifespan

        if instance.total_response_bytes == 0:
            total_response_bytes = validated_data.get(
                "total_response_bytes", instance.total_response_bytes
            )
            instance.total_response_bytes = total_response_bytes

        instance.save()
        return instance


class GetLogsSerializer(serializers.Serializer):
    logs = serializers.ListField(
        child=serializers.CharField(max_length=1000), required=True
    )
    count = serializers.IntegerField(required=True)


class ProjectJobSerializer(serializers.Serializer):
    results = SpiderJobSerializer(many=True, required=True)
    count = serializers.IntegerField(required=True)

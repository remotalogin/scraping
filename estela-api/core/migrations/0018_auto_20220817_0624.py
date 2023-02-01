# Generated by Django 3.1.1 on 2022-08-17 06:24

import datetime
import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("core", "0017_auto_20220621_1353"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="deleted",
            field=models.BooleanField(
                default=False, help_text="Whether the project was deleted."
            ),
        ),
        migrations.AddField(
            model_name="spiderjob",
            name="item_count",
            field=models.PositiveBigIntegerField(
                default=0, help_text="The number of items extracted in the job."
            ),
        ),
        migrations.AddField(
            model_name="spiderjob",
            name="lifespan",
            field=models.DurationField(
                default=datetime.timedelta(0),
                help_text="The elapsed seconds the spider job was running.",
            ),
        ),
        migrations.AddField(
            model_name="spiderjob",
            name="request_count",
            field=models.PositiveBigIntegerField(
                default=0, help_text="The number of requests made by the spider job."
            ),
        ),
        migrations.AddField(
            model_name="spiderjob",
            name="total_response_bytes",
            field=models.PositiveBigIntegerField(
                default=0, help_text="The total bytes received in responses."
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True, help_text="Deploy creation date."
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="did",
            field=models.AutoField(
                help_text="A unique integer value identifying this deploy.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="project",
            field=models.ForeignKey(
                help_text="Project UUID.",
                on_delete=django.db.models.deletion.CASCADE,
                to="core.project",
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="spiders",
            field=models.ManyToManyField(
                help_text="Spiders in this deploy.", to="core.Spider"
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="status",
            field=models.CharField(
                choices=[
                    ("SUCCESS", "Success"),
                    ("BUILDING", "Building"),
                    ("FAILURE", "Failure"),
                    ("CANCELED", "Canceled"),
                ],
                default="BUILDING",
                help_text="Deploy status.",
                max_length=12,
            ),
        ),
        migrations.AlterField(
            model_name="deploy",
            name="user",
            field=models.ForeignKey(
                help_text="User who performed the deploy.",
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="permission",
            name="permission",
            field=models.CharField(
                choices=[
                    ("EDITOR", "Editor"),
                    ("VIEWER", "Viewer"),
                    ("OWNER", "Owner"),
                ],
                default="VIEWER",
                help_text="Permission on this project.",
                max_length=16,
            ),
        ),
        migrations.AlterField(
            model_name="permission",
            name="project",
            field=models.ForeignKey(
                help_text="Project UUID.",
                on_delete=django.db.models.deletion.CASCADE,
                to="core.project",
            ),
        ),
        migrations.AlterField(
            model_name="permission",
            name="user",
            field=models.ForeignKey(
                help_text="User.",
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="name",
            field=models.CharField(help_text="Project's name.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="project",
            name="pid",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                help_text="A UUID identifying this project.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="users",
            field=models.ManyToManyField(
                help_text="Users with permissions on this project.",
                through="core.Permission",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="spider",
            name="deleted",
            field=models.BooleanField(
                default=False, help_text="True if the spider has been deleted."
            ),
        ),
        migrations.AlterField(
            model_name="spider",
            name="name",
            field=models.CharField(help_text="Spider's name.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="spider",
            name="project",
            field=models.ForeignKey(
                help_text="Project UUID.",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="spiders",
                to="core.project",
            ),
        ),
        migrations.AlterField(
            model_name="spider",
            name="sid",
            field=models.AutoField(
                help_text="A unique integer value identifying this spider.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="cjid",
            field=models.AutoField(
                help_text="A unique integer value identifying this cron job.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True, help_text="Cron job creation date."
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="data_expiry_days",
            field=models.PositiveSmallIntegerField(
                help_text="Days before data expires.", null=True
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="data_status",
            field=models.CharField(
                choices=[
                    ("PERSISTENT", "Persistent"),
                    ("DELETED", "Deleted"),
                    ("PENDING", "Pending"),
                ],
                default="PERSISTENT",
                help_text="Data status.",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="schedule",
            field=models.CharField(
                blank=True, help_text="Cron job schedule definition.", max_length=20
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="spider",
            field=models.ForeignKey(
                help_text="Spider sid.",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="cronjobs",
                to="core.spider",
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="status",
            field=models.CharField(
                choices=[("ACTIVE", "Active"), ("DISABLED", "Disabled")],
                default="ACTIVE",
                help_text="Cron job status.",
                max_length=16,
            ),
        ),
        migrations.AlterField(
            model_name="spidercronjob",
            name="unique_collection",
            field=models.BooleanField(
                default=False,
                help_text="True if this cron job stores its items in a unique collection.",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="created",
            field=models.DateTimeField(
                auto_now_add=True, help_text="Job creation date."
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="cronjob",
            field=models.ForeignKey(
                help_text="Related cron job.",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="jobs",
                to="core.spidercronjob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="data_expiry_days",
            field=models.PositiveSmallIntegerField(
                help_text="Days before data expires.", null=True
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="data_status",
            field=models.CharField(
                choices=[
                    ("PERSISTENT", "Persistent"),
                    ("DELETED", "Deleted"),
                    ("PENDING", "Pending"),
                ],
                default="PERSISTENT",
                help_text="Data status.",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="jid",
            field=models.AutoField(
                help_text="A unique integer value identifying this job.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="spider",
            field=models.ForeignKey(
                help_text="Spider sid.",
                on_delete=django.db.models.deletion.CASCADE,
                related_name="jobs",
                to="core.spider",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjob",
            name="status",
            field=models.CharField(
                choices=[
                    ("IN_QUEUE", "In queue"),
                    ("WAITING", "Waiting"),
                    ("RUNNING", "Running"),
                    ("STOPPED", "Stopped"),
                    ("INCOMPLETE", "Incomplete"),
                    ("CANCELLED", "Cancelled"),
                    ("COMPLETED", "Completed"),
                    ("ERROR", "Error"),
                ],
                default="WAITING",
                help_text="Job status.",
                max_length=16,
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobarg",
            name="aid",
            field=models.AutoField(
                help_text="A unique integer value identifying this job argument.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobarg",
            name="cronjob",
            field=models.ForeignKey(
                help_text="Cron job cjid.",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="cargs",
                to="core.spidercronjob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobarg",
            name="job",
            field=models.ForeignKey(
                help_text="Job jid.",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="args",
                to="core.spiderjob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobarg",
            name="name",
            field=models.CharField(help_text="Argument name.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="spiderjobarg",
            name="value",
            field=models.CharField(help_text="Argument value.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="spiderjobenvvar",
            name="cronjob",
            field=models.ForeignKey(
                help_text="Cron job cjid.",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="cenv_vars",
                to="core.spidercronjob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobenvvar",
            name="evid",
            field=models.AutoField(
                help_text="A unique integer value identifying this job env variable.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobenvvar",
            name="job",
            field=models.ForeignKey(
                help_text="Job jid.",
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="env_vars",
                to="core.spiderjob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobenvvar",
            name="name",
            field=models.CharField(help_text="Env variable name.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="spiderjobenvvar",
            name="value",
            field=models.CharField(help_text="Env variable value.", max_length=1000),
        ),
        migrations.AlterField(
            model_name="spiderjobtag",
            name="cronjobs",
            field=models.ManyToManyField(
                blank=True,
                help_text="Related cron jobs to this tag.",
                related_name="ctags",
                to="core.SpiderCronJob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobtag",
            name="jobs",
            field=models.ManyToManyField(
                blank=True,
                help_text="Related jobs to this tag.",
                related_name="tags",
                to="core.SpiderJob",
            ),
        ),
        migrations.AlterField(
            model_name="spiderjobtag",
            name="name",
            field=models.CharField(help_text="Tag name.", max_length=50),
        ),
        migrations.AlterField(
            model_name="spiderjobtag",
            name="tid",
            field=models.AutoField(
                help_text="A unique integer value identifying this tag.",
                primary_key=True,
                serialize=False,
            ),
        ),
        migrations.CreateModel(
            name="UsageRecord",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, help_text="Usage record creation date."
                    ),
                ),
                ("processing_time", models.DurationField(help_text="Time of CPU use.")),
                (
                    "network_usage",
                    models.PositiveBigIntegerField(
                        help_text="Amount of network bytes used."
                    ),
                ),
                (
                    "item_count",
                    models.PositiveBigIntegerField(
                        help_text="Amount of items extracted."
                    ),
                ),
                (
                    "request_count",
                    models.PositiveBigIntegerField(
                        help_text="Amount of requests made."
                    ),
                ),
                (
                    "items_data_size",
                    models.PositiveBigIntegerField(
                        help_text="Amount in bytes occupied by items in the database"
                    ),
                ),
                (
                    "requests_data_size",
                    models.PositiveBigIntegerField(
                        help_text="Amount in bytes occupied by requests in the database"
                    ),
                ),
                (
                    "logs_data_size",
                    models.PositiveBigIntegerField(
                        help_text="Amount in bytes occupied by logs in the database"
                    ),
                ),
                (
                    "project",
                    models.ForeignKey(
                        help_text="Project to which the usage record corresponds.",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="core.project",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]

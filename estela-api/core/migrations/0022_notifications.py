# Generated by Django 3.1.14 on 2022-11-13 22:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("core", "0021_spidercronjob_deleted"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "nid",
                    models.AutoField(
                        help_text="A unique integer value identifying each notification",
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "message",
                    models.CharField(
                        help_text="Notifications message.", max_length=1000
                    ),
                ),
                (
                    "redirectto",
                    models.CharField(
                        help_text="The direction where the notification will redirect.",
                        max_length=100,
                    ),
                ),
                (
                    "seen",
                    models.BooleanField(
                        default=False, help_text="Whether the notification was seen."
                    ),
                ),
                (
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, help_text="Notification send date."
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        help_text="User whose this notification belongs to.",
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
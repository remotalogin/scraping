# Generated by Django 3.1.1 on 2021-06-09 16:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SpiderJobArg",
            fields=[
                ("aid", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=1000)),
                ("value", models.CharField(max_length=1000)),
                (
                    "job",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="args",
                        to="core.spiderjob",
                    ),
                ),
            ],
        ),
    ]

# Generated by Django 3.1.1 on 2022-08-17 08:30

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_auto_20220817_0624'),
    ]

    operations = [
        migrations.AddField(
            model_name='spiderjob',
            name='resources',
            field=models.JSONField(default=core.models.spiderjob_resources_default),
        ),
    ]

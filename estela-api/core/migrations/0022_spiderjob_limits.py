# Generated by Django 3.1.14 on 2023-01-09 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0021_spidercronjob_deleted"),
    ]

    operations = [
        migrations.AddField(
            model_name="spiderjob",
            name="limits",
            field=models.JSONField(
                default=dict, help_text="Resource limits applied to the spider job."
            ),
        ),
    ]
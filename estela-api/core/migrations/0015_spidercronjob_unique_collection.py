# Generated by Django 3.1.1 on 2021-12-31 00:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0014_addnewusersfield"),
    ]

    operations = [
        migrations.AddField(
            model_name="spidercronjob",
            name="unique_collection",
            field=models.BooleanField(default=False),
        ),
    ]

# Generated by Django 3.1.14 on 2023-10-09 17:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0033_auto_20230814_2238"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProxyProvider",
            fields=[
                (
                    "proxyid",
                    models.AutoField(
                        help_text="A unique integer value identifying this proxy.",
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        help_text="The username for the proxy", max_length=255
                    ),
                ),
                (
                    "password",
                    models.CharField(
                        help_text="The password for the proxy", max_length=255
                    ),
                ),
                (
                    "host",
                    models.CharField(
                        help_text="The host for the proxy", max_length=255
                    ),
                ),
                (
                    "port",
                    models.CharField(help_text="The port for the proxy", max_length=5),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="A name to identify the proxy", max_length=255
                    ),
                ),
                (
                    "description",
                    models.CharField(
                        help_text="A description for the proxy", max_length=1000
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="spiderjob",
            name="proxy_usage_data",
            field=models.JSONField(default=dict, help_text="Proxy Usage data."),
        ),
        migrations.AddField(
            model_name="usagerecord",
            name="datacenter_proxy_usage",
            field=models.PositiveBigIntegerField(
                default=0,
                help_text="Amount in bytes occupied by datacenter proxy responses in the database",
            ),
        ),
        migrations.AddField(
            model_name="usagerecord",
            name="residential_proxy_usage",
            field=models.PositiveBigIntegerField(
                default=0,
                help_text="Amount in bytes occupied by residential proxy responses in the database",
            ),
        ),
    ]

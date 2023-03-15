"""
Django settings for estela project.

Generated by 'django-admin startproject' using Django 3.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from urllib.parse import urlparse
import environ
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Set environment variables from environment file
env = environ.Env(
    DB_NAME=(str, "estela_db"),
    DB_USER=(str, "dummy"),
    DB_PASSWORD=(str, "dummy"),
    DB_HOST=(str, "db"),
    DB_PORT=(str, "port"),
    REGISTRY_HOST=(str, "dummy"),
    REPOSITORY_NAME=(str, "dummy"),
    CELERY_BROKER_URL=(str, "redis://redis"),
    CELERY_RESULT_BACKEND=(str, "redis://redis:6379/0"),
    CELERY_EXTERNAL_IMPORTS=(str, ""),
    DJANGO_API_HOST=(str, "127.0.0.1"),
    DJANGO_ALLOWED_HOSTS=(str, ""),
    DJANGO_EXTERNAL_APPS=(str, ""),
    EXTERNAL_APP_KEYS=(str, "dummy"),
    EXTERNAL_MIDDLEWARES=(str, ""),
    KAFKA_HOSTS=(str, "127.0.0.1"),
    KAFKA_PORT=(str, "dummy"),
    CORS_ORIGIN_WHITELIST=(str, "http://127.0.0.1:3000"),
    AWS_ACCESS_KEY_ID=(str, "dummy"),
    AWS_SECRET_ACCESS_KEY=(str, "dummy"),
    AWS_DEFAULT_REGION=(str, "us-east-2"),
    AWS_STORAGE_BUCKET_NAME=(str, "estela-django-api"),
    BUCKET_NAME_PROJECTS=(str, "dummy"),
    SECRET_KEY=(str, "dummy"),
    ENGINE=(str, "dummy"),
    STAGE=(str, "DEVELOPMENT"),
    SPIDERDATA_DB_ENGINE=(str, "dummy"),
    SPIDERDATA_DB_CONNECTION=(str, "dummy"),
    SPIDERDATA_DB_CERTIFICATE_PATH=(str, "dummy"),
    CREDENTIALS=(str, "dummy"),
    EMAIL_HOST_USER=(str, "dummy"),
    EMAIL_HOST_PASSWORD=(str, "dummy"),
    EMAILS_TO_ALERT=(str, "dummy"),
    REGISTER=(str, "dummy"),
    EMAIL_HOST=(str, "dummy"),
    EMAIL_PORT=(str, "dummy"),
    VERIFICATION_EMAIL=(str, "dummy"),
)

environ.Env.read_env(env_file=".env")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
STAGE = env("STAGE")

DJANGO_API_HOST = env("DJANGO_API_HOST")
ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS").split(",")


DJANGO_EXTERNAL_APPS = [x for x in env("DJANGO_EXTERNAL_APPS").split(",") if x]
EXTERNAL_APP_KEYS = [x for x in env("EXTERNAL_APP_KEYS").split(",") if x]
EXTERNAL_MIDDLEWARES = [x for x in env("EXTERNAL_MIDDLEWARES").split(",") if x]


# Application definition

DEFAULT_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "django_celery_beat",
    "drf_yasg",
    "rest_framework",
    "rest_framework.authtoken",
]

PROJECT_APPS = [
    "api",
    "core.apps.CoreConfig",
]

INSTALLED_APPS = DEFAULT_APPS + THIRD_PARTY_APPS + PROJECT_APPS + DJANGO_EXTERNAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

MIDDLEWARE = MIDDLEWARE + EXTERNAL_MIDDLEWARES

CORS_ORIGIN_WHITELIST = env("CORS_ORIGIN_WHITELIST").split(",")

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
    {
        "NAME": "core.validators.AlphanumericValidator",
    },
    {
        "NAME": "core.validators.MixedCaseValidator",
    },
]

PASSWORD_RESET_TIMEOUT = 60  # In seconds


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = "/static/"
MEDIA_URL = "/media/"

STATIC_ROOT = "/static/"


# API limit data download settings (bytes)
MAX_DOWNLOADED_SIZE = 8 * 1024 * 1024
MAX_CHUNK_SIZE = 512 * 1024


# Pagination settings used in api_app

API_PAGE_SIZE = 100  # Paginator page size
API_MAX_PAGE_SIZE = 100  # Maximum allowable requested page size


# Container Registry Settings

REGISTRY_HOST = env("REGISTRY_HOST")
REPOSITORY_NAME = env("REPOSITORY_NAME")


# Celery settings

CELERY_BROKER_URL = env("CELERY_BROKER_URL")
CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND")
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

CELERY_EXTERNAL_IMPORTS = [
    app for app in env("CELERY_EXTERNAL_IMPORTS").split(",") if app
]
CELERY_IMPORTS = ["config.celery"] + CELERY_EXTERNAL_IMPORTS


# Kafka settings

KAFKA_HOSTS = env("KAFKA_HOSTS")
KAFKA_PORT = env("KAFKA_PORT")


# Cluster settings

MULTI_NODE_MODE = False


SWAGGER_SETTINGS = {
    "DEFAULT_INFO": "docs.settings.api_info",
    "DEFAULT_GENERATOR_CLASS": "docs.settings.APISchemeGenerator",
    "DEFAULT_API_URL": "http://127.0.0.1:8000",
}

# AWS configurations
AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY")
AWS_DEFAULT_REGION = env("AWS_DEFAULT_REGION")

# S3 Bucket for projects
PROJECT_BUCKET = env("BUCKET_NAME_PROJECTS")

# Project image name
BUILD_PROJECT_IMAGE = "{}/estela-build-project".format(
    urlparse(REGISTRY_HOST).netloc or REGISTRY_HOST
)

# Test image name
TEST_DOCKER_IMAGE = "{}/estela-project-demo:test".format(
    urlparse(REGISTRY_HOST).netloc or REGISTRY_HOST
)

# Engine
ENGINE = env("ENGINE")
CREDENTIALS = env("CREDENTIALS")
SPIDERDATA_DB_ENGINE = env("SPIDERDATA_DB_ENGINE")

# Spiderdata Database settings
SPIDERDATA_DB_CONNECTION = env("SPIDERDATA_DB_CONNECTION")
SPIDERDATA_DB_PRODUCTION = True
SPIDERDATA_DB_CERTIFICATE_PATH = env("SPIDERDATA_DB_CERTIFICATE_PATH")

# Email confirmation
EMAIL_USE_TLS = True
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_PORT = env("EMAIL_PORT")
EMAILS_TO_ALERT = env("EMAILS_TO_ALERT")

# Accept new Users
REGISTER = env("REGISTER")

# Verification Email
VERIFICATION_EMAIL = env("VERIFICATION_EMAIL")

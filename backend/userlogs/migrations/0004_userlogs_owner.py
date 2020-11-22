# Generated by Django 3.1.3 on 2020-11-22 02:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userlogs', '0003_auto_20201121_1937'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlogs',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='logs', to=settings.AUTH_USER_MODEL),
        ),
    ]

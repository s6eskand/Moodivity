# Generated by Django 3.1.3 on 2020-11-21 10:10

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='moodDateList',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default='0', max_length=200), null=True, size=None),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='moodList',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default='0', max_length=200), null=True, size=None),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='activities',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, default='NULL', max_length=200), null=True, size=None),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='endTime',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='prodGoal',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='startTime',
            field=models.CharField(max_length=100, null=True),
        ),
    ]

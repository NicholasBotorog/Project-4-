# Generated by Django 4.0.5 on 2022-06-16 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title',
            field=models.CharField(default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='review',
            name='text',
            field=models.CharField(max_length=500),
        ),
    ]

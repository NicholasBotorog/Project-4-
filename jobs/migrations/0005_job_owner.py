# Generated by Django 4.0.5 on 2022-06-10 10:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0004_rename_location_job_job_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='owner',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='job', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

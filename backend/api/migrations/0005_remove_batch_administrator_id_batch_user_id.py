# Generated by Django 4.2.3 on 2023-07-25 15:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_rename_administrator_batch_administrator_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="batch",
            name="administrator_id",
        ),
        migrations.AddField(
            model_name="batch",
            name="user_id",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]

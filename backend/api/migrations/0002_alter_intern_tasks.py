# Generated by Django 4.2.3 on 2023-08-17 10:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="intern",
            name="tasks",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="api.tasks"
            ),
        ),
    ]

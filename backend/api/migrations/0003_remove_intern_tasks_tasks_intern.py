# Generated by Django 4.2.3 on 2023-08-21 12:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_alter_intern_tasks"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="intern",
            name="tasks",
        ),
        migrations.AddField(
            model_name="tasks",
            name="intern",
            field=models.ForeignKey(
                default=1, on_delete=django.db.models.deletion.CASCADE, to="api.intern"
            ),
            preserve_default=False,
        ),
    ]

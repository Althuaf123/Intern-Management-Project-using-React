# Generated by Django 4.2.3 on 2023-07-25 05:16

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_batch_administrator_alter_intern_batch_id"),
    ]

    operations = [
        migrations.RenameField(
            model_name="batch",
            old_name="administrator",
            new_name="administrator_id",
        ),
    ]

# Generated by Django 2.0.3 on 2018-04-29 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thefederation', '0012_platform_version_clean_style'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stat',
            name='date',
            field=models.DateField(db_index=True),
        ),
        migrations.AlterUniqueTogether(
            name='stat',
            unique_together={('date', 'node'), ('date', 'platform'), ('date', 'protocol')},
        ),
    ]
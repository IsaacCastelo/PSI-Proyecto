# Generated by Django 4.2.11 on 2024-04-08 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('punto_de_venta', '0005_alter_pedido_cambio_alter_pedido_fecha_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='nombre_cliente',
            field=models.CharField(max_length=255, null=True),
        ),
    ]

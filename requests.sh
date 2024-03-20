!#/bin/bash
# Obtener mesas
curl -X GET http://localhost:8000/mesas/
# Crear una nueva mesa:
curl -X POST http://localhost:8000/mesas/ \
     -H 'Content-Type: application/json' \
     -d '{"id": "M01"}'
# Otener platillos
curl -X GET http://localhost:8000/platillos/
# Crear un nuevo platillo:
curl -X POST http://localhost:8000/platillos/ \
     -H 'Content-Type: application/json' \
     -d '{"nombre": "Tacos", "descripción": "Tacos de carne asada", "precio": 10.50}'
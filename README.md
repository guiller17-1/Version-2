# App de disponibilidad

## Ejecutar localmente
1. `pip install -r requirements.txt`
2. Define `ONEDRIVE_URL` con el enlace compartido del Excel.
3. Ejecuta `python app.py` y abre `http://localhost:5000`.

La app solo entrega al navegador marca, producto y estado. Lee la columna **Stock Actual**. Reglas: 0 = No disponible; 1-2 = Ultimas unidades; 3 o mas = Disponible. Si OneDrive no responde, usa `inventory.json` como respaldo.

## Publicar
Sube estos archivos a un repositorio privado y conéctalo a un hosting Python. Configura `ONEDRIVE_URL` como variable de entorno privada. No escribas ese enlace dentro del código.

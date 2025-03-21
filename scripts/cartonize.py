import cv2
import os

# Ruta de la imagen de entrada
path = '/home/slendy/AstroProjects/astro-dashboard/public/avatars'
img_file = os.path.join(path, 'avatar1.jpg')

# Leer la imagen
img = cv2.imread(img_file)

# Aplicar el filtro pencilSketch
gray_sketch, color_sketch = cv2.pencilSketch(
    img,
    sigma_s=60,      # Controla el tamaño del área de suavizado (mayor valor = más suavizado)
    sigma_r=0.07,    # Controla la intensidad del detalle (valores más pequeños preservan más detalles)
    shade_factor=0.05  # Controla el brillo de la imagen (solo aplica al dibujo a lápiz en color)
)

# Guardar las versiones resultantes
output_gray_sketch = os.path.join(path, 'avatar1_pencil_sketch_gray.jpg')
output_color_sketch = os.path.join(path, 'avatar1_pencil_sketch_color.jpg')

cv2.imwrite(output_gray_sketch, gray_sketch)   # Dibujo a lápiz en escala de grises
cv2.imwrite(output_color_sketch, color_sketch) # Dibujo a lápiz en color

print(f"Imagenes guardadas:\n- {output_gray_sketch}\n- {output_color_sketch}")


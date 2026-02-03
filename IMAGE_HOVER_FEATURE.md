# Image Hover Preview - Popup de Imágenes

## Funcionalidad Implementada ✅

Ahora las imágenes en tu sitio Quartz mostrarán un **popup a tamaño completo** cuando pasas el ratón por encima.

## Características

### 🖼️ Vista Previa Automática
- **Hover sobre cualquier imagen** → Se muestra en pantalla completa con fondo oscuro
- **Transiciones suaves** con animaciones de zoom
- **Backdrop blur** para mejor enfoque en la imagen
- **Max 95% viewport** para mantener bordes visibles

### ⌨️ Controles
- **Hover** sobre la imagen → Muestra preview
- **Salir del hover** → Oculta preview (con delay de 150ms)
- **Click en el preview** → Cierra manualmente
- **ESC** → Cierra el preview
- **Hover sobre el preview** → Mantiene visible

### 🎨 Efectos Visuales
- Cursor `zoom-in` en imágenes
- **Transform scale** ligero en hover sobre imagen original
- **Sombra sutil** al hacer hover
- **Animación de entrada** con zoom-in suave
- **Borde redondeado** en el preview
- **Soporte para modo oscuro**

### 📱 Responsive
- **Deshabilitado en dispositivos táctiles** (no tiene sentido el hover)
- **Oculto en impresión**
- **Adapta a cualquier tamaño de pantalla**

## Archivos Creados

```
quartz/
├── components/
│   ├── scripts/
│   │   └── image-hover.inline.ts    ← Script principal
│   └── styles/
│       └── image-hover.scss          ← Estilos CSS
```

## Cómo Funciona

1. **Al cargar la página** (y en cada navegación SPA):
   - Busca todas las imágenes en `article`, `.step`, `.popover-hint`
   - Agrega event listeners `mouseenter` y `mouseleave`
   - Marca imágenes como inicializadas

2. **Al hacer hover**:
   - Crea un overlay fullscreen (solo la primera vez)
   - Muestra la imagen a tamaño completo
   - Aplica animación de entrada

3. **Al salir del hover**:
   - Espera 150ms (delay)
   - Oculta el preview con fade out
   - Limpia el estado

## Integración con Quartz SPA

✅ Compatible con navegación SPA  
✅ Usa `window.addCleanup()` para limpiar listeners  
✅ Se reinicializa en cada evento `'nav'`  
✅ No causa memory leaks  

## Personalización

### Cambiar el delay de ocultación
```typescript
// En image-hover.inline.ts, línea con setTimeout:
}, 150)  // ← Cambia este valor (en milisegundos)
```

### Cambiar el fondo del overlay
```css
/* En image-hover.scss */
.image-hover-preview {
  background: rgba(0, 0, 0, 0.9); /* ← Cambia la opacidad */
}
```

### Cambiar el tamaño máximo del preview
```typescript
// En image-hover.inline.ts, estilos del img:
max-width: 95vw;  // ← Cambia este valor
max-height: 95vh; // ← Cambia este valor
```

### Deshabilitar el efecto de zoom en hover
```css
/* En image-hover.scss, comenta o elimina: */
article img:hover,
.step img:hover,
.popover-hint img:hover {
  /* transform: scale(1.02); */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
}
```

## Testing

1. ✅ Abre cualquier página con imágenes
2. ✅ Pasa el ratón sobre una imagen
3. ✅ Debe aparecer un popup fullscreen con la imagen
4. ✅ Mueve el ratón fuera → debe cerrarse
5. ✅ Presiona ESC cuando el popup esté visible → debe cerrarse
6. ✅ En móvil → el efecto debe estar deshabilitado

## Troubleshooting

### Las imágenes no muestran el popup
- Verifica que el build se haya completado: `npm run build`
- Limpia el cache del navegador
- Verifica en DevTools que `image-hover.inline.ts` se está cargando

### El popup no se cierra
- Verifica que no haya errores de JavaScript en la consola
- Comprueba que el evento ESC funcione

### Problemas en móvil
- El hover está deshabilitado intencionalmente en dispositivos táctiles
- Usa `@media (hover: none)` para detectar táctiles

## Mejoras Futuras Opcionales

Si quieres agregar más funcionalidades:
- 🔍 Zoom progresivo con rueda del ratón
- ⬅️➡️ Navegación entre imágenes con flechas
- 📊 Contador de imágenes (1/10, 2/10, etc.)
- 💾 Botón de descarga
- 🔗 Compartir imagen
- 🎬 Galería con lightbox completo


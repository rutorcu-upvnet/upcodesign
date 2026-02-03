# Step Navigation Fix para Quartz SPA

## Problema Identificado

El botón "siguiente" y "anterior" en las páginas de steps no funcionaba después de navegar con el sistema SPA (Single Page Application) de Quartz hasta que se refrescaba la página.

### Causa Root

El script `step-navigation.js` se cargaba mediante `<script src="./static/step-navigation.js"></script>` en cada página markdown, pero:

1. Los event listeners adjuntos a los botones NO se limpiaban correctamente cuando ocurría la navegación SPA
2. Los botones clonados no se removían de memoria, causando memory leaks
3. El evento 'nav' de Quartz se disparaba DESPUÉS de que el DOM se había actualizado, pero los listeners antiguos seguían en memoria

## Solución Implementada

### 1. Mejora del archivo `quartz/static/step-navigation.js`

**Cambios principales:**

- ✅ Ahora usa un **IIFE (Immediately Invoked Function Expression)** para encapsular el scope
- ✅ Implementa un **array de cleanup handlers** que se ejecutan antes de cada reinicialización
- ✅ **Utiliza `requestAnimationFrame()`** para asegurar que el DOM esté completamente actualizado
- ✅ Registra listeners con `window.addCleanup()` si está disponible (sistema de Quartz)
- ✅ **Previene memory leaks** removiendo todos los listeners previos antes de crear nuevos
- ✅ Usa `e.stopPropagation()` para evitar burbujas de eventos no deseadas
- ✅ Maneja correctamente el evento 'nav' de Quartz para reinicializar en cada navegación SPA

### 2. Mecanismo de Limpieza

```javascript
// Ahora mantiene track de todos los handlers
cleanupHandlers.push(() => {
    if (prevBtn) prevBtn.removeEventListener('click', prevClickHandler, false);
    if (nextBtn) nextBtn.removeEventListener('click', nextClickHandler, false);
});

// Se ejecutan antes de reinicializar
removeAllListeners();
```

### 3. Integración con Quartz SPA

El script ahora:
- Escucha el evento 'nav' de Quartz
- Se ejecuta en **requestAnimationFrame()** para permitir que el DOM se actualice primero
- Limpia todos los listeners antiguos
- Reinicializa los nuevos listeners en los nuevos elementos del DOM

## Cómo Funciona Ahora

1. **Primera carga**: Se ejecuta `initializeStepNavigation()` en `DOMContentLoaded`
2. **Navegación SPA**: 
   - Quartz actualiza el DOM con `micromorph`
   - Quartz dispara el evento 'nav'
   - Nuestro script escucha ese evento
   - Limpia todos los listeners antiguos
   - Reinicializa con los nuevos elementos del DOM
3. **Resultado**: Los botones Next/Previous funcionan perfectamente en cada navegación

## Testing

Para verificar que la solución funciona:

1. ✅ Abre cualquier página con steps (ej: chapter-1-step-1.md)
2. ✅ Haz clic en "Next" - debe funcionar
3. ✅ Haz clic en "Next" nuevamente - debe navegar a la siguiente página
4. ✅ **Importante**: En la nueva página, haz clic en "Previous" - debe funcionar SIN necesidad de refrescar
5. ✅ Abre la consola del navegador (F12) - no debe haber errores
6. ✅ Navega varias veces - verifica que no hay memory leaks (Memory Profiler)

## Archivos Modificados

- `quartz/static/step-navigation.js` - Script principal mejorado con soporte SPA
- `quartz/components/scripts/step-navigation-init.inline.ts` - Script inline para asistencia (opcional)

## Ventajas de Esta Solución

✅ No requiere cambios en los archivos markdown  
✅ Compatible con el sistema SPA de Quartz  
✅ Maneja correctamente memory leaks  
✅ Usa APIs correctas de Quartz (`window.addCleanup`)  
✅ Robusto y preparado para errores  
✅ Performance: usa `requestAnimationFrame()` para evitar jank  

## Si Sigue Sin Funcionar

Si aún no funciona después de estos cambios:

1. Limpia el cache del navegador (Ctrl+Shift+Del)
2. Rebuilda el proyecto: `npm run build`
3. Verifica en las DevTools que `step-navigation.js` se está cargando
4. Busca errores en la consola (F12 → Console)
5. Verifica que `window.addCleanup` existe al cargar la página


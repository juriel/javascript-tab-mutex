


# javascript-mutex

Este proyecto implementa un sistema de bloqueo entre pestañas usando JavaScript, permitiendo controlar el acceso a recursos compartidos como modales.

## ¿Cómo funciona `tryLock`?

El método `tryLock(nombre, timeout)` intenta adquirir un bloqueo con el nombre especificado (por ejemplo, `"modal"`). Si el bloqueo ya está tomado por otra pestaña, devuelve `false` y no permite continuar. Si el bloqueo está disponible, lo adquiere y devuelve `true`. El parámetro `timeout` (en segundos) indica cuánto tiempo se mantiene el bloqueo antes de liberarse automáticamente.

**Ejemplo:**
```js
if (!crosstablock.tryLock("modal", 60)) {
    alert("El modal está bloqueado por otra pestaña.");
    return;
}
```
En este ejemplo, si otra pestaña tiene el bloqueo `"modal"`, se muestra una alerta y no se abre el modal.

## ¿Cómo funciona `release`?

El método `release(nombre)` libera el bloqueo previamente adquirido con el nombre especificado. Esto permite que otras pestañas puedan adquirir el bloqueo y acceder al recurso.

**Ejemplo:**
```js
crosstablock.release("modal");
```
En este ejemplo, al cerrar el modal, se libera el bloqueo `"modal"` para que otras pestañas puedan abrirlo.

## Uso típico

1. Al intentar abrir el modal, se llama a `tryLock`.
2. Si el bloqueo está disponible, se muestra el modal.
3. Al cerrar el modal (o al hacer clic fuera), se llama a `release` para liberar el bloqueo.

## Beneficios

- Evita conflictos de acceso entre pestañas.
- Garantiza que solo una pestaña pueda interactuar con el recurso bloqueado a la vez.

---

¡Contribuye o reporta problemas en este repositorio!
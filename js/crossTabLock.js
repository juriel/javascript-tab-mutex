// crosstablock.js
const crosstablock = (() => {
  // ID único por ventana (se mantiene vivo mientras no recargues o cierres)
  const ownerId = Math.random().toString(36).slice(2);

  function getKey(resourceName) {
    return "__lock__" + resourceName;
  }

  function readLock(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }

  return {
    tryLock(resourceName, ttlSeconds) {
      if (!resourceName) throw new Error("Resource name is required");
      const key = getKey(resourceName);
      const now = Date.now();
      const ttl = ttlSeconds * 1000;

      const current = readLock(key);

      // Si no hay lock o ya venció
      if (!current || current.expires <= now) {
        localStorage.setItem(
          key,
          JSON.stringify({ owner: ownerId, expires: now + ttl })
        );
        // Confirmar que lo tomamos
        const confirm = readLock(key);
        return confirm && confirm.owner === ownerId;
      }

      return false; // Ya está bloqueado
    },

    release(resourceName) {
      if (!resourceName) throw new Error("Resource name is required");
      const key = getKey(resourceName);
      const current = readLock(key);

      if (current && current.owner === ownerId) {
        localStorage.removeItem(key);
        return true; // Liberado
      }

      return false; // No eres el dueño
    }
  };
})();

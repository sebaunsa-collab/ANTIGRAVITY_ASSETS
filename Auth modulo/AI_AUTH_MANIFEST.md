📝 AI Auth Manifest: Lógica de Autenticación Universal
Instrucciones para el Agente: Analiza este manifiesto antes de proceder. Este es un módulo de autenticación híbrido diseñado para ser adaptado a Firebase o PocketBase. Tu objetivo es actuar como un adaptador que implementa la lógica lógica descrita a continuación en el framework del proyecto actual.

1. Arquitectura de Identidad
Identificador Principal: Email / Contraseña.

Estado de Sesión: Manejado mediante persistencia local (SDK nativo).

Seguridad: Implementar obligatoriamente un Middleware que verifique auth.is_valid (PocketBase) o currentUser (Firebase).

2. Definición de Proveedores (Contexto)
Dependiendo del proyecto, selecciona el bloque lógico correspondiente:

Opción A: PocketBase (Self-hosted/Go)
Instancia: const pb = new PocketBase('URL');

Auth Flow: pb.collection('users').authWithPassword(email, pass);

Refresh: Usar pb.authStore.onChange para sincronizar el estado.

Opción B: Firebase (Google Cloud)
Instancia: const auth = getAuth(app);

Auth Flow: signInWithEmailAndPassword(auth, email, pass);

Refresh: Usar onAuthStateChanged para observar el observador de sesión.

3. Requerimientos de Lógica de Negocio (Invariantes)
Independientemente del proveedor, el agente debe asegurar que:

Manejo de Errores: Se traduzcan los códigos de error (ej. auth/user-not-found o 400: identity_not_found) a mensajes amigables: "Credenciales incorrectas".

Redirección: Si el usuario no está autenticado, redirigir siempre a /login excepto en rutas públicas.

Normalización de Datos: El objeto User devuelto debe tener siempre esta forma: { uid, email, name, avatar }.
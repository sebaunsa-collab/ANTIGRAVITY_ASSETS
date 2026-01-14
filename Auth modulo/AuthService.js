/**
 * AUTH SERVICE MASTER TEMPLATE
 * Este esqueleto permite al Agente de IA cambiar el motor (Firebase/PocketBase)
 * manteniendo la misma interfaz de métodos.
 */

class AuthService {
  constructor(providerType) {
    this.providerType = providerType; // 'firebase' o 'pocketbase'
    this.client = null;
    this.user = null;
  }

  // 1. INICIALIZACIÓN: La IA detecta qué configurar aquí
  init(config) {
    if (this.providerType === 'firebase') {
      // Lógica de inicialización Firebase
      // this.client = initializeApp(config);
    } else {
      // Lógica de inicialización PocketBase
      // this.client = new PocketBase(config.url);
    }
  }

  // 2. MÉTODO UNIVERSAL: No importa el backend, el método se llama igual
  async login(email, password) {
    try {
      let authData;
      if (this.providerType === 'firebase') {
        // Adaptador para Firebase
        authData = await signInWithEmailAndPassword(this.auth, email, password);
      } else {
        // Adaptador para PocketBase
        authData = await this.client.collection('users').authWithPassword(email, password);
      }
      return this._normalizeUser(authData);
    } catch (error) {
      this._handleError(error);
    }
  }

  // 3. NORMALIZACIÓN: Crucial para que la IA no rompa tu UI
  _normalizeUser(rawUser) {
    // La IA debe mapear los datos para que siempre devuelvan lo mismo
    return {
      id: rawUser.uid || rawUser.record?.id,
      email: rawUser.email || rawUser.record?.email,
      name: rawUser.displayName || rawUser.record?.name
    };
  }

  _handleError(error) {
    console.error(`[Auth Error - ${this.providerType}]:`, error.message);
    throw error;
  }
}

export default AuthService;
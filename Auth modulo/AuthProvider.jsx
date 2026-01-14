import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService'; // Importamos tu clase genérica

const AuthContext = createContext(null);

export const AuthProvider = ({ children, config, type }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Instanciamos la clase que la IA ya conoce
  const authService = new AuthService(type);

  useEffect(() => {
    authService.init(config);
    
    // Suscripción al estado de autenticación (Firebase o PocketBase)
    // El agente de IA completará la lógica de escucha aquí abajo
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [config, type]);

  // Valores que exponemos a toda la app
  const value = {
    user,
    loading,
    login: (e, p) => authService.login(e, p),
    logout: () => authService.logout(),
    register: (data) => authService.register(data)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar la auth en cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
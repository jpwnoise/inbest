import React, { createContext, useState, useContext } from 'react';

// Define el tipo del contexto
interface FavoritesContextType {
  favoritesCount: number;
  updateFavoritesCount: (count: number) => void;
}

// Crea el contexto con un valor predeterminado
const FavoritesContext = createContext<FavoritesContextType>({
  favoritesCount: 0, // Valor predeterminado para favoritesCount
  updateFavoritesCount: () => {}, // Función vacía como valor predeterminado
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoritesCount, setFavoritesCount] = useState(() => {
    // Inicializar con el número de favoritos en localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
    return favorites.length;
  });

  const updateFavoritesCount = (count: number) => {
    setFavoritesCount(count);
  };

  return (
    <FavoritesContext.Provider value={{ favoritesCount, updateFavoritesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
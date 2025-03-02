import React, { createContext, useState, useContext } from 'react';

// Define el tipo del contexto
interface FavoritesContextType {
  favoritesCount: number;
  updateFavoritesCount: (count: number) => void;
  removeFavorite: (id: string) => void; // Add removeFavorite to the interface
}

// Crea el contexto con un valor predeterminado
const FavoritesContext = createContext<FavoritesContextType>({
  favoritesCount: 0, // Valor predeterminado para favoritesCount
  updateFavoritesCount: () => {}, // Función vacía como valor predeterminado
  removeFavorite: () => {}, // Función vacía como valor predeterminado
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoritesCount, setFavoritesCount] = useState(() => {
    // Inicializar con el número de favoritos en localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
    return favorites.length;
  });

  // Función para actualizar el contador de favoritos
  const updateFavoritesCount = (count: number) => {
    setFavoritesCount(count);
  };

  // Función para eliminar un favorito
  const removeFavorite = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
    const updatedFavorites = favorites.filter((favorite: string) => favorite !== id);
    localStorage.setItem('favoriteLaunches', JSON.stringify(updatedFavorites));
    setFavoritesCount(updatedFavorites.length); // Actualizar el contador
  };

  return (
    <FavoritesContext.Provider value={{ favoritesCount, updateFavoritesCount, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
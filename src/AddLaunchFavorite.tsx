import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from "./FavoritesContext";

interface AddLaunchFavoriteDialogProps {
    launchId: string; // ID del lanzamiento
}

const AddLaunchFavorite: React.FC<AddLaunchFavoriteDialogProps> = ({ launchId }) => {
    const [open, setOpen] = useState(false); // Estado para controlar el modal

    // Abrir el modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    const { updateFavoritesCount } = useFavorites();


    const handleClose = (confirm: boolean) => {
        setOpen(false);
        if (confirm) {
          // Agregar a favoritos en localStorage
          let favorites = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
          const isAlreadyFavorite = favorites.some((fav: any) => fav.id === launchId);
          if (!isAlreadyFavorite) {
            // Aquí debes pasar el objeto completo del lanzamiento, no solo el ID
            const launchToAdd =  launchId; // Reemplaza con los datos correctos
            favorites.push(launchToAdd);
            localStorage.setItem('favoriteLaunches', JSON.stringify(favorites));
            updateFavoritesCount(favorites.length);
          }
        }
      };
    return (
        <>
            {/* Botón para abrir el modal */}
            <div style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
                <FavoriteIcon style={{ color: '#FF69B4' }} />
            </div>

            {/* Modal de confirmación */}
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add to Favorites"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Deseas agregar este lanzamiento a favoritos?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddLaunchFavorite;
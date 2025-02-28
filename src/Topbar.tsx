import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useFavorites } from './FavoritesContext';

interface TobarInterface {
    launches: any[];
}

const Topbar: React.FC<TobarInterface> = ({ launches }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const { favoritesCount } = useFavorites();

    const searchLaunchById = (id: string) => {
        return launches.find(launch => launch.id === id);
    };

    // Obtener la cantidad de lanzamientos favoritos
    const getFavoriteLaunchesCount = () => {
        const favorites = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
        return favorites.length;
    };

    const getFavoriteLaunches = () => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteLaunches') || '[]');
        return favoriteIds
            .map((id: string) => launches.find((launch) => launch.id === id))
            .filter((launch: any) => launch !== undefined); // Filtra los lanzamientos no encontrados
    };
    // Abrir el modal
    const openFavoritesLaunches = () => {
        setIsModalOpen(true);
    };

    // Cerrar el modal
    const closeFavoritesLaunches = () => {
        setIsModalOpen(false);
    };

    // Estilos para el modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    getFavoriteLaunches().map((element: any) => {

        console.log("elemento:", element);
    })

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: 'rgb(29, 29, 32)' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        SpaceX Launches
                    </Typography>
                    <div onClick={openFavoritesLaunches} style={{ cursor: 'pointer', marginRight: '16px' }}>
                        Mis lanzamientos favoritos
                    </div>
                    <IconButton color="inherit" aria-label="favorites">
                        <Badge badgeContent={getFavoriteLaunchesCount()} color="secondary">
                            <FavoriteIcon style={{ color: '#FF69B4' }} />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Modal para mostrar los lanzamientos favoritos */}
            <Modal
                open={isModalOpen}
                onClose={closeFavoritesLaunches}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" id="modal-title" gutterBottom>
                        Mis lanzamientos favoritos
                    </Typography>
                    {getFavoriteLaunches().length === 0 ? (
                        <Typography>No tienes lanzamientos favoritos.</Typography>
                    ) : (
                        <ul>
                            {getFavoriteLaunches().map((launch: any, index: number) => (

                                <li key={index}>
                                    <Typography>{launch.name}</Typography>
                                </li>
                            ))}
                        </ul>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Topbar;
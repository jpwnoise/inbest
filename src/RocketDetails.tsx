import { Box, Button, Modal, Typography } from "@mui/material";

// Definir las props del componente
interface RocketDetailsProps {
    open: boolean; // Indica si el modal está abierto
    handleClose: () => void; // Función para cerrar el modal
    selectedRocket: any
}

export const RocketDetails:React.FC<RocketDetailsProps> =  ({ open, handleClose, selectedRocket }) => {


    // Estilo para el modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '4px',
    };


    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
        <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
                {selectedRocket?.name}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                Detalles del cohete:
            </Typography>
            {selectedRocket?.flickr_images && (
                <img
                    src={selectedRocket.flickr_images[0]}
                    alt={selectedRocket.name}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            )}
            <Button onClick={handleClose} sx={{ mt: 2 }}>
                Cerrar
            </Button>
        </Box>
    </Modal> )
}

export default RocketDetails;
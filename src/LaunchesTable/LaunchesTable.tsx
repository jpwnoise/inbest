import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { launchesColumnsDefs } from '../LaunchesColumnsDefs/LaunchesColumnsDefs';
import RocketDetails from '../RocketDetails';
import './LaunchTable.sass'
import '../Animations.sass';

interface LaunchesTableProps {
    launches: any[];
    rockets: any[];
    launchpads: any[];
    onSelectRow: (lauch:any)=>void;

}

const LaunchesTable: React.FC<LaunchesTableProps> = ({ launches, rockets, launchpads, onSelectRow }) => {
    const [open, setOpen] = React.useState(false); // Estado para controlar el modal
    const [selectedRocket, setSelectedRocket] = React.useState<any>(null); // Estado para el cohete se

    const paginationModel = { page: 0, pageSize: 5 };

    // Manejador para abrir el modal
    const handleOpen = (rocket: any) => {
        setSelectedRocket(rocket); // Establece el cohete seleccionado
        setOpen(true); // Abre el modal
    };

    // Manejador para cerrar el modal
    const handleClose = () => {
        setOpen(false); // Cierra el modal
        setSelectedRocket(null); // Limpia el cohete seleccionado
    };

    //cuando den clicn en una fila de la tabla (un lanzamiento) actualizamos el mapa
    const handleRowClick = (params: GridRowParams)=>{
        onSelectRow(params.row)
    }

    return (
        <Paper className='fade-in-2s' sx={{ padding: '1rem', backgroundColor: '#434957', color: 'white', maxHeight:'468px' }}>
            <DataGrid
                rows={launches}
                columns={launchesColumnsDefs(rockets, handleOpen, launchpads)}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                onRowClick={handleRowClick}
                className='custom-datagrid'
                sx={{ border: 0}}
            />
            <RocketDetails open={open} handleClose={handleClose} selectedRocket={selectedRocket} />
        </Paper>
    );
}

export default LaunchesTable;
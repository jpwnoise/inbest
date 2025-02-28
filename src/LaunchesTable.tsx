import * as React from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { launchesColumnsDefs } from './LaunchesColumnsDefs';
import RocketDetails from './RocketDetails';

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
        <Paper sx={{ padding: '1rem', backgroundColor: '#434957', color: 'white' }}>
            <DataGrid
                rows={launches}
                columns={launchesColumnsDefs(rockets, handleOpen, launchpads)}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
                onRowClick={handleRowClick}
                sx={{
                    border: 0,
                    '& .MuiDataGrid-cell': {
                        color: 'rgb(55 178 192)', // Cambia el color de los encabezados
                        fontWeight: 'bold !important', // Establece el texto en negrita
                        fontFamily: 'Italianno, cursive',
                        borderTop: '1px solid #555'
                    },
                    '& .MuiDataGrid-columnHeader': {
                        color: 'rgb(120 120 217)', // Cambia el color de los encabezados
                        backgroundColor: 'rgb(30, 40, 60)', // Cambia el color de fondo de los encabezados
                        fontWeight: 'bold !important', // Establece el texto en negrita
                        borderBottom: '1px solid #555',
                        borderTop: '1px solid #555',
                        fontFamily: 'Italianno, cursive'

                    },
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'rgb(120 120 217)', // Cambia el color de los encabezados
                        backgroundColor: 'rgb(30, 40, 60)', // Cambia el color de fondo de los encabezados
                        fontWeight: 'bold !important', // Establece el texto en negrita
                        borderBottom: '1px solid #555'

                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bolder', // Establece el texto en negrita
                    },
                    // Alternar colores de filas
                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: 'rgb(40, 50, 70)', // Color para filas impares
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: 'rgb(30, 40, 60)', // Color para filas pares
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(50, 60, 80,.5)', // Color when hovering over a row
                    },
                }}
            />
            <RocketDetails open={open} handleClose={handleClose} selectedRocket={selectedRocket} />


        </Paper>
    );
}

export default LaunchesTable;
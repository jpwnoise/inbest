import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GridColDef } from '@mui/x-data-grid';
import { faCheck, faRocket, faTimes } from '@fortawesome/free-solid-svg-icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddLaunchFavorite from '../AddLaunchFavorite';
import './LaunchesColumnsDefs.sass'

export const launchesColumnsDefs = (rockets: any[], handleOpen: (rocket: any) => void, launchpads: any[]): GridColDef[] => {
    const searchRocketsById = (id: string) => {
        return rockets.find((rocket) => rocket.id === id);
    };

    return [
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'rocket',
            headerName: 'Cohete',
            width: 130,
            renderCell: (params: any) => {
                const rocket = searchRocketsById(params.value);
                return (
                    <div style={{ cursor: 'pointer' }} title="Ver detalles del cohete" onClick={() => handleOpen(rocket)}>
                        <span style={{ margin: '1rem' }}>{rocket.name}</span>
                        <FontAwesomeIcon icon={faRocket} />
                    </div>
                );
            },
        },
        {
            field: 'date_utc',
            headerName: 'Fecha',
            width: 130,
            type: 'date',
            valueFormatter: (params: any) => {
                return new Date(params).toLocaleString();
            },
        },
        {
            field: 'success',
            headerName: 'Éxito',
            width: 90,
            renderCell: (params: any) => {
                if (params.value) {
                    return (
                        <div className='correct'>
                            <FontAwesomeIcon icon={faCheck} style={{ marginRight: '0.5rem' }} />
                            Si
                        </div>
                    );
                } else {
                    return (
                        <div className='incorrect'>
                            <FontAwesomeIcon icon={faTimes} style={{ marginRight: '0.5rem' }} />
                            No
                        </div>
                    );
                }
            },
        },
        { 
            field: 'details', 
            headerName: 'Detalles', 
            width: 200,
            renderCell: (params: any) => {
                return (
                    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {params.value}
                    </div>
                );
            },
        },
        {
            field: 'failures',
            headerName: 'Fallas',
            width: 200,
            valueGetter: (params: any) => {
                return params.map((failure: any) => failure.reason).join(', ');
            },
        },
        {
            field: 'links',
            headerName: 'Enlaces',
            width: 200,
            valueGetter: (params: any) => `${params.article || ''} ${params.webcast || ''}`,
        },
        { field: 'flight_number', headerName: '#', width: 20 },
        {
            field: 'favorite',
            headerName: 'Favorito',
            width: 40,
            renderCell: (params: any) => {
                return <AddLaunchFavorite launchId={params.row.id} />;
            },
        },
    ];
};
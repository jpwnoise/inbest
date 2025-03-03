import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import '../Animations.sass';
import YouTubePlayer from '../YoutubePlayer.component';
import axios from 'axios';

interface LaunchesCard {
    launches: any[];
    launchIndex: number;
}

export const LaunchesCard: React.FC<LaunchesCard> = ({ launches, launchIndex }) => {
    const [launch, setLaunch] = useState<any>(launches[launchIndex]);

    const date = new Date(launch.date_utc).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const videoId = launch.links.webcast.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1];
    const [YT_URL, setYT_URL] = useState(videoId);
    const [rocket, setRocket] = useState<any>(null);

    //cada que se actualiza el número del id  
    useEffect(() => {
        launchIndex = currentIndex;
        setLaunch(launches[launchIndex]);
        const videoId = launch.links.webcast.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1];
        setYT_URL(videoId);
        axios.get('https://api.spacexdata.com/v4/rockets/' + launch.rocket)
        .then((result)=>{
            console.log('Se obtuvo el rocket: ', result.data)
            setRocket(result.data);
        })
        .catch((e)=>{
            console.error('No se obtuvo el tipo de cohete: ', e);
        })
    }, [currentIndex]);


    const handleLeftArrowClick = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleRightArrowClick = () => {
        if (currentIndex < launches.length - 1) setCurrentIndex(currentIndex + 1);
    };

    return (
        <div
            className="fade-in"
            style={{
                display: 'flex',
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center', // Centra verticalmente
                width: '100%',
                height: '100vh', // Ocupa toda la altura de la pantalla
            }}
        >
            {/* Botón carta anterior */}
            <IconButton
                onClick={handleLeftArrowClick}
                color="primary"
                aria-label="flecha izquierda"
                style={{ marginRight: '16px' }} // Espacio entre el botón y la tarjeta
            >
                <ArrowBack />
                <Typography>Anterior</Typography>
            </IconButton>

            {/* Carta */}
            <Card
                style={{
                    width: '600px', // Ancho fijo de la tarjeta
                    maxHeight: '80vh', // Altura máxima de la tarjeta
                    overflowY: 'auto', // Permite el desplazamiento vertical
                }}
            >
                <CardHeader title={launch.name} subheader={
                    <Typography>Lanzado en: {date}</Typography>
                }/>
                <CardContent>
                    <Typography>Tuvo éxito: {launch.success ? 'Si' : 'No'}</Typography>
                    <Typography
                        style={{
                            whiteSpace: 'pre-line', // Permite saltos de línea
                            overflowWrap: 'break-word', // Rompe palabras largas
                            maxWidth: '100%', // Asegura que el texto no desborde
                        }}
                    >
                        Detalles: {launch.details}
                    </Typography>
                    {launch.failures.map((failure: any, index: number) => (
                        <Typography key={'fail_' + index}>
                            Falla {index + 1}: {failure.reason}
                        </Typography>
                    ))}
                    <Typography>
                        Artículo:{' '}
                        <a href={launch.links.article} 
                            target="_blank" 
                            rel="noopener noreferrer">
                            {launch.links.article}
                        </a>
                    </Typography>
                    <Typography>Número de vuelo:{launch.flight_number}</Typography>
                    <div style={{border: '1px solid black', padding:'.5rem', borderRadius:'.5rem' }}>
                        <Typography>Cohete tipo:{rocket.name}</Typography>
                        
                    </div>
                    <YouTubePlayer videoId={YT_URL} />
                </CardContent>
            </Card>

            {/* Botón siguiente carta */}
            <IconButton
                onClick={handleRightArrowClick}
                color="primary"
                aria-label="flecha derecha"
                style={{ marginLeft: '16px' }} // Espacio entre el botón y la tarjeta
            >
                <Typography>Siguiente</Typography>
                <ArrowForward />
            </IconButton>
        </div>
    );
};
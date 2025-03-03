import React, { useEffect } from 'react';

// Declarar el espacio de nombres YT
declare namespace YT {
    interface PlayerOptions {
        height: string;
        width: string;
        videoId: string;
        events: {
            onReady: (event: { target: Player }) => void;
        };
    }

    class Player {
        constructor(elementId: string, options: PlayerOptions);
        playVideo(): void;
    }
}

// Extender la interfaz Window para incluir onYouTubeIframeAPIReady y YT
declare global {
    interface Window {
        onYouTubeIframeAPIReady: (() => void) | undefined;
        YT: {
            Player: typeof YT.Player;
        };
    }
}

// Definir las props del componente
type YouTubePlayerProps = {
    videoId: string;
};

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
    useEffect(() => {
        // Función para crear el reproductor
        const createPlayer = () => {
            new window.YT.Player('youtube-player', {
                height: '315',
                width: '560',
                videoId: videoId,
                events: {
                    onReady: (event) => {
                        event.target.playVideo();
                    },
                },
            });
        };

        // Verificar si la API ya está cargada
        if (window.YT && window.YT.Player) {
            createPlayer(); // Crear el reproductor directamente
        } else {
            // Si la API no está cargada, esperar a que esté lista
            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };

            // Cargar la API de YouTube IFrame
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];

            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.body.appendChild(tag);
            }
        }
        console.log(videoId)

        // Limpieza al desmontar el componente
        return () => { window.onYouTubeIframeAPIReady = undefined; };
    }, [videoId]);

    return (
        <div style={{maxWidth:'80%'}}>
            <div>Video del lanzamiento</div>
            <div id="youtube-player"></div>
        </div>
    );
};

export default YouTubePlayer;
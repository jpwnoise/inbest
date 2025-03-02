import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export const WelcomeMessage: React.FC = ()=>{

    return (
    <p className='fade-in-2s description'>
            <strong style={{ color: 'rgb(89 154 255)' }}>Bienvenido</strong> a la aplicación de historial de lanzamientos de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong>. Aquí podrás ver todos los lanzamientos de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong> <br />
            Podrás ordenar y filtrar la información para que puedas encontrar fácilmente los datos que buscas. <br />
            ¡Explora y descubre más sobre las misiones espaciales de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong>!
            <FontAwesomeIcon icon={faRocket} />
          </p>
    )
}
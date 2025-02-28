import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LaunchesTable from './LaunchesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import LaunchStatusChart from './LaunchStatusChart';
import SpaceXLogo from './SpaceXLogo';
import Topbar from './Topbar';
import MapComponent from './MapComponent';
import { FavoritesProvider } from './FavoritesContext';

function App() {

  // Definir interfaces para los tipos de datos
  interface Launch {
    id: string;
    name: string;
    date_utc: string;
    rocket: string;
    launchpad: string;
    success?: boolean;
  }

  interface Rocket {
    id: string;
    name: string;
    type: string;
  }

  interface Launchpad {
    id: string;
    name: string;
    full_name: string;
    latitude: number;
    longitude: number;
  }
  //estado para los lanzamientos
  const [launches, setLaunches] = useState<Launch[]>([]);

  // estado para los cohetes
  const [rockets, setRockets] = useState<Rocket[]>([]);

  //estado para las plataformas de despegue
  const [launchpads, setLaunchpads] = useState<Launchpad[]>([]);

  //estado para el primer lanzamiento
  const [firstLaunch, setFirstLaunch] = useState<Launch | null>(null);

  //estado para la plataforma del primer lanzamiento
  const [launchpadMap, setLaunchpadMap] = useState<Launchpad | null>(null);

  useEffect(() => {
    console.log('Solicitando lanzamientos');
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => {
        setLaunches(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (launches.length > 0) {
      setFirstLaunch(launches[0]);
    }
  }, [launches]); // Este efecto se ejecuta solo cuando `launches` cambia


  useEffect(() => {
    const launchpad = getLaunchpadFromFirstLaunch()
    setLaunchpadMap(launchpad)
  }, [firstLaunch])//obtenemos la plataforma de lanzamiento cuando tenemos el primer lanzamiento

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/rockets')
      .then(response => response.json())
      .then(data => {
        setRockets(data);
        console.log("Rockets: ", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launchpads')
      .then(response => response.json())
      .then(data => {
        setLaunchpads(data);
        console.log("Launchpads: ", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [launches]);

  const getLaunchpadFromFirstLaunch = () => {
    if (!firstLaunch || !launchpads.length) return null;
    return launchpads.find((pad) => pad.id === firstLaunch.launchpad) ?? null; // Devuelve null si no se encuentra
  };

  const launchpad = getLaunchpadFromFirstLaunch();

  return (
    <FavoritesProvider>
      <div style={{
        backgroundColor: 'rgb(5,9,22)',
        height: '100%'
      }}>

        <header >
        </header>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Topbar launches={launches}/>
          <h1 style={{ color: 'rgb(89 154 255)' }}> Lanzamientos <FontAwesomeIcon icon={faRocket} /> </h1>
          <SpaceXLogo ></SpaceXLogo>
          <p style={{ color: 'white', textAlign: 'center', maxWidth: '1000px', marginBottom: '20px' }}>
            <strong style={{ color: 'rgb(89 154 255)' }}>Bienvenido</strong> a la aplicación de historial de lanzamientos de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong>. Aquí podrás ver todos los lanzamientos de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong> en forma de tabla.
            Cada encabezado de la tabla te permitirá ordenar y filtrar la información para que puedas encontrar fácilmente los datos que buscas.
            ¡Explora y descubre más sobre las misiones espaciales de <strong style={{ color: 'rgb(89 154 255)' }}>SpaceX</strong>!
            <FontAwesomeIcon icon={faRocket} />
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}>
            <LaunchesTable launches={launches} rockets={rockets} launchpads={launchpads} onSelectRow={setFirstLaunch} />
            <MapComponent launchpad={launchpadMap} launch={firstLaunch} />
          </div>
        </main>
        <LaunchStatusChart launches={launches}></LaunchStatusChart>
      </div>
    </FavoritesProvider>
  );
}

export default App;

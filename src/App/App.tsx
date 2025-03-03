import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.sass';
import LaunchesTable from '../LaunchesTable/LaunchesTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import LaunchStatusChart from '../LaunchStatusChart';
import SpaceXLogo from '../SpaceXLogo';
import Topbar from '../Topbar';
import MapComponent from '../MapComponent/MapComponent';
import { FavoritesProvider } from '../FavoritesContext';
import CountdownTimer from '../CountDownTimer';
import { WelcomeMessage } from '../WelcomeMessage.component';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { LaunchesCard } from '../LaunchesCard/LaunchesCard.component';


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

  interface Rocket {
    id: string;
    name: string;
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

  const [rocketMap, setRocketMap] = useState<Rocket | null>(null);


  useEffect(() => {
    //console.log('Solicitando lanzamientos');
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
    const rocket: Rocket | null = getRocketFirstLaunch()
    setRocketMap(rocket)
  }, [firstLaunch])//obtenemos la plataforma de lanzamiento cuando tenemos el primer lanzamiento

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/rockets')
      .then(response => response.json())
      .then(data => {
        setRockets(data);
        //console.log("Rockets: ", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launchpads')
      .then(response => response.json())
      .then(data => {
        setLaunchpads(data);
        //console.log("Launchpads: ", data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [launches]);

  //solo para dar una secuencia de renderizado
  useEffect(() => {
    setTimeout(() => {
      setCanRender(true)
    }, 2000)
  })

  const getLaunchpadFromFirstLaunch = () => {
    if (!firstLaunch || !launchpads.length) return null;
    return launchpads.find((pad) => pad.id === firstLaunch.launchpad) ?? null; // Devuelve null si no se encuentra
  };

  const getRocketFirstLaunch = () => {
    if (!firstLaunch || !rockets.length) return null;
    return rockets.find((rocket) => rocket.id === firstLaunch.rocket) ?? null; // Devuelve null si no se encuentra
  };

  //estado para activar el renderizado del grafico posterior a que se haya renderizado la tabla 
  const [canRender, setCanRender] = useState(false);

  // Opciones para el Select
  const options = [
    { value: 'table', label: 'Tabla' },
    { value: 'card', label: 'Tarjeta' },
  ];

  // Estado para manejar la selección
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }>>(null);

  // Función para manejar el cambio de selección
  const handleChange = (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedOption(newValue);
    console.log(`Opción seleccionada:`, newValue);
  };


  return (
    <FavoritesProvider>
      <div style={{
        backgroundColor: 'rgb(19, 25, 45)',
        height: '100%'
      }}>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Topbar launches={launches} />
          <h1 style={{ color: 'rgb(89 154 255)' }}> Lanzamientos <FontAwesomeIcon icon={faRocket} /> </h1>
          <SpaceXLogo ></SpaceXLogo>
          <WelcomeMessage />
          <div className='select'>
            <p>Elijo ver los datos en formato: </p>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleChange}
              placeholder="Selecciona una opción"
              isClearable
              isSearchable
            />
          </div>
          {launches.length > 0 && selectedOption?.value === 'table' && (
            <div style={{ display: 'grid', gridTemplateColumns: '80% 20%', position: 'relative' }}>
              <LaunchesTable launches={launches} rockets={rockets} launchpads={launchpads} onSelectRow={setFirstLaunch} />
              <MapComponent launchpad={launchpadMap} launch={firstLaunch} rocket={rocketMap} />
            </div>
          )}
          { launches.length > 0 && 
            selectedOption?.value === 'card' && 
            (<LaunchesCard launches={launches} launchIndex={0}  />) 
            }
        </main>
        {canRender && (<LaunchStatusChart launches={launches}></LaunchStatusChart>)}
      </div>
    </FavoritesProvider>
  );
}

export default App;
 
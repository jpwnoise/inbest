import React, { SetStateAction, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Select, { ActionMeta, SingleValue } from 'react-select';


interface LaunchStatusChartProps {
  launches: any[];
}

const LaunchStatusChart: React.FC<LaunchStatusChartProps> = ({ launches }) => {

  // Contar lanzamientos exitosos
  const countSuccessfulLaunches = () => {
    return launches.reduce((count, launch) => launch.success === true ? count + 1 : count, 0);
  };

  // Contar lanzamientos fallidos
  const countFailedLaunches = () => {
    console.log("contando lanzamientos fallidos");
    return launches.reduce((count, launch) => {
      //console.log(launch.success);
      return !launch.success ? count + 1 : count
    }, 0);
  };

  // Contar lanzamientos con otro estado
  const countOtherStatusLaunches = () => {
    return launches.reduce((count, launch) => {
      if (launch.success !== true && launch.success !== false) {
        launch.success = "other"; // Actualiza el valor de `success` a "other"
        return count + 1; // Incrementa el contador
      }
      return count; // Mantén el contador igual si no cumple la condición
    }, 0);
  };

  // Transformar los datos para el gráfico
  const chartData = [
    {
      name: "Lanzamientos",
      success: countSuccessfulLaunches(),
      failure: countFailedLaunches(),
      other: countOtherStatusLaunches(),
    },
  ];

  // Opciones para el Select
  const options = [
    { value: 'status', label: 'Exitosos, fallidos y otros' },
    { value: 'rocket', label: 'Tipo de cohete' },
    { value: 'year', label: 'Año' },
    { value: 'location', label: 'Ubicación' },
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
    <div style={{padding: '1rem'}}>s
      <div style={{
        maxWidth: '600px',
        margin: '1rem auto 2rem auto',
        border: '1px solid rgb(255,255,255)',
        padding: '1rem',
        borderRadius: '4px',
      }}>

        <h2 style={{ color: 'lightblue' }}>¿Te gustan las estadísticas?</h2>
        <h4 style={{ color: 'lightblue' }}>Cantidad de lanzamientos por ... </h4>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Selecciona una opción"
          isClearable
          isSearchable
        />

        <BarChart width={600} height={300} data={chartData} style={{ margin: '1rem' }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" fill="#4CAF50" name="Éxitosos" />
          <Bar dataKey="failure" fill="#F42050" name="Fallidos" />
          <Bar dataKey="other" fill="#800080" name="Otros" />
        </BarChart>
      </div>
    </div>
  );
}

export default LaunchStatusChart;
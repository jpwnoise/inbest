import React, { useState, useEffect } from "react";

// Definimos la interfaz para el tiempo restante
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Definimos la interfaz para los datos del lanzamiento
interface Launch {
  date_utc: string;
}

const CountdownTimer = () => {
  // Estado para almacenar la fecha del próximo lanzamiento en milisegundos
  const [launchTime, setLaunchTime] = useState<number | null>(null);
  // Estado para almacenar el tiempo restante hasta el lanzamiento
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Función para obtener el próximo lanzamiento desde la API de SpaceX
  const fetchNextLaunch = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/launches/upcoming");
      const data: Launch[] = await response.json();

      console.log("Datos obtenidos de la API:", data); // Verifica la respuesta en la consola

      if (data.length > 0) {
        // Ordenamos los lanzamientos por fecha y tomamos el más cercano
        const nextLaunch: Launch = data.sort(
          (a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        )[0];

        // Guardamos la fecha del próximo lanzamiento en milisegundos
        setLaunchTime(new Date(nextLaunch.date_utc).getTime());
      } else {
        console.warn("No hay lanzamientos próximos disponibles.");
      }
    } catch (error) {
      console.error("Error obteniendo el lanzamiento:", error);
    }
  };

  // useEffect para obtener los datos del próximo lanzamiento cuando el componente se monta
  useEffect(() => {
    fetchNextLaunch();
  }, []);

  // useEffect para actualizar el contador cada segundo
  useEffect(() => {
    if (!launchTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = launchTime - now;

      if (difference <= 0) {
        fetchNextLaunch(); // Si el contador llega a 0, obtenemos el siguiente lanzamiento
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)), // Calcula los días restantes
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // Calcula las horas restantes
          minutes: Math.floor((difference / (1000 * 60)) % 60), // Calcula los minutos restantes
          seconds: Math.floor((difference / 1000) % 60), // Calcula los segundos restantes
        });
      }
    };

    // Actualiza el contador cada segundo
    const interval = setInterval(updateTimer, 1000);
    
    // Limpia el intervalo cuando el componente se desmonta o cambia launchTime
    return () => clearInterval(interval);
  }, [launchTime]);

  return (
    <div className="flex flex-col items-center bg-black text-white p-5 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🚀 Próximo Lanzamiento</h2>
      {timeLeft ? (
        <div className="text-4xl font-mono">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default CountdownTimer;

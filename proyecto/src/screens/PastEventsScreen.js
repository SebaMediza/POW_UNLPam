import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Event from "../components/Event";

const eventosData = [
  // Aquí deberías tener datos de tus eventos con al menos las propiedades: título, descripción, imagen, fecha, etc.
  // Ejemplo: { id: 1, title: 'Evento 1', description: 'Descripción del evento 1', date: '2023-12-01', ... }
  { id: 1, text: 'Evento 1', description: 'Descripción del evento 1', date: '2023-12-01'},
  { id: 2, text: 'Evento 2', description: 'Descripción del evento 2', date: '2024-01-01'},
  { id: 3, text: 'Evento 3', description: 'Descripción del evento 3', date: '2024-02-01'},
  { id: 4, text: 'Evento 4', description: 'Descripción del evento 4', date: '2024-03-01'},
  { id: 5, text: 'Evento 5', description: 'Descripción del evento 5', date: '2024-04-01'},
  { id: 6, text: 'Evento 6', description: 'Descripción del evento 6', date: '2024-05-01'},
  { id: 7, text: 'Evento 7', description: 'Descripción del evento 7', date: '2024-04-02'}
];

function PastEventsScreen({navigation}){
  // Ordenar los eventos del más viejo al más nuevo por año, mes y día
  const eventosOrdenados = eventosData.sort((a, b) => {
    const fechaA = new Date(a.date);
    const fechaB = new Date(b.date);

    if (fechaA.getFullYear() !== fechaB.getFullYear()) {
      return fechaA.getFullYear() - fechaB.getFullYear();
    }

    if (fechaA.getMonth() !== fechaB.getMonth()) {
      return fechaA.getMonth() - fechaB.getMonth();
    }

    return fechaA.getDate() - fechaB.getDate();
  });

  // Separar los eventos por meses
  const eventosPorMes = eventosOrdenados.reduce((acc, evento) => {
    const mes = new Date(evento.date).toLocaleString('default', { month: 'long' });
    acc[mes] = acc[mes] || [];
    acc[mes].push(evento);
    return acc;
  }, {});

  return (
    <View>
      {Event(eventosData,{navigation},false)}
    </View>
  );
};

export default PastEventsScreen;
import React, { useEffect, useState } from "react";
import {View} from 'react-native';
import Event from "../components/Event";

const urlApi = 'http://192.168.1.38:7071'

function PastEventsScreen({navigation}){
  const [dataPelis, setDataPelis] = useState([]);
  //const [dataSerie, setDataSerie] = useState([]);
  const dataEvent = [...dataPelis/*, ...dataSerie*/];
  
  const fetchAllPelis = async () => {
    const response = await fetch(urlApi + '/peliculaPasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataPelis(res);
  };

/*  const fetchAllSerie = async () => {
    const response = await fetch(urlApi + '/proximamenteSerie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataSerie(res);
  };
*/
  useEffect(() => {
    fetchAllPelis();
  //  fetchAllSerie();
    
  }, []);

  
  // Ordenar los eventos del más viejo al más nuevo por año, mes y día
  const eventosOrdenados = dataEvent.sort((a, b) => {
    const fechaA = new Date(a.fecha_lanzamiento);
    const fechaB = new Date(b.fecha_lanzamiento);

    if (fechaA.getFullYear() !== fechaB.getFullYear()) {
      return fechaA.getFullYear() - fechaB.getFullYear();
    }

    if (fechaA.getMonth() !== fechaB.getMonth()) {
      return fechaA.getMonth() - fechaB.getMonth();
    }

    return fechaA.getDate() - fechaB.getDate();
  });

  return (
    <View>
      {Event(eventosOrdenados,{navigation},false)}
    </View>
  );
};

export default PastEventsScreen;
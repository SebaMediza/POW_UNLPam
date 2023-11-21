'use client'
import { useEffect, useState } from "react"

import '../../../public/assets/css/Card.css'
import Card from "@/components/Card"

const page = ({}) => {
    const api = 'http://localhost:7071/peliculas'
    const getPelis = async () => {
        const res = await fetch(api);
        const data = await res.json();
        console.log(data.data);
        setData(data.data);
        setSearchData(data.data);
        setLoading(false);
    }

    useEffect(() => {
        getPelis();
    }, []);

    const [data, setData] = useState([]); //useState([]) es el estado inicial, que es un array vacio
    const [searchData, setSearchData] = useState([]); //useState([]) es el estado inicial, que es un array vacio
    const [searchTerm, setSearchTerm] = useState(""); //useState("") es el estado inicial, que es un string vacio
    const [loading, setLoading] = useState(true); //useState(false) es el estado inicial, que es un booleano en false
    const [error, setError] = useState(null); //useState(null) es el estado inicial, que es un null

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = searchData.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setData(resultadosBusqueda);
    }


    return (
        <>
            {loading ? (<p>Cargando...</p>) : (
                <div>
                    <div className="title">
                        <h1>Peliculas</h1>
                    </div>
                    <div className="busqueda">
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Búsqueda por Nombre o Empresa"
                            onChange={handleChange} />
                    </div>
                    <Card producciones={data} />
                </div>
            )}
        </>
    )
}

export default page
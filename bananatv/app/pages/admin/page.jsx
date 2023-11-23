import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1>Hola Admin</h1>
        <p>Desde aqui podras agreagar nuevo contenido a la plataforma.</p>
        <p>Seleciona el tipo de contenido y completa el formulario con las datos apropiados</p>
        <p>Una vez completado el formulario, presiona el boton "Agregar" para agregar el contenido a la plataforma.</p>
        <div>
            <Link href="/pages/admin/nuevaPeli">
                <button>Nueva Pelicula</button>
            </Link>
            <Link href="/pages/admin/nuevaSerie">
                <button>Nueva Serie</button>
            </Link>
        </div>
    </div>
  )
}

export default page
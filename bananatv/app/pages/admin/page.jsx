import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <div>
        <h1>Bienenido a tu panel de control</h1>
        <h3>Desde aquí podrás administrar tu contenido</h3>
      </div>
      <div>
        <Link href='/pages/admin/agregar'>
          <button className='btn btn-warning'>Agrgar Contenido</button>
        </Link>
        <button className='btn btn-warning'>Editar Contenido</button>
        <button className='btn btn-warning'>Borrar Contenido</button>
      </div>
    </div>
  )
}

export default page
import Link from 'next/link'

const Card = ({producciones}) => {
    return (
        <div className="cardContainer">
            {producciones.map((item) => (
                <div className="card" key={item.idMovie}>
                    <Link href={`/pages/peliculas/${item.idMovie}`}>
                        <img src={item.banner} className="card-img-top" alt="..." />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{item.titulo}</h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card
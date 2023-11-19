import Link from 'next/link'

const CardSerie = ({producciones}) => {
    return (
        <div className="cardContainer">
            {producciones.map((item) => (
                <div className="card" key={item.idSerie}>
                    <Link href={`/series/${item.idSerie}`}>
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

export default CardSerie
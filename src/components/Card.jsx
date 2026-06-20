import star from '../assets/star.png'
const Card = ({data}) => {
    return (
	<div key={data.key} className="card card-bg">
	<img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} 
	alt={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} 
	className="h-[90%] w-[99%]  mx-auto mt-1 rounded-lg"/>
	<h3 className="mx-3 text-white">{data.title}</h3>
	<div className="rating mb-2">
	<img src={star} alt="star" className="h-4 w-4 ml-3"/>
	<p className="mb-2">{data.vote_average ? data.vote_average.toFixed(1) : "N/A"}</p>
	<p className="ml-3">• {data.original_language}</p>
	<p className="ml-3">• {data.release_date ? data.release_date.split("-")[0] : "N/A"}</p>
	</div>
	</div>
    )
}

export default Card

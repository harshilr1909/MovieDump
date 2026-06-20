import search from '../assets/search.png'
export default function Search({searchMovie,setSearchMovie}) {
    return (
	<div className="h-10 w-[90%] max-w-[400px] mx-auto border-2 border-white/10 rounded-lg flex justify-start my-4">
	<img src={search} alt="search" className="w-5 h-5 mx-2 my-[7px]"/>
	<input type="text" name="search"
	className="mx-[10px] border-none focus:outline-none border-ring-0" placeholder="movies from your watchlist"
	onChange  = { (e) => setSearchMovie(e.target.value)}
	/>
	</div>
    )
}


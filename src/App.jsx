import Intro from './components/Intro.jsx'
import Search from './components/Search.jsx'
import Card from './components/Card.jsx'
import Spinner from './components/Spinner.jsx';
import { useState,useEffect } from "react";
import {useDebounce} from "react-use";

const API_DB_URL = 'https://api.themoviedb.org/3'

const API_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN

const API_OPTIONS = {
    method:'GET',
    headers : {
	accept : 'application/json',
	Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    }
}

const App = () => {
    const [searchMovie, setSearchMovie] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [movieList,setMovieList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [debouncedMovie,setDebouncedMovie] = useState('');

    //this hook updates the term after specifies amount of time - i.e. 500ms in this case which causes the page to re-render only when the user stops typing
    useDebounce(() => setDebouncedMovie(searchMovie),500,[searchMovie]);

    const fetchMovies = async (query='') => {
	setIsLoading(true);
	try {
	    const endpoint = query 
		? `${API_DB_URL}/search/movie?query=${encodeURIComponent(query)}`
		:`${API_DB_URL}/discover/movie?sort_by=popularity.desc`;
	    const response = await fetch(endpoint,API_OPTIONS);

	    if(!response.ok){
		throw new Error("Error fetching movies");
	    }

	    const data = await response.json();
	    console.log(data);
	    console.log(data.Response);

	    if(!data){
		setErrorMsg(data.error || "Error Fetching movies");
		return;
	    }

	    setMovieList(data.results || []);
	} catch (error) {
	    console.error("Error fetching movies",error);
	    setErrorMsg("Error Fetching Movies Try again later");  
	}finally{
	    setIsLoading(false);
	}
    }

    useEffect(() => {
	fetchMovies(debouncedMovie);
    }, [debouncedMovie]);

    return ( 

	<main className='bg-gradient min-h-screen'>
	<header>
	<Intro />	
	<Search 
	searchMovie = {searchMovie}
	setSearchMovie = {setSearchMovie}
	/>
	</header>
	<h2 className="text-white mx-[75px]">All Movies</h2>
	<section className="grid grid-cols-4 justify-items-center mx-[75px] ">
	{isLoading ? 
	    <Spinner /> : (errorMsg) ? <p className="text-white">{errorMsg} </p> :
	    movieList.map((movie) => (
	    <Card key={movie.id}data={movie}/>
	))}
		
	</section>
	</main>
    )
}

export default App

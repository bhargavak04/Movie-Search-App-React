import React, { useState } from 'react';
import { useEffect} from 'react';
import './App.css';
import SearchIcon from './search.svg'; 
import MovieCard from './MovieCard' 
// OMDB API KEY :: d1b3c71d
const API_URL='http://www.omdbapi.com?apikey=d1b3c71d';
const movie1={
    "Title": "Italian Spiderman",
    "Year": "2007",
    "imdbID": "tt2705436",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg"
}
const App =() => { 

    const[movies,setmovies]=useState([]);
    const[searchTerm,setsearchTerm]=useState('')

    const searchMovies  = async (title) => {
        const response= await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setmovies(data.Search)
    }
    useEffect(()=>{
    searchMovies('Spiderman');
    },[])
    return (
        <div className='app'>
            <h1>Silver Screen</h1>
            <div className="search">
                <input
                placeholder='Search For Movies '
                value={searchTerm}
                onChange={(e)=> (setsearchTerm(e.target.value))}
                 />
                <img 
                src={SearchIcon}
                alt="Search"
                onClick={()=> {searchMovies(searchTerm)!="N/A" ? searchMovies(searchTerm) : (<><div><p>No Matches Found</p></div></>) }}
                />
            </div>
            {
                movies.length > 0 
                ? (<div className="container">
                    {movies.map((movie)=>(<MovieCard movie={movie}/>))}
                  </div>)
                  : (<div className='empty'>
                    <h2> No Movies Found</h2>
                    </div>)
            }
                
        </div>
    );

}
export default App;
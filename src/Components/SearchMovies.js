import React, { useState } from 'react'
import MovieCard from './MovieCard'

export default function SearchMovies() {

    // Here we are setting our initial state to an empty String. This is for the movie search input
    const [query, setQuery] = useState('');

    // This is for the movie info gotten from the api
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();


        // My Api 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=871dbe8a3cb72d8bd69a6b960c1aaa15&query=${query}`;

        // Fetching Data from my API
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form action="" onSubmit={searchMovies} className='form'>
                <label htmlFor="query" className='label'>Movie Name</label>
                <input type="text" name="query" className='input' placeholder='e.g Jurassic Park' value={query} onChange={(e) => setQuery(e.target.value)} id="" />
                <button className='button' type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}

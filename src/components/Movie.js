import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './Axios/Axios';


const Movie = ({}) => {
  const [movie, setmovie] = useState([]);
  var a = useParams()
  useEffect(() => {
    axios.get(`/3/movie/${a.id}?api_key=01a0bb652f765b1bc420dd838728c655`)
    .then(({data}) => {
      setmovie(data)
    })
    .catch(err => console.log(err))
  }, []);
  return (
    <>
      <div className='moviesd'>
          <div className='cntd'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path || movie.profile_path }`} />
            <div className="contentd">
              <div className='titled'>{movie.original_name || movie.original_title || movie.name}</div>
              <div className='stard'>Rating: <br /> <ion-icon name="star"></ion-icon> {movie.vote_average || 0.5}</div>
              <div className='overview'>{movie.overview}</div>
              <div className='dated'>Release Date: {movie.release_date}</div>
              <a href={`https://www.youtube.com/results?search_query=${movie.original_name || movie.original_title}+trailer`}>
                <div className='trailerd'><ion-icon name="play"></ion-icon><div>Watch Trailer</div></div>
              </a>
            </div>
          </div>
      </div>
    </>
  );
}

export default Movie;

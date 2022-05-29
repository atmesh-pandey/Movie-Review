import React, { useEffect, useState } from 'react'
import { Route, Routes,useNavigate } from 'react-router-dom';
import './App.css'
import Movie from './components/Movie';
import Movies from './components/Movies';
import axios from './components/Axios/Axios';


const App = () => {
  const [trending, settrending] = useState(null);
  const [movie, setmovie] = useState();
  const [watchlist, setwatchlist] = useState([]);
  const [pages, setpages] = useState(1);
  const [count, setcount] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    trendingHandler();
  }, [pages]);

  const trendingHandler = () => {
    axios.get(`/3/trending/all/week?api_key=01a0bb652f765b1bc420dd838728c655&page=${pages}`)
    .then(({data}) => {
      settrending(data.results)
      setcount(data.total_pages)
      setmovie(data.results[0])
    })
    .catch(err => console.log(err))
  }
  const watch = (i) => {
      const cpy = [...watchlist]
    cpy.push(trending[i])
    setwatchlist(cpy)
  }
  const changepagehandler = (e,v) => {
    setpages(v)
  }
  const movieHandler = (e) => {
      navigate(`/movies/${e.id}`)
      setmovie(e)
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Movies movieHandler={movieHandler} trending={trending} watchlist={watchlist} changepagehandler={changepagehandler} count={count} watch={watch} />} />
        <Route path='/movies/:id' element={<Movie movie={movie} />} />
      </Routes>
    </>
  )
}
export default App;
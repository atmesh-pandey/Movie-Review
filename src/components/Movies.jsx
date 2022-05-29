import React from 'react';
import Pagination from '@mui/material/Pagination'
import Loader from './loader/loader.jsx'

const Movies = ({ trending, watchlist, changepagehandler, count, watch, movieHandler }) => {
  return (
    <>
      {/* <h1>Trending Movies <ion-icon name="chevron-forward"></ion-icon> </h1> */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between pt-3 pb-3 p-5">
        <a class="navbar-brand " href="/">Trending Movies</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>


        <form class="form-inline my-2 my-lg-0 d-flex ">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0 m-3" type="submit">Search</button>
        </form>

      </nav>
      <div className='movies'>
        {trending ? trending.map((e, i) => (
          <div className='cnt' key={i} onClick={() => movieHandler(e)}>
            <img src={`https://image.tmdb.org/t/p/w500${e.poster_path || e.backdrop_path || e.profile_path || "/csU9xxVn8tVyhwx4rw96zse1xrU.jpg"}`} />
            <div className="content">
              <div className='star'><ion-icon name="star"></ion-icon> {e.vote_average || 0.5}</div>
              <div className='title'>{e.original_name || e.original_title || e.name}</div>
              <div className='date'>{e.release_date}</div>
              <div onClick={() => watch(i)} className='watchlist'><ion-icon name="add"></ion-icon><div>Watchlist</div></div>
              <a useref={`https://www.youtube.com/results?search_query=${e.original_name || e.original_title}+trailer`}>
                <div className='trailer'><ion-icon name="play"></ion-icon><div>Trailer</div></div>
              </a>
            </div>
          </div>
        )) : <Loader />}
      </div>
      <h2><Pagination
        count={count}
        onChange={changepagehandler}
      /></h2>
      <h1 className="text-center">Watchlist <ion-icon name="chevron-forward"></ion-icon></h1>
      <div className="movies">
        {watchlist && watchlist.map((e, i) => (
          <div className='cnt2' key={i}>
            <img src={`https://image.tmdb.org/t/p/w500${e.poster_path}`} />
            <div className="content">
              <p><ion-icon name="star"></ion-icon> {e.vote_average}</p>
              <p>{e.original_title || e.original_name}</p>
              <a usehref="https://www.imdb.com/video/vi3119039257/?ref_=hm_fanfav_tr_vp_2_pd_fp1">
                <div className='trailer'><ion-icon name="play"></ion-icon><p>Trailer</p></div>
              </a>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default Movies;

import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieDetails } from '../features/movies/moviesSlice'
import Rating from '@mui/material/Rating'
// https://mui.com/material-ui/react-rating/#basic-rating

function MovieDetail() {
   const { movieId } = useParams()
   const dispatch = useDispatch()
   const { movieDetails, status, error } = useSelector((state) => state.movies)

   useEffect(() => {
      if (movieId) {
         dispatch(fetchMovieDetails(movieId))
      }
   }, [dispatch, movieId])

   if (status === 'loading') return <div>Loading...</div>
   if (status === 'failed') return <div>Error: {error}</div>

   return (
      <>
         {movieDetails && (
            <Grid container spacing={2}>
               <Grid size={3}>
                  <img src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`} alt={movieDetails.title} width="270" />
               </Grid>
               <Grid size={9}>
                  <h2 style={{ marginBottom: '10px' }}>{movieDetails.title}</h2>
                  <h3 style={{ marginTop: '10px' }}>줄거리</h3>
                  <p>{movieDetails.overview}</p>
                  <h3 style={{ marginTop: '10px' }}>장르</h3>
                  <p>{movieDetails.genres.map((genre) => `${genre.name}`).join(', ')}</p>
                  <h3 style={{ marginTop: '10px' }}>개봉일</h3>
                  <p>{movieDetails.release_date}</p>
                  <h3 style={{ marginTop: '10px' }}>평점</h3>
                  <p>
                     <Rating name="read-only" value={movieDetails.vote_average / 2} readOnly />
                  </p>
               </Grid>
            </Grid>
         )}
      </>
   )
}

export default MovieDetail

// import Grid from '@mui/material/Grid2'
// import { useParams } from 'react-router-dom'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchMovieDetails } from '../features/movies/moviesSlice'

// function MovieDetail() {
//    var params = useParams()
//    var movie_id = params.movie_id

//    const dispatch = useDispatch()
//    const { movieDetails, status, error } = useSelector((state) => state.movies)
//    console.log(movieDetails)

//    useEffect(() => {
//       if (movie_id) {
//          dispatch(fetchMovieDetails(movie_id))
//       }
//    }, [dispatch, movie_id])

//    if (status === 'loading') {
//       return <div>Loading...</div>
//    }

//    if (status === 'failed') {
//       return <div>Error: {error}</div>
//    }

//    return (
//       <>
//          {movieDetails && (
//             <Grid container spacing={2}>
//                <Grid size={3}>
//                   <img src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`} width="270" />
//                </Grid>
//                <Grid size={9}>
//                   <h2>
//                      {movieDetails.title} ({movieDetails.original_title})
//                   </h2>
//                   <h3>줄거리</h3>
//                   <p>{movieDetails.overview}</p>
//                   <h3>장르</h3>
//                   <p>{movieDetails.genres.map((genre) => `${genre.name}, `)}</p>
//                </Grid>
//             </Grid>
//          )}
//       </>
//    )
// }

// export default MovieDetail
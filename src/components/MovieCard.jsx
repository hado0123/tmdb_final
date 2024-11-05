// https://mui.com/material-ui/react-grid2/#basic-grid
// https://mui.com/material-ui/react-card/#media

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(2),
   textAlign: 'center',
   color: theme.palette.text.secondary,
   ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
   }),
}))

function MovieCard() {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchMovies())
   }, [dispatch])

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>

   return (
      <Grid container spacing={2}>
         {movies.map((movie) => (
            <Grid size={3} key={movie.id}>
               <Link to={`/detail/${movie.id}`}>
                  <Card sx={{ maxWidth: 345 }}>
                     <CardMedia sx={{ height: 400 }} image={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} title={movie.title} />
                     <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                           {movie.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                           {movie.release_date}
                        </Typography>
                     </CardContent>
                  </Card>
               </Link>
            </Grid>
         ))}
      </Grid>
   )
}

export default MovieCard

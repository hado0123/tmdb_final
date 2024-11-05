// https://swiperjs.com/demos#slides-per-view
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../features/movies/moviesSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '../css/PosterSlider.css'

function PosterSlider() {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchMovies('now_playing'))
   }, [dispatch])

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>

   return (
      <>
         <Swiper
            slidesPerView={5}
            spaceBetween={30}
            pagination={{
               clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
         >
            {movies.map((movie) => (
               <SwiperSlide key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

export default PosterSlider

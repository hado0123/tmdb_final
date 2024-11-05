// https://swiperjs.com/demos#slides-per-view
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieCredits } from '../../features/movies/moviesSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination } from 'swiper/modules'
// // import required modules
import { Scrollbar } from 'swiper/modules'

import 'swiper/css'
// import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../css/CreditsSlider.css'

function CreditsSlider({ movieId }) {
   const dispatch = useDispatch()
   const { movieCredits, loading, error } = useSelector((state) => state.movies)

   useEffect(() => {
      dispatch(fetchMovieCredits(movieId))
   }, [dispatch])

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>

   return (
      <>
         <Swiper
            slidesPerView={5}
            spaceBetween={30}
            scrollbar={{
               hide: false,
            }}
            modules={[Scrollbar]}
            className="mySwiper"
         >
            {movieCredits.cast &&
               movieCredits.cast.map((cast) => (
                  <SwiperSlide key={cast.id}>
                     <div style={{ padding: '20px' }}>
                        <img src={cast.profile_path ? `https://image.tmdb.org/t/p/w200${cast.profile_path}` : '/images/person.png'} alt={cast.name} />
                        <p style={{ fontWeight: 'bold' }}>{cast.name}</p>
                     </div>
                  </SwiperSlide>
               ))}
         </Swiper>
      </>
   )
}

export default CreditsSlider

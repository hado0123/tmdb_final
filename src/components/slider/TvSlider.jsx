// https://swiperjs.com/demos#slides-per-view
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTVs } from '../../features/tvs/tvsSlice'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '../css/PosterSlider.css'

function TvSlider() {
   const dispatch = useDispatch()
   const { tvs, loading, error } = useSelector((state) => state.tvs)

   useEffect(() => {
      dispatch(fetchTVs('nowPlaying'))
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
            {tvs.map((tv) => (
               <SwiperSlide key={tv.id}>
                  <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`} alt={tv.title} />
               </SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

export default TvSlider

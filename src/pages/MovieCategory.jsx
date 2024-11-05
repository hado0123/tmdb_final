import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'
import MovieCard from '../components/MovieCard'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function MovieCategory({ category }) {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)
   const [page, setPage] = useState(1)

   // 카테고리가 변경될 때 상태 초기화
   useEffect(() => {
      setPage(1) // 페이지를 1로 초기화
      dispatch({ type: 'movies/resetMovies' }) // movies 상태 초기화
   }, [category, dispatch])

   // page가 1로 설정된 후 영화 데이터 로딩
   useEffect(() => {
      if (page === 1) {
         // 카테고리가 변경될 때 새로운 영화 목록 요청
         dispatch(fetchMovies({ category, page }))
      }
   }, [category, page, dispatch])

   // 페이지가 2 이상일 때만 추가 데이터 요청
   useEffect(() => {
      if (page > 1) {
         dispatch(fetchMovies({ category, page }))
      }
   }, [page, dispatch, category])

   const loadMore = () => {
      setPage((prevPage) => prevPage + 1)
   }

   if (loading && page === 1)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>Loading...</h2>
            </Main>
            <Footer />
         </Wrap>
      )

   if (error)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>Error: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )

   return (
      <Wrap>
         <Menu />
         <Main>
            <MovieCard movies={movies} />
            {/* <button onClick={loadMore} disabled={loading} style={{ margin: '20px auto', display: 'block' }}>
               더보기
            </button> */}

            <Button variant="outlined" onClick={loadMore} sx={{ margin: '20px auto', display: 'block', width: '500px' }}>
               더보기
            </Button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory

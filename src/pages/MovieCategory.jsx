import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'
import MovieCard from '../components/MovieCard'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'

function MovieCategory({ category }) {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)
   const [page, setPage] = useState(1)

   // useEffect(() => {
   //    // 카테고리가 변경될 때 movies 초기화 및 페이지를 1로 설정
   //    dispatch({ type: 'movies/resetMovies' }) // movies slice에서 movies 초기화하는 액션
   //    setPage(1) // 페이지를 1로 초기화
   //    dispatch(fetchMovies({ category, page })) // 새로운 카테고리의 영화 데이터 요청
   // }, [dispatch, category]) // 카테고리 변경 시 실행

   useEffect(() => {
      // if (page > 1) {
      dispatch(fetchMovies({ category, page })) // 페이지가 1보다 클 경우 추가 영화 요청
      // }
   }, [dispatch, category, page]) // 페이지 변경 시 실행

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
            <button onClick={loadMore} disabled={loading} style={{ margin: '20px auto', display: 'block' }}>
               더보기
            </button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory

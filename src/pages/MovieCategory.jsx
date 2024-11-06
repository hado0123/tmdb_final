import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/movies/moviesSlice'

import MovieCard from '../components/MovieCard'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import Button from '@mui/material/Button'

function MovieCategory({ category }) {
   const dispatch = useDispatch()
   const { movies, loading, error } = useSelector((state) => state.movies)
   const [page, setPage] = useState({
      popular: 1,
      now_playing: 1,
      upcoming: 1,
   })

   // 카테고리가 변경될 때 페이지를 1로 초기화
   useEffect(() => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: 1, // 페이지를 1로 초기화
      }))
   }, [category])

   // page가 변할때 마다 영화 데이터 로딩
   useEffect(() => {
      console.log({ category, page: page[category] }) // {category: 'popular', page: 1}

      dispatch(fetchMovies({ category, page: page[category] }))
   }, [page, dispatch])

   /*
   useEffect의 의존성 배열에 dispatch를 넣는 이유는 안전성을 보장하기 위해서입니다. 이와 관련된 주요 이유는 다음과 같습니다:

   ESLint 경고 방지: ESLint의 react-hooks/exhaustive-deps 규칙은 useEffect에서 사용하는 모든 값(예: dispatch, category, page)을 의존성 배열에 포함할 것을 권장합니다. dispatch는 Redux에서 제공하는 함수이지만, 이를 의존성 배열에 추가하지 않으면 ESLint가 경고를 표시할 수 있습니다.

   미래의 안정성: 비록 dispatch 함수는 대부분의 경우 변하지 않지만, 만약 컴포넌트가 리렌더링되면서 새로운 dispatch 함수로 재정의되거나 변경될 경우(이런 상황은 드물지만), 이를 의존성 배열에 포함시키지 않으면 useEffect가 최신 상태의 dispatch를 사용하지 않을 수 있습니다. 즉, 이로 인해 예상치 못한 동작이 발생할 수 있습니다.
   */

   const loadMore = () => {
      setPage((prevPage) => ({
         ...prevPage,
         [category]: prevPage[category] + 1, // 페이지를 1 증가
      }))
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

            <Button variant="outlined" onClick={loadMore} sx={{ margin: '20px auto', display: 'block', width: '500px' }}>
               더보기
            </Button>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default MovieCategory

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom' // useParams 훅 추가
import { fetchSearchResults } from '../features/movies/moviesSlice' // 검색용 Thunk
import MovieCard from '../components/MovieCard'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

function SearchResults() {
   // const { query } = useParams() // URL에서 query 파라미터 가져오기
   const [searchParams] = useSearchParams() // 쿼리 파라미터 가져오기
   const query = searchParams.get('query') // query 파라미터 값 추출
   const dispatch = useDispatch()
   const { searchResults, loading, error } = useSelector((state) => state.movies) // 검색 결과 상태 가져오기
   const [page, setPage] = useState(1)

   // 검색어가 변경될 때마다 페이지와 검색 결과 초기화 및 새로운 검색 실행
   useEffect(() => {
      setPage(1) // 페이지 초기화
      dispatch(fetchSearchResults({ query, page: 1 })) // 검색어와 함께 검색 실행
   }, [query, dispatch])

   // 페이지가 변경될 때마다 새로운 결과 로딩
   useEffect(() => {
      if (page > 1) {
         dispatch(fetchSearchResults({ query, page }))
      }
   }, [page, dispatch, query])

   // 더보기 버튼 클릭 시 페이지 증가
   const loadMore = () => {
      setPage((prevPage) => prevPage + 1)
   }

   if (loading && page === 1)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>검색 중...</h2>
            </Main>
            <Footer />
         </Wrap>
      )

   if (error)
      return (
         <Wrap>
            <Menu />
            <Main>
               <h2>오류 발생: {error}</h2>
            </Main>
            <Footer />
         </Wrap>
      )

   return (
      <Wrap>
         <Menu />
         <Main>
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
               <>
                  <MovieCard movies={searchResults} />
                  <Button variant="outlined" onClick={loadMore} sx={{ margin: '20px auto', display: 'block', width: '500px' }}>
                     더보기
                  </Button>
               </>
            ) : (
               <h2>검색 결과가 없습니다.</h2>
            )}
         </Main>
         <Footer />
      </Wrap>
   )
}

export default SearchResults

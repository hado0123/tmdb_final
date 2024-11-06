import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails, getMovieCredits, searchMovie } from '../../api/tmdbApi'

/*
createAsyncThunk의 async 함수에서 매개변수로 여러 값을 받으려면, 두 가지 방식
-객체로 전달: category와 page를 객체로 묶어서 전달하는 방법.
-배열로 전달: category와 page를 배열로 전달하는 방법.
현재 코드에서는 async (category, page)로 두 개의 매개변수를 전달하고 있는데, createAsyncThunk에서 payloadCreator 함수는 기본적으로 하나의 인자만 받을 수 있기 때문에 문제가 발생할 수 있음. 객체로 전달하는 것이 일반적
*/

// 비동기 Thunk 액션: 영화 목록을 API로부터 가져옴
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async ({ category, page }) => {
   const response = await getMovies(category, page)

   // API 응답에서 필요한 데이터만 반환 (예: response.data.results)
   return response.data.results // 또는 필요한 데이터 구조에 맞게 수정
})

// 영화 상세 정보 가져오기
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId)

   // 상세 정보에서 필요한 데이터만 반환
   return response.data // 또는 필요한 데이터 구조에 맞게 수정
})

// 출연 배우 정보 가져오기
export const fetchMovieCredits = createAsyncThunk('movies/fetchMovieCredits', async (movieId) => {
   const response = await getMovieCredits(movieId)

   // 상세 정보에서 필요한 데이터만 반환
   return response.data // 또는 필요한 데이터 구조에 맞게 수정
})

// 검색어로 영화, TV 프로그램 검색
export const fetchSearchResults = createAsyncThunk('movies/fetchSearchResults', async ({ query, page }) => {
   const response = await searchMovie(query, page)
   return response.data.results // API 응답에서 필요한 데이터만 반환
})

// Slice 생성
const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false,
      movies: [],
      movieDetails: null,
      movieCredits: [], // 출연 배우 정보를 저장할 상태 추가
      error: null,
   },
   reducers: {
      resetMovies(state) {
         state.movies = [] // movies 상태 초기화
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            if (action.meta.arg.page === 1) {
               state.movies = action.payload
            } else {
               state.movies = [...state.movies, ...action.payload]
            }
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.loading = false
            state.movieDetails = action.payload
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchMovieCredits.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchMovieCredits.fulfilled, (state, action) => {
            state.loading = false
            state.movieCredits = action.payload // 출연 배우 정보를 상태에 저장
         })
         .addCase(fetchMovieCredits.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
         .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false
            // state.searchResults = action.payload // 검색 결과 상태에 저장

            if (action.meta.arg.page === 1) {
               state.searchResults = action.payload
            } else {
               state.searchResults = [...state.searchResults, ...action.payload]
            }
         })
         .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer

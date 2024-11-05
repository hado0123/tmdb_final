import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails, getMovieCredits } from '../../api/tmdbApi'

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
   },
})

export default moviesSlice.reducer

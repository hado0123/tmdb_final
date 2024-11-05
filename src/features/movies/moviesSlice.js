import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies, getMovieDetails } from '../../api/tmdbApi'

// 비동기 Thunk 액션: 영화 목록을 API로부터 가져옴
//'movies/fetchMovies' 액션의 타입명, 액션을 구분할 때 사용
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
   const response = await getMovies()
   return response.data.results
})

// 영화 상세 정보 가져오기
export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (movieId) => {
   const response = await getMovieDetails(movieId)
   return response.data
})

// Slice 생성
const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false, // api 호출 중 로딩상태
      movies: [], // 영화목록 데이터가 저장될 배열
      movieDetails: null,
      error: null, // 에러 발생시 에러메시지 저장
   },
   reducers: {},
   // extraReducers: 비동기 액션의 각 상태(state)를 업데이트
   extraReducers: (builder) => {
      // 영화 목록 가져오기
      builder
         .addCase(fetchMovies.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.movies = action.payload
         })
         .addCase(fetchMovies.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })

      // 영화 상세 정보 가져오기
      builder
         .addCase(fetchMovieDetails.pending, (state) => {
            state.status = 'loading'
         })
         .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.movieDetails = action.payload
         })
         .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer

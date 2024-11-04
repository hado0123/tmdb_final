import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies } from '../../api/tmdbApi'

// 비동기 Thunk 액션: 영화 목록을 API로부터 가져옴
//'movies/fetchMovies' 액션의 타입명, 액션을 구분할 때 사용
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
   const response = await getMovies()
   return response.data.results
})

// Slice 생성
const moviesSlice = createSlice({
   name: 'movies',
   initialState: {
      loading: false, // api 호출 중 로딩상태
      movies: [], // 영화목록 데이터가 저장될 배열
      error: null, // 에러 발생시 에러메시지 저장
   },
   reducers: {},
   // extraReducers: 비동기 액션의 각 상태(state)를 업데이트
   extraReducers: (builder) => {
      builder
         //데이터를 가져오는 동안
         .addCase(fetchMovies.pending, (state) => {
            state.loading = true
         })
         // 데이터를 성공적으로 가져오는 경우
         .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload //결과
         })
         //api 호출이 실패할 경우
         .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default moviesSlice.reducer

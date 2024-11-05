import axios from 'axios'

// TMDB API 기본 URL과 API 키 설정
const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_KEY = process.env.TMDB_API_KEY

// axios 인스턴스 생성
const tmdbApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTczMDUzNTYxOC41NTE3OTcyLCJzdWIiOiI2MjRkNDM0MWMzOTI2NjAwNGY5Mjk4YmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.O5nRjv35TxNUAD_5FX1de7mEJhnIZt5qv3f4dCT7Pi4`,
   },
})

// 공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      const response = await tmdbApi.get(url, { params })
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 인기, 상영중, 개봉 예정 영화 가져오기
export const getMovies = (category = 'popular', page = 1) => {
   // category 따라 엔드포인트 동적으로 설정
   const endpoint = {
      popular: '/movie/popular',
      now_playing: '/movie/now_playing',
      upcoming: '/movie/upcoming',
   }[category] // 기본값을 'popular'로 설정

   return fetchFromApi(endpoint, {
      language: 'ko-KR',
      page,
      region: 'KR',
   })
}

// 영화 상세 정보 가져오기
export const getMovieDetails = (movieId) => {
   return fetchFromApi(`/movie/${movieId}`, {
      language: 'ko-KR',
   })
}

// 출연 배우 정보 가져오기
export const getMovieCredits = (movieId) => {
   return fetchFromApi(`/movie/${movieId}/credits`, {
      language: 'ko-KR',
   })
}

// 인기, 방송 중인 tv 목록 가져오기
export const getTVs = (type = 'popular', page = 1) => {
   // type에 따라 엔드포인트 동적으로 설정
   const endpoint = {
      popular: '/tv/popular',
      nowPlaying: '/tv/on_the_air',
   }[type] // 기본값을 'popular'로 설정

   return fetchFromApi(endpoint, {
      language: 'ko-KR',
      page,
      region: 'KR',
   })
}

export default tmdbApi

// import axios from 'axios'

// // TMDB API 기본 URL과 API 키 설정
// const BASE_URL = 'https://api.themoviedb.org/3'
// const AUTH_KEY = process.env.TMDB_API_KEY

// // axios 인스턴스 생성
// const tmdbApi = axios.create({
//    baseURL: BASE_URL,
//    headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${AUTH_KEY}`,
//    },
// })

// // API를 통해 영화 목록을 가져오는 함수
// export const getMovies = async (page = 1) => {
//    const response = await tmdbApi.get('/movie/popular', {
//       params: {
//          language: 'ko-KR',
//          page, //page: page
//          region: 'KR',
//       },
//    })
//    return response
// }

// // 영화 상세 정보 가져오기
// export const getMovieDetails = async (movieId) => {
//    const response = await tmdbApi.get(`/movie/${movieId}`, {
//       params: {
//          language: 'ko-KR',
//       },
//    })
//    return response
// }

// // 장르 목록 가져오기
// export const getGenres = async () => {
//    const response = await tmdbApi.get('/genre/movie/list')
//    return response
// }

// export default tmdbApi

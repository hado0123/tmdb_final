import axios from 'axios'

// TMDB API 기본 URL과 API 키 설정
const BASE_URL = 'https://api.themoviedb.org/3'
const AUTH_KEY = process.env.REACT_APP_TMDB_API_KEY

// axios 인스턴스 생성
const tmdbApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
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
export const getTVs = (type, page = 1) => {
   // type에 따라 엔드포인트 동적으로 설정
   const endpoint = {
      popular: '/tv/popular',
      nowPlaying: '/tv/on_the_air',
   }[type]

   return fetchFromApi(endpoint, {
      language: 'ko-KR',
      page,
      region: 'KR',
   })
}

// 검색 API 호출 함수
export const searchMovie = (query, page = 1) => {
   return fetchFromApi('/search/movie', {
      query, // 검색어
      page, // 페이지 번호 (기본값 1)
      language: 'ko-KR', // 언어 설정
      include_adult: false, // 성인 콘텐츠 제외
      region: 'KR',
   })
}

export default tmdbApi

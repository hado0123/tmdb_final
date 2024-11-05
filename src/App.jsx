import Home from './pages/Home'
import { Route, Routes, Link } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Detail from './pages/Detail'
import MovieCategory from './pages/MovieCategory'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/popular" element={<MovieCategory category="popular" />} />
         <Route path="/now_playing" element={<MovieCategory category="now_playing" />} />
         <Route path="/upcoming" element={<MovieCategory category="upcoming" />} />
         <Route path="/detail/:movie_id" element={<Detail />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App

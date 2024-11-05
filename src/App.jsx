import Home from './pages/Home'
import { Route, Routes, Link } from 'react-router-dom'
import Popular from './pages/Popular'
import NotFound from './pages/NotFound'
import Detail from './pages/Detail'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/popular" element={<Popular />} />
         <Route path="/detail/:movie_id" element={<Detail />} />
         {/* <Route path="/now" element={< />} />
         <Route path="/upcoming" element={< />} /> */}
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App

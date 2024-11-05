import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import MovieDetail from '../components/MovieDetail'
import CreditsSlider from '../components/slider/CreditsSlider'
import { useParams } from 'react-router-dom'

function Detail() {
   const { movieId } = useParams()
   return (
      <Wrap>
         <Menu />
         <Main>
            <MovieDetail />
            <h2>출연배우</h2>
            <CreditsSlider movieId={movieId} />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Detail

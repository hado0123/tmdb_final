import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import MovieDetail from '../components/MovieDetail'

function Detail() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <MovieDetail />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Detail

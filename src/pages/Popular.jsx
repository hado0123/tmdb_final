import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import MovieCard from '../components/MovieCard'

function Popular() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <MovieCard />
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Popular

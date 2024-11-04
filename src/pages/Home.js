import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import Slider from '../components/Slider'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <Slider></Slider>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home

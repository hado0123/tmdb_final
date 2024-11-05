import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import PosterSlider from '../components/slider/PosterSlider'
import Banner from '../components/Banner'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <Banner />
            <h3>현재 상영중</h3>
            <PosterSlider></PosterSlider>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home

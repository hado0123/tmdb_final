import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import PosterSlider from '../components/slider/PosterSlider'
import FullSlider from '../components/slider/FullSlider'
import VideoSlider from '../components/slider/VideoSlider'
import TvSlider from '../components/slider/TvSlider'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <FullSlider></FullSlider>
            <h3>현재 상영중</h3>
            <PosterSlider></PosterSlider>
            <TvSlider></TvSlider>
            <VideoSlider></VideoSlider>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home

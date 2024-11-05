import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
import PosterSlider from '../components/PosterSlider'
import FullSlider from '../components/FullSlider'
import VideoSlider from '../components/VideoSlider'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <FullSlider></FullSlider>
            <PosterSlider></PosterSlider>
            <VideoSlider></VideoSlider>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home

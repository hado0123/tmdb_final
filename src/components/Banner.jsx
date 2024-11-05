import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
//https://mui.com/material-ui/react-text-field/#full-width

function Banner() {
   return (
      <div
         style={{
            width: '100%',
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(/images/banner.jpg)`, // 이미지 경로 설정
            backgroundSize: 'cover', // 이미지가 요소를 완전히 덮도록
            backgroundPosition: 'center', // 이미지의 위치를 가운데로
            backgroundRepeat: 'no-repeat', // 이미지 반복 방지
         }}
      >
         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h1 style={{ color: 'white' }}>환영합니다. 수백만 개의 영화, TV 프로그램 및 인물을 발견하세요. 지금 살펴보세요.</h1>
            <Box sx={{ width: 800, maxWidth: '100%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
               <TextField sx={{ backgroundColor: 'white' }} fullWidth label="영화, TV, 프로그램 검색" id="fullWidth" />
               <Button sx={{ width: 100, height: 56, backgroundColor: 'white' }} variant="outlined" startIcon={<SearchIcon />}>
                  검색
               </Button>
            </Box>
         </div>
      </div>
   )
}

export default Banner

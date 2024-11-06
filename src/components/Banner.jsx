import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './css/Banner.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
//https://mui.com/material-ui/react-text-field/#full-width

function Banner() {
   const [searchQuery, setSearchQuery] = useState('') // 검색어 상태 관리
   const navigate = useNavigate()

   // 검색어 입력 처리
   const handleInputChange = (event) => {
      setSearchQuery(event.target.value)
   }

   // 검색 버튼 클릭 시 검색 페이지로 이동
   const handleSearch = (event) => {
      event.preventDefault()
      if (searchQuery.trim()) {
         navigate(`/search?query=${searchQuery}`) // 검색어를 query 파라미터로 전달
      }
   }

   return (
      <div
         style={{
            width: '100%',
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(/images/banner.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="search">
            <h1 className="header_msg">환영합니다! 수백만 개의 영화를 지금 살펴보세요.</h1>

            <form onSubmit={handleSearch} className="search_form">
               <TextField sx={{ backgroundColor: 'white' }} fullWidth label="영화검색" id="fullWidth" value={searchQuery} onChange={handleInputChange} />

               <Button sx={{ width: 100, height: 56, backgroundColor: 'white' }} variant="outlined" startIcon={<SearchIcon />} type="submit">
                  검색
               </Button>
            </form>
         </div>
      </div>
   )
}

export default Banner

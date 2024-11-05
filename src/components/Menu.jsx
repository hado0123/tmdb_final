import './css/Menu.css'
import { Link } from 'react-router-dom'

function Menu() {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <Link to="/">
                     <img src="/images/logo.svg" alt="로고" width="160" />
                  </Link>
               </li>
               <li>
                  <Link to="/popular">인기영화</Link>
               </li>
               <li>
                  <Link to="/now_playing">현재 상영 중</Link>
               </li>
               <li>
                  <Link to="/upcoming">개봉 예정</Link>
               </li>
               <li style={{ float: 'right' }} className="active">
                  <Link to="/login">로그인</Link>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu

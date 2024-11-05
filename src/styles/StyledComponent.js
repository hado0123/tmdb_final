import styled from 'styled-components'

// || 는 렌더링 연산자 X, 일반 논리 연산자
export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.minWidth || '1200px'};
`

export const Main = styled.main`
   width: ${(props) => props.width || '1200px'};
   margin: 0 auto;
   overflow: hidden;
   padding: 30px 0;
`

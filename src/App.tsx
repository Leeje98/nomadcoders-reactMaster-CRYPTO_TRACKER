import styled from "styled-components";
import Circle from "./Circle";
import { useState } from "react";


const Container = styled.div`
background-color: ${(props) => props.theme.bgColor}; 
`;
const H1 = styled.h1`
color: ${(props) => props.theme.textColor};
`;
interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy ({text, active = false}: DummyProps) {
  return (
    <H1>{text}</H1>
  )
}

// function App() { 
//   const onClick = (event:React.FormEvent<HTMLButtonElement>) => {}
//   return (
//     <Container>
//        <Dummy active text='hello' />
//        {/* <Dummy active={true} text='hello' /> - 위의 내용과 같다*/}
//        <form>
//         <button onClick={onClick}>click me</button>
//        </form>
//     </Container>
//   );
// }
function App() {        // react-event이름-event를 발생시키는 Element이름을 사용하는 태그(객체) 
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {}
  return (
    <Container>
      <Dummy active text='hello' />
      <button onClick={onClick}>click me</button>
    </Container>
  );
}

export default App;

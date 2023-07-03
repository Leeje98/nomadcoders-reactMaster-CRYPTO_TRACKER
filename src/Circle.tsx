import React, { useState } from 'react'
import styled from 'styled-components';

// interface : 객체의 타입을 정의

interface ContainerProps { // styled.div 의 타입 정의
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>` // 타입은 ContainerProps에 정의한 대로이다.
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
    line-height: 200px;
    text-align: center;
`;

interface CircleProps {  // function의 타입을 정의
    bgColor: string;
    borderColor?: string;  // 필수값이 아닐땐 ?를 붙여주면 된다
    text?: string;
}
                                                    // text의 디폴트 값 정의
export default function Circle({bgColor, borderColor, text = "default text"}: CircleProps) {
    // const [value, setValue] = useState<number|string>(0); // 디폴트 값으로 Typescript가 충분히 유추하지만 맞춤제작을 하고싶을때 타입을 선언해준다
    // setValue(2)
    // setValue("hello")
  return (

                                            // borderColor값이 있다면 그 값을 이용하고, 값이 없다면 bgColor가 디폴트 값이다
                                            // borderColor와 bgColor 모두 string이기 때문에 가능하다
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
    </Container> 
  )
}

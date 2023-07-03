import React from 'react'
import styled from 'styled-components';

// interface : 객체의 타입을 정의

interface ContainerProps { // styled.div 의 타입 정의
    bgColor: string;
}

const Container = styled.div<ContainerProps>` // 타입은 ContainerProps에 정의한 대로이다.
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
`;

interface CircleProps {  // function의 타입을 정의
    bgColor: string;
}

export default function Circle({bgColor}: CircleProps) {
  return (
    <Container bgColor={bgColor} />
  )
}

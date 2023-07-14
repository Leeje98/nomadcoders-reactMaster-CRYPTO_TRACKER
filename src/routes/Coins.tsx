// import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 17px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// interface ICoinsProps {}

function Coins() {                  
  const setDarkAtom = useSetRecoilState(isDarkAtom); // useSetRecoilState:atom의 값을 변환함(useState와 같이 작동)
  const toggleDarkAtom = () => setDarkAtom((Mode) => !Mode)
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
                                      // ㄴ data 타입
                                          // 첫번째 매개변수는 query의 고유 식별자, 두번째 매개변수는 fetcher함수 
                                          // 두번째 매개변수의 fetcher함수 : api.ts에 정의
      // isLoading : 하단의 loading useState를 대체함 (상태변화 감지/useQuery 기본기능)
      // data : return하는 json 데이터를 담음

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  // console.log(coins);
  console.log(data);
  
  return (
    <Container>
        {/* <button onClick={toggleDarkAtom}>
          <BsSunFill />
          <FaMoon />
        </button> */}
      <Helmet>
        <title>Home-Coin List</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => ( 
              <Coin key={coin.id}>
                <Link to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }
                }}>
                  <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt=""/>
                  {coin.name} &rarr;
                </Link>
              </Coin>
          ))} 
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

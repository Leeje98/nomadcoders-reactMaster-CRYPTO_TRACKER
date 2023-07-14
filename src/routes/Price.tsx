import React from 'react'
import { fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { styled } from 'styled-components';

const PriceViewOuter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const PriceView = styled.div`
  width: 212px;
  height: 100px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
  padding: 15px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;
const FullPriceView = styled(PriceView)`
  width: 100%;
  padding-top: 20px;
 
`
const PriceTitle = styled.p`
  font-style: 19px;
  font-weight: 500;
  color: gray;
  margin-bottom: 10px;
`
const PriceInner = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  height: 30px;
  line-height: 22px;
  margin-top: 20px;

  /* border: 2px solid purple; */
   
  .icon {
    height: 100%;

    /* background-color: #fff; */
  }
`;
const PriceViewItem = styled.div`
  font-size: 20px;
  font-weight: 300;
  div:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)  // useRecoilValue:atom의 값을 불러옴
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    // {
    //   refetchInterval: 10000,
    // } 
  );
  return (
    <>
      <PriceViewOuter>
        <FullPriceView>
          <PriceTitle>마지막 업데이트</PriceTitle>
          <PriceInner> 
            <PriceViewItem>{tickersData?.last_updated}</PriceViewItem>
          </PriceInner>
        </FullPriceView>
      {/* <h1>마지막 업데이트</h1>
      <div>${tickersData?.last_updated}</div> */}


        <PriceView>
          <PriceTitle>1시간 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_1h&&
              tickersData?.quotes?.USD?.percent_change_1h >= 0 ? {color:"red"} : {color:"green"}}> 
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_1h}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_1h&&
            tickersData?.quotes?.USD?.percent_change_1h >= 0 ? <FaArrowTrendUp className='icon'/> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

        <PriceView>
          <PriceTitle>6시간 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_6h&&
              tickersData?.quotes?.USD?.percent_change_6h >= 0 ? {color:"red"} : {color:"green"}}>
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_6h}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_6h&&
            tickersData?.quotes?.USD?.percent_change_6h >= 0 ? <FaArrowTrendUp className='icon' /> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

        <PriceView>
          <PriceTitle>12시간 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_12h&&
              tickersData?.quotes?.USD?.percent_change_12h >= 0 ? {color:"red"} : {color:"green"}}>
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_12h}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_12h&&
            tickersData?.quotes?.USD?.percent_change_12h >= 0 ? <FaArrowTrendUp className='icon' /> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

        <PriceView>
          <PriceTitle>24시간 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_24h&&
              tickersData?.quotes?.USD?.percent_change_24h >= 0 ? {color:"red"} : {color:"green"}}>
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_24h}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_24h&&
            tickersData?.quotes?.USD?.percent_change_24h >= 0 ? <FaArrowTrendUp className='icon' /> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

        <PriceView>
          <PriceTitle>7일 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_7d&&
              tickersData?.quotes?.USD?.percent_change_7d >= 0 ? {color:"red"} : {color:"green"}}>
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_7d}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_7d&&
            tickersData?.quotes?.USD?.percent_change_7d >= 0 ? <FaArrowTrendUp className='icon' /> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

        <PriceView>
          <PriceTitle>30일 전보다</PriceTitle>
          <PriceInner style={tickersData?.quotes?.USD?.percent_change_30d&&
              tickersData?.quotes?.USD?.percent_change_30d >= 0 ? {color:"red"} : {color:"green"}}>
            <PriceViewItem>${tickersData?.quotes?.USD?.percent_change_30d}</PriceViewItem>
            {tickersData?.quotes?.USD?.percent_change_30d&&
            tickersData?.quotes?.USD?.percent_change_30d >= 0 ? <FaArrowTrendUp className='icon' /> : <FaArrowTrendDown className='icon' />}
          </PriceInner>
        </PriceView>

      </PriceViewOuter>
       

    </>
  )
}

export default Price
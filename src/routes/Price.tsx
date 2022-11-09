import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Wrapper = styled.div``;

interface RouterParams {
  coinId: string;
}

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
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const up = "https://cdn-icons-png.flaticon.com/512/5198/5198491.png";
const down = "https://cdn-icons-png.flaticon.com/512/5726/5726389.png";

const Changes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Change = styled.div`
  width: 200px;
  height: 200px;
  background-color: #eaeaea;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

const Graph = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-color: #b2b2b2;
  width: 180px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 30px;
`;

const Info = styled.span`
  font-size: 14px;
  color: #00abb3;
`;

function Price() {
  const { coinId } = useParams<RouterParams>();
  const { data, isLoading } = useQuery<PriceData>("tickers", () =>
    fetchCoinTickers(coinId)
  );

  return (
    <>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <Changes>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_15m as number) > 0 ? up : down
              }
            />
            <Info>15분 전에 비해 {data?.quotes.USD.percent_change_15m}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_30m as number) > 0 ? up : down
              }
            />
            <Info>30분 전에 비해 {data?.quotes.USD.percent_change_30m}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_1h as number) > 0 ? up : down
              }
            />
            <Info>1시간 전에 비해 {data?.quotes.USD.percent_change_1h}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_6h as number) > 0 ? up : down
              }
            />
            <Info>6시간 전에 비해 {data?.quotes.USD.percent_change_6h}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_12h as number) > 0 ? up : down
              }
            />
            <Info>12시간 전에 비해 {data?.quotes.USD.percent_change_12h}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_24h as number) > 0 ? up : down
              }
            />
            <Info>24시간 전에 비해 {data?.quotes.USD.percent_change_24h}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_30d as number) > 0 ? up : down
              }
            />
            <Info>30일 전에 비해 {data?.quotes.USD.percent_change_30d}%</Info>
          </Change>
          <Change>
            <Graph
              src={
                (data?.quotes.USD.percent_change_1y as number) > 0 ? up : down
              }
            />
            <Info>1년 전에 비해 {data?.quotes.USD.percent_change_1y}%</Info>
          </Change>
        </Changes>
      )}
    </>
  );
}

export default Price;

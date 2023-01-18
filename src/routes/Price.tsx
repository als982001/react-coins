import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

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

const Rows = styled.section`
  width: 100%;
`;

const Row = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 17px;
  font-weight: bold;
  margin: 20px 0;
  padding: 10px 0;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: 1px 1px 3px 3px ${(props) => props.theme.btnShadowColor},
    -1px 1px 3px 3px ${(props) => props.theme.btnShadowColor};

  &:hover {
    box-shadow: 1px 1px 1px 1px ${(props) => props.theme.btnShadowColor},
      -1px 1px 1px 1px ${(props) => props.theme.btnShadowColor};
  }
`;

const SohwTime = styled.p``;

const Changes = styled.div``;

const ChangePercent = styled.span``;

const ChangeImg = styled.span<{ changeVal: number }>`
  font-size: 25px;
  font-weight: bold;
  margin-left: 10px;
  color: ${(props) => (props.changeVal > 0 ? "red" : "blue")};
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Loader = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 20px;
`;

function Price() {
  const { coinId } = useParams<RouterParams>();
  const { data, isLoading } = useQuery<PriceData>("tickers", () =>
    fetchCoinTickers(coinId)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading Price...</Loader>
      ) : (
        <>
          <Rows>
            <Row style={{ marginTop: "0px" }}>
              <SohwTime>15분 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_15m}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_15m as number}
                >{`${
                  (data?.quotes.USD.percent_change_15m as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              <SohwTime>30분 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_30m}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_30m as number}
                >{`${
                  (data?.quotes.USD.percent_change_30m as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              <SohwTime>1시간 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_1h}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_1h as number}
                >{`${
                  (data?.quotes.USD.percent_change_1h as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              {" "}
              <SohwTime>6시간 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_6h}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_6h as number}
                >{`${
                  (data?.quotes.USD.percent_change_6h as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              {" "}
              <SohwTime>12시간 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_12h}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_12h as number}
                >{`${
                  (data?.quotes.USD.percent_change_12h as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              <SohwTime>24시간 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_24h}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_24h as number}
                >{`${
                  (data?.quotes.USD.percent_change_24h as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              {" "}
              <SohwTime>30일 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_30d}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_30d as number}
                >{`${
                  (data?.quotes.USD.percent_change_30d as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
            <Row>
              {" "}
              <SohwTime>1년 전에 비해...</SohwTime>
              <Changes>
                <ChangePercent>{`${data?.quotes.USD.percent_change_1y}%`}</ChangePercent>
                <ChangeImg
                  changeVal={data?.quotes.USD.percent_change_1y as number}
                >{`${
                  (data?.quotes.USD.percent_change_1y as number) > 0
                    ? "⤴️"
                    : "⤵️"
                }`}</ChangeImg>
              </Changes>
            </Row>
          </Rows>
        </>
      )}
    </Wrapper>
  );
}

export default Price;

import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  width: 80vw;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};

  &:hover {
    scale: 1.3;
  }
`;

const CoinsList = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 100px;
`;

const Row = styled(motion.section)`
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  border: 2px solid white;
  display: flex;
  box-shadow: 3px 3px 2px 1px ${(props) => props.theme.shadowColor},
    -3px 3px 2px 1px ${(props) => props.theme.shadowColor};
  align-items: center;
  font-weight: bold;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.5s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    scale: 1.3;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
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

const rowVariants = {
  init: (rowIdx: number) => ({
    x: rowIdx % 2 == 0 ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  show: {
    x: 0,
  },
};

const offset = 6;
const rowIdxes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function Coins() {
  // const setDarkAtom = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const topRatedData = data?.slice(0, 100);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          <AnimatePresence>
            {rowIdxes.map((rowIdx) => (
              <Row
                variants={rowVariants}
                custom={rowIdx}
                initial="init"
                animate="show"
                transition={{ type: "tween", duration: 1 }}
              >
                {topRatedData
                  ?.slice(rowIdx * offset, rowIdx * offset + offset)
                  .map((coin) => (
                    <Coin key={coin.id}>
                      <Link
                        to={{
                          pathname: `/${coin.id}`,
                          state: { name: coin.name },
                        }}
                      >
                        <Img
                          src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                        />
                        {coin.name}
                      </Link>
                    </Coin>
                  ))}
              </Row>
            ))}
          </AnimatePresence>
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

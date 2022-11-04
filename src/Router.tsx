import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { isDarkAtom } from "./atom";

const Wrapper = styled.div``;

const ThemeBtn = styled.div<{ nextTheme: string }>`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${(props) => props.nextTheme};
  position: fixed;
  top: 85vh;
  left: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 26px;
    color: green;
  }
`;

function Router() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const onBtnClick = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route path="/:coinId">
            <Coin />
          </Route>
          <Route path="/">
            <Coins />
          </Route>
        </Switch>
      </BrowserRouter>
      <ThemeBtn nextTheme={isDark ? "pink" : "black"} onClick={onBtnClick}>
        <span>{isDark ? "Light" : "Dark"}</span>
      </ThemeBtn>
    </Wrapper>
  );
}

export default Router;

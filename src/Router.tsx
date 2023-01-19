import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { isDarkAtom } from "./atom";
import OriginalCoins from "./routes/OriginalCoins";

const Wrapper = styled.div``;

const ThemeBtn = styled.div<{ currentTheme: string }>`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 1px ${(props) => (props.currentTheme === "dark" ? "white" : "black")}
    solid;
  background-color: ${(props) => props.theme.themeBtnColor};
  position: fixed;
  top: 85vh;
  left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 26px;
    color: ${(props) => (props.currentTheme === "dark" ? "white" : "white")};
  }

  &:hover {
    scale: 1.2;
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
          <Route path="/original">
            <OriginalCoins />
          </Route>
          <Route path="/:coinId">
            <Coin />
          </Route>
          <Route path="/">
            <Coins />
          </Route>
        </Switch>
      </BrowserRouter>
      <ThemeBtn currentTheme={isDark ? "dark" : "light"} onClick={onBtnClick}>
        <span>{isDark ? "☀️" : "🌙"}</span>
      </ThemeBtn>
    </Wrapper>
  );
}

export default Router;

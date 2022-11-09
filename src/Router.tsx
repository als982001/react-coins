import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import { isDarkAtom } from "./atom";

const Wrapper = styled.div``;

const ThemeBtn = styled.div<{ currentTheme: string }>`
  height: 80px;
  width: 80px;
  border-radius: 20px;
  border: 1px ${(props) => (props.currentTheme === "dark" ? "white" : "black")}
    solid;
  background-color: ${(props) =>
    props.currentTheme === "dark" ? "#171B20" : "#7A7A7A"};
  position: fixed;
  top: 85vh;
  left: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 26px;
    color: ${(props) => (props.currentTheme === "dark" ? "white" : "white")};
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
      <ThemeBtn currentTheme={isDark ? "dark" : "light"} onClick={onBtnClick}>
        <span>{isDark ? "Light" : "Dark"}</span>
      </ThemeBtn>
    </Wrapper>
  );
}

export default Router;

// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
    shadowColor: string;
    btnColor: string;
    btnShadowColor: string;
    themeBtnColor: string;
  }
}

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#fafafa",
  color: "rgb(38,38,38)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  accent: "#0095f6",
  color: "#fafafa",
  bgColor: "rgb(38,38,38)",
  borderColor: "rgb(100, 100, 100)",
};

export const GlobalStyles = createGlobalStyle`
${reset}
    input, button{
      all:reset;
    }
    * {
      box-sizing: border-box;
    }
    body {
        font-size: 12px;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.color};
        
    }
    a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
`;

// color: ${(props) => props.theme.fontColor};
// background-color: ${(props) => props.theme.bgColor};
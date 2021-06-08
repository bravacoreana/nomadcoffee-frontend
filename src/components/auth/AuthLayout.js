import styled from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkMode from "../DarkMode";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
  text-align: center;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function AuthLayout({ children }) {
  const darkmode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        {/* <DarkModeBtn onClick={darkmode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkmode ? faSun : faMoon} />
        </DarkModeBtn> */}
        <DarkMode />
      </Footer>
    </Container>
  );
}

export default AuthLayout;

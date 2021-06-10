import styled from "styled-components";
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

function AuthLayout({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkMode />
      </Footer>
    </Container>
  );
}

export default AuthLayout;

import styled from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  return (
    <Container>
      <Title>NOMAD COFFEE home</Title>

      <div>
        <button onClick={() => isLoggedInVar(false)}>log out</button>
        <button onClick={() => isDarkModeVar(true)}>dark</button>
        <button onClick={() => isDarkModeVar(false)}>light</button>
      </div>
    </Container>
  );
};

export default Home;

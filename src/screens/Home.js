import styled from "styled-components";
import { isDarkModeVar, isLoggedInVar, logUserOut } from "../apollo";

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
      <button onClick={() => logUserOut()}>logout~~</button>
    </Container>
  );
};

export default Home;

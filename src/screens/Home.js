import gql from "graphql-tag";
import styled from "styled-components";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { useQuery } from "@apollo/client";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Photos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const FEED_QUERY = gql`
  query seeCoffeeShops($page: Int) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      user {
        username
        avatar
      }
      categories {
        name
      }
      photos {
        id
        url
      }
      isMine
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Container>
      <PageTitle title="Home" />
      <Photos>
        {!loading
          ? data?.seeCoffeeShops?.map((shop) => (
              <Photo key={shop?.id} shop={shop} />
            ))
          : null}
      </Photos>
    </Container>
  );
};

export default Home;

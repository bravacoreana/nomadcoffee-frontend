import gql from "graphql-tag";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useQuery } from "@apollo/client";
import MapContainer from "../components/Map";
import Photo from "../components/feed/Photo";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
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
      {/* {!loading && data?.seeCoffeeShops?.map((shop) => (
        <MapContainer key={shop?.id} shop={shop} />
      ))} */}
      <MapContainer />
    </Container>
  );
};

export default Home;

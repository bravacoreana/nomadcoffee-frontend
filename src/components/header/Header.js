import styled from "styled-components";
import routes from "../../routes";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";
import DarkMode from "../DarkMode";
import Search from "./Search";
import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHome, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { isLoggedInVar, logUserOut } from "../../apollo";
import { Link } from "react-router-dom";

const HeaderStyle = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
`;

const Column = styled.div``;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  margin-left: 15px;
  font-size: 13px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useUser();
  if (error) console.log("[useUser]", data);

  return (
    <HeaderStyle>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faMugHot} size="2x" />
          </Link>
        </Column>
        <Column>
          <Search />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Link to={routes.createShop}>
                <button>create Shop</button>
              </Link>
              <button onClick={() => logUserOut()}>logout~~</button>
              <Icon>
                <DarkMode />
              </Icon>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </HeaderStyle>
  );
}
export default Header;

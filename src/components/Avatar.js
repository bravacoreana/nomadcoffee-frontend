import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyleAvatar = styled.div`
  width: ${(props) => (props.large ? "35px" : "25px")};
  height: ${(props) => (props.large ? "35px" : "25px")};
  border-radius: 50%;
  background-color: ${(props) => props.theme.avatarBgColor};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: ${(props) => props.theme.avatarUserColor};
  }
`;

const Img = styled.img`
  max-width: 100%;
  overflow: hidden;
`;

function Avatar({ url = "", large = false }) {
  return (
    <StyleAvatar large={large}>
      {url !== "" && url !== null ? (
        <Img src={url} alt="avatar" />
      ) : (
        <FontAwesomeIcon icon={faUser} size="lg" />
      )}
    </StyleAvatar>
  );
}

export default Avatar;

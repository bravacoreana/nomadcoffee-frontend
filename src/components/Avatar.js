import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { default: styled } = require("styled-components");

const StyleAvatar = styled.div`
  width: ${(props) => (props.large ? "35px" : "25px")};
  height: ${(props) => (props.large ? "35px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

// const Img = styled.img`
//   max-width: 100%;
// `;

function Avatar({ url = "", large = false }) {
  return (
    <StyleAvatar large={large}>
      {url !== null ? (
        <img src={url} alt="avatar" />
      ) : (
        <FontAwesomeIcon icon={faUser} size="lg" />
      )}
    </StyleAvatar>
  );
}

export default Avatar;

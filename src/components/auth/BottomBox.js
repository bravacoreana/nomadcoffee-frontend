import styled from "styled-components";
import PropTypes from "prop-types";
import { BaseBox } from "../common";
import { Link } from "react-router-dom";

const BottomBoxStyle = styled(BaseBox)`
  padding: 20px 40px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

function BottomBox({ cta, link, linkText }) {
  return (
    <BottomBoxStyle>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </BottomBoxStyle>
  );
}

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default BottomBox;

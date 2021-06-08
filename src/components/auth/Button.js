import styled from "styled-components";

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  border-radius: 3px;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  align-items: center;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export default Button;

// function Button(props) {
//   return <ButtonAuth {...props} />;
// }

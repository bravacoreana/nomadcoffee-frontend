import styled from "styled-components";

const StyleFormError = styled.span`
  color: ${props => props.theme.warnColor};
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function FormError({ message }) {
  return message === "" || !message ? null : (
    <StyleFormError>{message}</StyleFormError>
  );
}

export default FormError;

import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 10px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? props.theme.warnColor : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:last-child {
    border: none;
    margin-top: 12px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
  }
  &:focus {
    outline: none;
    border-color: rgb(38, 38, 38);
  }
`;

// function Input(props) {
//   return <InputStyle {...props} />;
// }

const Input = React.forwardRef((props, ref) => (
  <InputStyle ref={ref} {...props} />
));

export default Input;

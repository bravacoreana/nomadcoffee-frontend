import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  display: flex;
  align-items: baseline;
  svg {
    font-size: 36px;
    margin-left: 5px;
  }
`;

export const BoldLink = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.color};
`;

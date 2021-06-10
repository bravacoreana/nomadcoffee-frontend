import styled from "styled-components";

const SearchInput = styled.input`
  width: 150%;
  padding: 7px 15px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  box-sizing: border-box;
  color: ${(props) => props.theme.color};
  &:focus {
    outline: none;
  }
  border-radius: 15px;
`;

function Search() {
  return (
    <div>
      <SearchInput />
    </div>
  );
}
export default Search;

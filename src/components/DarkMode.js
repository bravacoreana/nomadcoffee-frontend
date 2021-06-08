import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeBtn = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

function DarkMode() {
  const darkmode = useReactiveVar(isDarkModeVar);
  return (
    <>
      <DarkModeBtn onClick={darkmode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkmode ? faSun : faMoon} />
      </DarkModeBtn>
    </>
  );
}
export default DarkMode;

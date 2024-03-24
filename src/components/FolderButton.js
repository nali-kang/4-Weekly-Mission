import { styled } from "styled-components";

const FolderButton = ({ name, request, isActive }) => {
  return (
    <ButtonStyle onClick={() => request()} isActive={isActive}>
      {name}
    </ButtonStyle>
  );
};
export default FolderButton;

const ButtonStyle = styled.button`
  padding: 8px 12px;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #6d6afe;
  background: ${(props) => (props.isActive ? "#6d6afe" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  cursor: pointer;

  @media (max-width: 767px) {
    padding: 6px 10px;
  }
`;

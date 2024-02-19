import { styled } from "styled-components";
const FolderButton = ({ name, request, isActive }) => {
  const ButtonStyle = styled.button`
    padding: 8px 12px;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #6d6afe;
    background: ${isActive ? "#6d6afe" : "#fff"};
    color: ${isActive ? "#fff" : "#000"};
    cursor: pointer;
  `;

  return <ButtonStyle onClick={() => request()}>{name}</ButtonStyle>;
};

export default FolderButton;

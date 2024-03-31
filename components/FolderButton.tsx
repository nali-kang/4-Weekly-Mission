import { styled } from "styled-components";

type props = {
  children: React.ReactNode;
  request: () => void;
  isActive: boolean;
};

const FolderButton = ({ children, request, isActive }: props) => {
  return (
    <ButtonStyle onClick={() => request()} isActive={isActive}>
      {children}
    </ButtonStyle>
  );
};
export default FolderButton;

const ButtonStyle = styled.button<{ isActive: boolean }>`
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

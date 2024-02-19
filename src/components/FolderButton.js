const FolderButton = ({ name, request }) => {
  return <button onClick={() => request()}>{name}</button>;
};

export default FolderButton;

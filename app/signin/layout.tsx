import React from "react";

type Props = {
  children: React.ReactNode;
};
const SigninLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default SigninLayout;

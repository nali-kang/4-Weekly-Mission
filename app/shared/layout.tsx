import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const SharedLayout = ({ children }: Props) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default SharedLayout;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import FolderPage from "./pages/FolderPage";
import SharedPage from "./pages/SharedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/shared" element={<SharedPage />}></Route>
          <Route path="/folder" element={<FolderPage />}></Route>
        </Route>
        <Route element={<SigninPage />} path="/signin" />
        <Route element={<SignupPage />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

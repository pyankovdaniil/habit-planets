import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import Error from "./components/Error";
import RequireAuth from "./components/RequireAuth";

import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Регистрация и авторизация */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />

        {/* Главная страница */}
        <Route path="/" element={<Home />} />

        {/* Страница пользователя (доступна только авторизованным) */}
        <Route element={<RequireAuth />}>
          <Route path="/my-habits" element={<UserPage />} />
        </Route>

        {/* Перехват ошибок */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;

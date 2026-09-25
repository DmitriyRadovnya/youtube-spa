import { Navigate, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Register } from "./components/authorization/Register";
import { useAppSelector } from "./rtk/store";
import { Layout } from "./components/Layout";
import { Login } from "./components/authorization/Login";
import { Search } from "./components/search/Search";
import { Favorites } from "./components/favorites/Favorites";

const Protected = () => {
  const isAuth = useAppSelector((store) => store.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="register" replace />;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route index element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

import "./CSS/App.css";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./components/Home";
import LoginForm from "./auth/LoginForm";
import Navbar from "./components/Navbar";
import AdminDash from "./components/AdminDash";
import UserPage from "./components/UserPage";

import BreweriesList from "./breweries/BreweriesList";

import BreweryDetail from "./breweries/BreweryDetail";

import UserList from "./users/UserList";
import Profile from "./users/Profile";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import CreateBrewery from "./breweries/CreateBrewery";
import UpdateBrewery from "./breweries/UpdateBrewery";
import UserBreweries from "./users/UserBreweries";
import AddBrewery from "./users/AddBrewery";
import RegisterForm from "./auth/RegisterForm";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unathorized";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}

          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedTypes={["user", "admin"]} />}>
            {/* Logged In routes */}

            <Route path="user" element={<UserPage />} />
            <Route path="users/:userId" element={<Profile />} />
            <Route path="users/:userId/update" element={<UpdateUser />} />
            <Route path="users/:userId/breweries" element={<UserBreweries />} />
            <Route
              path="users/:userId/breweries/new"
              element={<AddBrewery />}
            />
            <Route path="breweries/:breweryId" element={<BreweryDetail />} />
            <Route
              path="breweries/:breweryId/update"
              element={<UpdateBrewery />}
            />
          </Route>
          <Route element={<RequireAuth allowedTypes={["admin"]} />}>
            {/* Admin routes */}

            <Route path="admin" element={<AdminDash />} />
            <Route path="/users" element={<UserList />} />
            <Route path="users/new" element={<CreateUser />} />

            <Route path="breweries" element={<BreweriesList />} />
            <Route path="breweries/new" element={<CreateBrewery />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

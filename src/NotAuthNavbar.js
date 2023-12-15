const Navbar = () => {
  const { setAuth, user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    console.log(res.data);
    setAuth(false);
    navigate("/login");
  };

  return (
    <section>
      <div className="navbar">
        <ul className="navbar-menu">
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/profile"}>Welcome {user.username}</Link>
          </li>
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

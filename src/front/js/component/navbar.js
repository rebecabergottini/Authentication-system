import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const {actions}= useContext(Context)
	let navigate = useNavigate()

	function handleLogout() {
		let isLogged = actions.logout()
		if (isLogged) {
			localStorage.removeItem("myToken")
			navigate("/login")
		}
	}

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
				</Link>
				<Link to="/login">
  					<button className="btn btn-primary">Login</button>
				</Link>
				<Link to="/signup">
  					<button className="btn btn-primary">Signup</button>
				</Link>
			</div>
		</nav>
	);
};
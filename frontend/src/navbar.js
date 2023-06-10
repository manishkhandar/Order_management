import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div>
			<h2>Home Page</h2>
			<Link to="/login">
				<button>Login</button>
			</Link>
			<Link to="/signup">
				<button>Sign Up</button>
			</Link>
		</div>
	);
};

export default Nav;

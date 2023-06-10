import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './adduser';
import LoginForm from './login';
import HomePage from './home';
import NavBar from './navbar';

const App = () => {
	return (
		<Router>
			<div className="app-container">
				{/* <NavBar /> */}
				<Routes>
					<Route path="/" element={<NavBar/>} />
					<Route path="/login" element={<LoginForm/>} />
					<Route path="/signup" element={<AddUser/>} />
					<Route path="/home" element={<HomePage/>} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;

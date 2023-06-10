import React from 'react';
import { useLocation } from 'react-router-dom';
import AddOrder from './addorder';
import GetOrder from './getorder';
import { useNavigate  } from 'react-router-dom';





const HomePage = () => {
	const location = useLocation();
	const responseData = location.state?.responseData;
	const navigate = useNavigate ();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div>
			<h2>Home page</h2>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>

			{responseData && (
				<pre>{JSON.stringify(responseData.message, null, 2)}</pre>
			)}

			{responseData && (
				<pre>{JSON.stringify(responseData.token, null, 2)}</pre>
			)}

			{responseData && (
				<pre>{JSON.stringify(responseData.userDetails, null, 2)}</pre>
			)}

			<AddOrder/>
			<GetOrder/>
		</div>
    
	);
};

export default HomePage;

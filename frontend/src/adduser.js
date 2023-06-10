import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
const URLSearchParams = require('url-search-params')


const RegisterForm = () => {
	const [name, setUsername] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate ();
	const [responseData, setResponseData] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:8080/add-user', {
				mode: 'no-cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': '*/*'
				},
				body: new URLSearchParams({name:name, email:email, phoneNumber:phoneNumber, password:password }),
			});

			const data = await response.json();
			setResponseData(data);
			if(data.status !== 200){
				navigate('/signup',  {state: { responseData: data}});
			} else {
				localStorage.setItem('token', data.token);
				navigate('/home',  {state: { responseData: data}});
			}
		} catch (error) {
			console.error('Error registering user:', error);
		}

		setUsername('');
		setEmail('');
		setPhoneNumber('');
		setPassword('');
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="tel"
					placeholder="Phone Number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Register</button>
			</form>
			{responseData && (
				<pre>{JSON.stringify(responseData.message, null, 2)}</pre>
			)}
			<br/>
			<br/>
			Already Account?  
			<a href="/login">   Login</a>
		</div>
	);
};

export default RegisterForm;

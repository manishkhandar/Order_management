import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const LoginForm = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [loginBy, setLoginBy] = useState('');
  
	const navigate = useNavigate ();
	const [responseData, setResponseData] = useState(null);


	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:8080/login-user', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				},
				body: new URLSearchParams({phoneNumber:phoneNumber, password:password, loginBy: loginBy}),
			})
				.catch(error => {
					console.error(error);
				});
			const response = await res.text();
			const data = JSON.parse(response);
			setResponseData(data);
			if(data.status !== 200){
				navigate('/login',  {state: { responseData: data}});
			} else {
				localStorage.setItem('token', data.token);
				navigate('/home',  {state: { responseData: data}});
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}

		setPhoneNumber('');
		setPassword('');
		setLoginBy('');
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type="text"
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
				<label>
        Login By:
					<select value={loginBy} onChange={(e) => setLoginBy(e.target.value)}>
						<option value="">-- Select --</option>
						<option value="google">Google</option>
						<option value="normal">Normal</option>
					</select>
				</label>
				<button type="submit">Login</button>
			</form>
			{responseData && (
				<pre>{JSON.stringify(responseData.message, null, 2)}</pre>
			)}
			<br/>
			<br/>
			New User?   
			<a href="/signup">  Sign Up</a>
		</div>
	);
};

export default LoginForm;

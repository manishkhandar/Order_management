import React, { useState } from 'react';

const GetOrderForm = () => {
	const [userId, setUserId] = useState('');
	const [responseData, setResponseData] = useState(null);


	const handlegetOrder = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:8080/get-order' +'?userId='+ userId , {
				mode: 'cors',
				method: 'GET',
				headers: {
					Authorization: `${localStorage.getItem('token')}`,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			})
				.catch(error => {
					console.error(error);
				});
			const response = await res.json();
			setResponseData(response);
		} catch (error) {
			console.error('Error logging in:', error);
		}
		setUserId('')
	};

	return (
		<div>
			<h2>Get Order</h2>
			<form onSubmit={handlegetOrder}>
				<input
					type="text"
					placeholder="UserId"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					required
				/>
				<button type="submit">Get Ordesr</button>
			</form>
			{responseData && (
				<div>
					<pre>{JSON.stringify(responseData, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default GetOrderForm;
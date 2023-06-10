import React, { useState } from 'react';

const AddOrderForm = () => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userId, setUserId] = useState('');
	const [subTotal, setSubTotal] = useState('')
	const [responseData, setResponseData] = useState(null);


	const handleAddOrder = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:8080/add-order', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
					'authorization': `${localStorage.getItem('token')}`
				},
				body: new URLSearchParams({userId:userId, subTotal:subTotal, phoneNumber: phoneNumber }),
			})
				.catch(error => {
					console.error(error);
				});
			const response = await res.text();
			const data = JSON.parse(response);
			setResponseData(data);
		} catch (error) {
			console.error('Error logging in:', error);
		}
		setUserId('')
		setSubTotal('')
		setPhoneNumber('');
	};

	return (
		<div>
			<h2>Add Order</h2>
			<form onSubmit={handleAddOrder}>
				<input
					type="text"
					placeholder="UserId"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					required
				/>
				<input
					type="Number"
					placeholder="SubTotal"
					value={subTotal}
					onChange={(e) => setSubTotal(e.target.value)}
					required
				/>
				<input
					type="tel"
					placeholder="Phone Number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					required
				/>
				<button type="submit">Add New Order</button>
			</form>
			{responseData && (
				<div>
					<pre>{JSON.stringify(responseData.message, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default AddOrderForm;
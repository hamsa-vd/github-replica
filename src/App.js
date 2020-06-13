import React, { useState, useEffect } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
function App() {
	const [ userdata, setUserdata ] = useState('');
	const [ formdata, setFormdata ] = useState('');
	const [ userRepos, setUserRepos ] = useState([]);
	const { register, handleSubmit, errors } = useForm();
	const submit = (data) => {
		setFormdata(data);
	};
	useEffect(
		() => {
			console.log(formdata);
			if (formdata) {
				axios
					.get(`https://api.github.com/users/${formdata.user}`)
					.then((v) => {
						setUserdata(v.data);
						axios
							.get(`https://api.github.com/users/${formdata.user}/repos`)
							.then((v) => setUserRepos(v.data))
							.catch((err) => console.log(err));
					})
					.catch((err) => setUserdata(''));
			}
		},
		[ formdata ]
	);
	return (
		<div
			className="App container text-center"
			style={{
				textTransform: 'capitalize',
				// backgroundColor: 'black',
				backdropFilter: 'brightness(70%)',
				color: 'white',
				minHeight: '100vh'
			}}
		>
			<h1 className="display-3">search for users</h1>
			<form action="" onSubmit={handleSubmit(submit)}>
				<label htmlFor="user">
					<p className="lead outline-info">user name</p>
					<input
						ref={register({ required: 'this is required field' })}
						type="text"
						name="user"
						id="user"
						autoFocus
					/>
				</label>
				<button type="submit" className="btn btn-info ml-2">
					submit
				</button>
			</form>
			{errors.user && <span className="text-danger">{errors.user.message}</span>}
			{userdata && (
				<div className="container row">
					<img src={userdata.avatar_url} className="card-img-top" alt="profile pic" />
					<div className="card-body">
						<h2 className="card-title">{userdata.login}</h2>
						<h5 className="card-subtitle">Repositories : </h5>
						{userRepos.length && (
							<ul className="card-text list-group">
								{userRepos.map((v) => (
									<li className="list-group-item text-dark" key={v.id}>
										{v.name}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
			{!userdata && formdata && <div className="row lead text-danger">Enter a valid search</div>}
		</div>
	);
}

export default App;

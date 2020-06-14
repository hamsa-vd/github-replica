import React, { useState, useEffect } from 'react';
import '../styles/navBar.css';
import axios from 'axios';
function NavBar() {
	const initialval = {
		input: 'freeCodeCamp',
		select: 'users'
	};
	const [ submit, setSubmit ] = useState(false);
	const [ inputVal, setInputVal ] = useState(initialval.input);
	const [ selectVal, setSelectVal ] = useState(initialval.select);
	const [ gitdata, setGitData ] = useState(false);

	useEffect(
		() => {
			axios
				.get(`https://api.github.com/search/${selectVal}?q=${inputVal}+in:name`)
				.then((res) => {
					setGitData(res.data);
				})
				.catch((err) => console.log(err));
			return () => {
				setSubmit(false);
			};
		},
		[ submit ]
	);

	const options = [
		{ id: 1, value: 'users', label: 'users' },
		{ id: 2, value: 'repositories', label: 'repositories' }
	];
	const searchChange = (event) => {
		//this is for search input change
		setInputVal(event.target.value);
	};
	const search_termChange = (event) => {
		//this is for select box change
		setSelectVal(event.target.value);
	};
	const searchdata = (e) => {
		//whole form submit
		e.preventDefault();
		setSubmit(true);
	};
	return (
		<React.StrictMode>
			<header className="NavBar">
				<nav>
					<h2 className="logo">
						<a href="http://github.com">Github</a>
					</h2>
					<form action="" onSubmit={searchdata}>
						<select name="search_term" id="search_term" value={selectVal} onChange={search_termChange}>
							{options.map((v) => (
								<option key={v.id} value={v.value}>
									{v.label}
								</option>
							))}
						</select>
						<input type="text" placeholder="Search" value={inputVal} onChange={searchChange} />
						<button type="submit">search</button>
					</form>
				</nav>
			</header>
			<div className="container row my-2 mx-auto">
				{gitdata &&
					selectVal === 'users' &&
					gitdata['items'].map((v) => (
						<div key={v.id} className="card col-lg-4 col-md-6 col-sm-12">
							<img src={v['avatar_url']} className="card-img-top img-responsive" alt="unable to find" />
							<h4 className="card-title">{v.login}</h4>
							<div className="card-body container row mx-auto">
								<button className="btn btn-info col-4 m-2">profile</button>
								<button className="btn btn-info col-4 m-2">followers</button>
								<button className="btn btn-info col-4 m-2">orgs</button>
								<button className="btn btn-info col-4 m-2">repos</button>
								<button className="btn btn-info col-6 m-2">subscriptions</button>
							</div>
						</div>
					))}
			</div>
		</React.StrictMode>
	);
}

export default NavBar;

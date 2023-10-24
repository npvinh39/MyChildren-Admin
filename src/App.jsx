import React from 'react';
import { Login, Dashboard } from './components';
import { Route, Routes, } from "react-router-dom";
import Cookies from 'js-cookie';

function App() {
	// const access_Token = Cookies.get('accessToken')
	// console.log('access_Token', access_Token)
	// if (!access_Token) {
	// 	return (
	// 		<Login />
	// 	)
	// }

	return (
		<>
			<Dashboard />
		</>
	)
}

export default App

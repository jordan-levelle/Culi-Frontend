import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { auth } from "./config/firebase";
import { useSendLoginMutation } from "./app/api/authApiSlice";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Spinner from "./components/Spinner";
import Error from "./pages/Error";

const App = () => {
	const [sendLogin, { isLoading }] = useSendLoginMutation();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				user.getIdToken(true).then(async (token) => {
					await sendLogin({ token });
				});
			} else {
				console.log("No user");
			}
		});

		return unsubscribe;
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<Signup />}></Route>
				<Route path='/profile' element={<Profile />}></Route>
			</Route>

			<Route path='*' element={<Error />}></Route>
		</Routes>
	);
};

export default App;

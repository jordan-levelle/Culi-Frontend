import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectProfile, selectIsAuthenticated } from "../../app/api/authSlice";
import { useLogoutMutation } from "../../app/api/authApiSlice";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

import { Flex, Avatar, Button } from "@mantine/core";

import Spinner from "../Spinner";

const UserAvatar = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const { username, profilePicture } = useSelector(selectProfile);

	const [logout, { isLoading }] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			Promise.all([logout(), signOut(auth)]);
		} catch (error) {
			console.error(error);
		}
	};

	let content = null;

	if (isAuthenticated) {
		content = (
			<Flex align='center' gap={6}>
				<Link to='/profile'>
					<Avatar src={profilePicture} alt={username} radius='xl' referrerPolicy="no-referrer"/>
				</Link>
				<Button onClick={handleLogout} variant='gradient'>
					Logout
				</Button>
			</Flex>
		);
	} else {
		content = (
			<Flex align='center' gap={6}>
				<Link to='/signup'>
					<Button variant='gradient'>Sign Up</Button>
				</Link>
				<Link to='/login'>
					<Button variant='outline'>Log In</Button>
				</Link>
			</Flex>
		);
	}

	if (isLoading) {
		content = <Spinner />;
	}

	return <>{content}</>;
};

export default UserAvatar;

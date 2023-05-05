import { useNavigate } from "react-router-dom";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
	useSendLoginMutation,
	useLogoutMutation,
} from "../../app/api/authApiSlice";

import { Button, Image } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import GoogleLogoUrl from "../../assets/GoogleLogo.svg";

import Spinner from "../Spinner";

const GoogleLogin = () => {
	const navigate = useNavigate();

	const [sendLogin, { isLoading }] = useSendLoginMutation();
	const [logout] = useLogoutMutation();

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const data = result.user;
			const token = await data.getIdToken(true);
			await sendLogin({ token });
			navigate("/");
		} catch (error) {
			let message = "";
			switch (error.code) {
				case "auth/popup-blocked":
					message = "Please allow popups to continue";
					break;
				case "auth/popup-closed-by-user":
					message = "You have closed the Google Login popup, please try again";
					break;
				default:
					message = "There is an error, please try again";
					break;
			}
			notifications.show({
				title: "Error Logging In",
				message,
				color: "red",
				withCloseButton: true,
				autoClose: 5000,
			});
			await signOut(auth);
			await logout();
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Button variant='default' onClick={loginWithGoogle}>
				<Image src={GoogleLogoUrl} alt='Google Logo' width={20} height={20} />
				&nbsp; Sign in with Google
			</Button>
		</>
	);
};

export default GoogleLogin;

import { useNavigate } from "react-router-dom";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useSendLoginMutation } from "../../app/api/authApiSlice";

import { Button, Image } from "@mantine/core";
import GoogleLogoUrl from "../../assets/GoogleLogo.svg";

import Spinner from "../Spinner";

const GoogleLogin = () => {
	const navigate = useNavigate();

	const [sendLogin, { isLoading }] = useSendLoginMutation();

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const data = result.user;
			const token = await data.getIdToken(true);
			await sendLogin({ token });
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	let content = null;

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

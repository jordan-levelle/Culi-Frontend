import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";

import { Button } from "@mantine/core";
import { Image } from "@mantine/core";
import GoogleLogoUrl from "../assets/GoogleLogo.svg";

const GoogleLogin = () => {
	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const data = result.user;
			const token = await data.getIdToken(true);
			const user = {
				uid: data.uid,
				email: data.email,
				username: data.displayName,
				profilePicture: data.photoURL,
				token,
			};
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button variant='default' radius='lg' onClick={loginWithGoogle}>
				<Image src={GoogleLogoUrl} alt='Google Logo' width={20} height={20} />
				&nbsp; Login with Google
			</Button>
		</>
	);
};

export default GoogleLogin;

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const EmailSignup = () => {
	const signupWithEmail = async (email, password) => {
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const data = result.user;
			console.log(data);
			const token = await data.getIdToken(true);
			console.log(token);
			// const user = {
			//   uid: data.uid,
			//   email: data.email,
			//   username: data.displayName,
			//   profilePicture: data.photoURL,
			//   token,
			// }
			// console.log(user)
		} catch (error) {
			console.error(error);
		}
	};

	return <div>EmailSignup</div>;
};

export default EmailSignup;

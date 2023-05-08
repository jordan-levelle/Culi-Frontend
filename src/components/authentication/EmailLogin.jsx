import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebase";
import {
	useSendLoginMutation,
	useLogoutMutation,
} from "../../app/api/authApiSlice";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
	TextInput,
	PasswordInput,
	Button,
	Group,
	Box,
	Title,
	Flex,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import Logo from "../Logo";
import Spinner from "../Spinner";

const EmailLogin = ({ removeActive }) => {
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		validate: {
			email: isEmail("Invalid Email"),
			password: isNotEmpty("Password is required"),
		},
	});

	const [sendLogin, { isLoading }] = useSendLoginMutation();
	const [logout] = useLogoutMutation();

	const signinWithEmail = async (credentials) => {
		try {
			const result = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password,
			);
			const user = result.user;
			if (!user.emailVerified) {
				notifications.show({
					title: "Unverified Email",
					message: "Please verify your email first before logging in",
					color: "red",
					withCloseButton: true,
					autoClose: 5000,
				});
				await signOut(auth);
				await logout();
				return;
			}
			const token = await user.getIdToken(true);
			await sendLogin({ token });
			if (removeActive) {
				removeActive();
			}
			navigate("/");
		} catch (error) {
			let message = "";
			switch (error.code) {
				case "auth/wrong-password":
					message = "Wrong password, please try again";
					break;
				case "auth/invalid-email":
					message = "Please enter a valid Email address";
					break;
				case "auth/user-not-found":
					message = "Your Email is not registered, please register first";
					navigate("/signup");
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
		<Box
			component='form'
			onSubmit={form.onSubmit((values) => signinWithEmail(values))}
		>
			<Flex direction='column' align='center' gap={6}>
				<Logo />
				<Title order={5}>Cultivate the Sense</Title>
			</Flex>

			<TextInput
				label='Email'
				placeholder='youremail@example.com'
				withAsterisk
				mt='md'
				{...form.getInputProps("email")}
			/>
			<PasswordInput
				label='Password'
				withAsterisk
				mt='md'
				{...form.getInputProps("password")}
			/>

			<Group position='right' mt='md'>
				<Button type='submit' variant='gradient'>
					Login
				</Button>
			</Group>
		</Box>
	);
};

export default EmailLogin;

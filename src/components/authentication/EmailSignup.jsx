import { useNavigate } from "react-router-dom";

import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	deleteUser,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { useLogoutMutation } from "../../app/api/authApiSlice";

import {
	TextInput,
	PasswordInput,
	Button,
	Group,
	Box,
	Divider,
	Center,
	Title,
	Flex,
} from "@mantine/core";
import { useForm, isEmail, hasLength, matchesField } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import GoogleLogin from "./GoogleLogin";
import Logo from "../Logo";
import Spinner from "../Spinner";

const EmailSignup = ({ setActive }) => {
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate: {
			username: hasLength(
				{ min: 3, max: 16 },
				"Username must be between 3 to 16 characters",
			),
			email: isEmail("Invalid Email"),
			password: hasLength(
				{ min: 8, max: 16 },
				"Password must be between 8 to 16 characters",
			),
			confirmPassword: matchesField("password", "Passwords must match"),
		},
	});

	const [logout, { isLoading }] = useLogoutMutation();

	const signupWithEmail = async (credentials) => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password,
			);
			await updateProfile(auth.currentUser, {
				displayName: credentials.username,
			});
			await sendEmailVerification(auth.currentUser);
			setActive(1);
		} catch (error) {
			let message = "";
			switch (error.code) {
				case "auth/email-already-in-use":
					message = "This email is already registered, please login";
					navigate("/login");
					break;
				case "auth/invalid-email":
					message = "Please enter a valid Email address";
					break;
				case "auth/weak-password":
					message = "Your password is weak, please use a strong password";
				default:
					message = "There is an error, please try again";
					await deleteUser(auth.currentUser);
					break;
			}
			notifications.show({
				title: "Error Signing Up",
				message,
				color: "red",
				withCloseButton: true,
				autoClose: 5000,
			});
			await logout();
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Box
			className='rounded-lg shadow-lg p-8'
			component='form'
			maw={400}
			mx='auto'
			mt={20}
			onSubmit={form.onSubmit((values) => signupWithEmail(values))}
		>
			<Flex direction='column' align='center' gap={6}>
				<Logo />
				<Title order={5}>Cultivate the Sense</Title>
			</Flex>
			<TextInput
				label='Username'
				withAsterisk
				mt='md'
				{...form.getInputProps("username")}
			/>
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
			<PasswordInput
				label='Confirm Password'
				withAsterisk
				mt='md'
				{...form.getInputProps("confirmPassword")}
			/>

			<Group position='right' mt='md'>
				<Button type='submit' variant='gradient'>
					Sign Up
				</Button>
			</Group>

			<Divider my='lg' label='Or' labelPosition='center' />

			<Center>
				<GoogleLogin />
			</Center>
		</Box>
	);
};

export default EmailSignup;

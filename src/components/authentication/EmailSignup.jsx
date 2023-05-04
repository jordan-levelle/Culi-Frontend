import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";

import { TextInput, Button, Group, Box, Divider,Center } from "@mantine/core";
import { useForm, isEmail, hasLength, matchesField } from "@mantine/form";

import GoogleLogin from "./GoogleLogin";

const EmailSignup = () => {
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
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box
      className="rounded-lg shadow-lg p-8"
			component='form'
			maw={400}
			mx='auto'
			onSubmit={form.onSubmit((values) => signupWithEmail(values))}
		>
      
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
			<TextInput
				label='Password'
				type='password'
				withAsterisk
				mt='md'
				{...form.getInputProps("password")}
			/>
			<TextInput
				label='Confirm Password'
				type='password'
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

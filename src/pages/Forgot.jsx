import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

import {
	createStyles,
	TextInput,
	Button,
	Box,
	Title,
	Flex,
	Group,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import Logo from "../components/Logo";

const useStyle = createStyles(() => ({
	link: {
		color: "white",
		textDecoration: "none",
	},
}));

const Forgot = () => {
	const [showRedirect, setShowRedirect] = useState(false);
	const { classes } = useStyle();

	const form = useForm({
		initialValues: {
			email: "",
		},
		validate: {
			email: isEmail("Invalid Email"),
		},
	});

	const sendEmail = async (credentials) => {
		try {
      setShowRedirect(true);
			await sendPasswordResetEmail(auth, credentials.email);
			notifications.show({
				title: "Email Sent",
				message: "Check your inbox for a password reset link",
				color: "green",
				withCloseButton: true,
				autoClose: 5000,
			});
		} catch (error) {
			let message = "";
			switch (error.code) {
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
		}
	};

	return (
		<>
			<Group position='center'>
				<Title order={2}>
					Please use the form below to reset your password
				</Title>
			</Group>
			<Box
				className='rounded-lg shadow-lg p-8'
				maw={400}
				mx='auto'
				mt={20}
				component='form'
				onSubmit={form.onSubmit((values) => sendEmail(values))}
			>
				<Flex direction='column' align='center' gap={6}>
					<Logo />
					<Title order={5}>Cultivate the Sense</Title>
				</Flex>

				<TextInput
					label='Email'
          disabled={showRedirect}
					placeholder='youremail@example.com'
					withAsterisk
					mt='md'
					{...form.getInputProps("email")}
				/>

				<Group position='center' mt='xl'>
					{showRedirect ? (
						<Button variant='gradient'>
							<Link className={classes.link} to='/login'>
								I Have Reset My Password
							</Link>
						</Button>
					) : (
						<Button type='submit' variant='gradient'>
							Send Reset Email
						</Button>
					)}
				</Group>
			</Box>
		</>
	);
};

export default Forgot;

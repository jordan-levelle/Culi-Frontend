import { useNavigate, Link } from "react-router-dom";

import { auth } from "../../config/firebase";
import { useLogoutMutation } from "../../app/api/authApiSlice";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
	createStyles,
	TextInput,
	PasswordInput,
	Button,
	Text,
	Box,
	Title,
	Flex,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import Logo from "../Logo";

const useStyles = createStyles((theme) => ({
	link: {
		color: theme.primaryColor,
		textDecoration: "none",
	},
}));

const EmailLogin = ({ removeActive }) => {
	const navigate = useNavigate();
	const { classes } = useStyles();

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

	const [logout] = useLogoutMutation();

	const signinWithEmail = async (credentials) => {
		try {
			await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password,
			);
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

			<Flex justify='space-between' align='center' mt='md'>
				<Link to='/forgot' className={classes.link}>
					<Text fz='sm'>I forgot my password</Text>
				</Link>
				<Button type='submit' variant='gradient'>
					Login
				</Button>
			</Flex>
		</Box>
	);
};

export default EmailLogin;

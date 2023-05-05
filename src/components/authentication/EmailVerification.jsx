import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

import { Flex, Button, Title, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const EmailVerification = ({ setActive }) => {
	const goToLogin = async () => {
		const user = auth.currentUser;
		await user.reload();
		if (!user || !user.emailVerified) {
			notifications.show({
				title: "Please verify your Email",
				message: "Check your inbox for the verification email",
				color: "red",
				withCloseButton: true,
				autoClose: 5000,
			});
		} else {
      await signOut(auth);
			setActive(2);
		}
	};

	return (
		<Flex direction='column' align='center' justify='center' mt={20}>
			<Title order={1}>Verification Email Sent</Title>
			<Text fz='lg'>Please confirm your email address</Text>
			<Button mt='lg' variant='gradient' onClick={goToLogin}>
				Proceed to Login
			</Button>
		</Flex>
	);
};

export default EmailVerification;

import { useNavigate, Link } from "react-router-dom";

import {
	Paper,
	createStyles,
	Title,
	rem,
	Text,
	Divider,
	Center,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import EmailLogin from "../components/authentication/EmailLogin";
import GoogleLogin from "../components/authentication/GoogleLogin";

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: useViewportSize().height - 60,
		backgroundSize: "cover",
		backgroundImage:
			"url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
		marginTop: -40,
	},

	form: {
		borderRight: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
		minHeight: useViewportSize().height - 60,
		maxWidth: rem(450),
		paddingTop: rem(80),

		[theme.fn.smallerThan("sm")]: {
			maxWidth: "100%",
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
	},

	link: {
		color: theme.primaryColor,
		textDecoration: "none",
	},
}));

const Login = () => {
	const { classes } = useStyles();
	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title order={2} className={classes.title} ta='center' mt='md' mb={50}>
					Welcome to Culi!
				</Title>
				<EmailLogin />
				<Text ta='center' mt='md'>
					Don&apos;t have an account?{" "}
					<Link to={"/signup"} className={classes.link}>
						Register
					</Link>
				</Text>
				<Divider my='lg' label='Or' labelPosition='center' />

				<Center>
					<GoogleLogin />
				</Center>
			</Paper>
		</div>
	);
};

export default Login;

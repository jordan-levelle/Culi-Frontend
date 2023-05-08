import { Container, Stepper } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { Box } from "@mantine/core";

import EmailSignup from "../components/authentication/EmailSignup";
import EmailVerification from "../components/authentication/EmailVerification";
import EmailLogin from "../components/authentication/EmailLogin";

const Signup = () => {
	const [active, setActive, removeActive] = useLocalStorage({
		key: "activeStep",
		defaultValue: 0,
	});

	return (
		<Container>
			<Stepper
				active={active}
				breakpoint='sm'
				allowNextStepsSelect={false}
				color='green'
			>
				<Stepper.Step label='Create Account'>
					<EmailSignup setActive={setActive} />
				</Stepper.Step>
				<Stepper.Step label='Verify Email'>
					<EmailVerification setActive={setActive} />
				</Stepper.Step>
				<Stepper.Step label='Login'>
					<Box className='rounded-lg shadow-lg p-8' maw={400} mx='auto' mt={20}>
						<EmailLogin removeActive={removeActive}/>
					</Box>
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>
		</Container>
	);
};

export default Signup;

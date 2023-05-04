import { useState } from "react";

import { Container, Stepper } from "@mantine/core";

import EmailSignup from "../components/authentication/EmailSignup";
import EmailVerification from "../components/authentication/EmailVerification";
import Login from "./Login";

const Signup = () => {
	const [active, setActive] = useState(0);
	const nextStep = () =>
		setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Container>
			<Stepper
				active={active}
				breakpoint='sm'
				allowNextStepsSelect={false}
				color='green'
			>
				<Stepper.Step label='Create Account'>
					<EmailSignup />
				</Stepper.Step>
				<Stepper.Step label='Verify Email'>
					<EmailVerification />
				</Stepper.Step>
				<Stepper.Step label='Login'>
					<Login />
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>
		</Container>
	);
};

export default Signup;

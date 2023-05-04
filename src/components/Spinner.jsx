import { Loader } from "@mantine/core";

const Spinner = () => {
	return (
		<Loader
			style={{
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
			size='xl'
			color='green'
		/>
	);
};

export default Spinner;

import { Outlet } from "react-router-dom";

import { Container } from "@mantine/core";

import Nav from "./header/Nav";

const Layout = () => {
	return (
		<>
			<Nav />
			<Container mt={100}></Container>
			<Outlet />
		</>
	);
};

export default Layout;

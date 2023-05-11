import { Outlet } from "react-router-dom";

import Nav from "./header/Nav";

const Layout = () => {
	return (
		<>
			<Nav />
			<div className="mt-10"></div>
			<Outlet />
		</>
	);
};

export default Layout;

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	rem,
	Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Logo from "../Logo";
import UserAvatar from "./UserAvatar";

const useStyles = createStyles((theme) => ({
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},

	small: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	burger: {
		[theme.fn.largerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
		},
	},
}));

const links = [
	{ label: "Home", link: "/" },
];

const Nav = () => {
	const [opened, { toggle }] = useDisclosure(false);
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const { classes, cx } = useStyles();

	const items = links.map((link) => (
		<Link
			key={link.label}
			to={link.link}
			className={cx(classes.link, {
				[classes.linkActive]: path === link.link,
			})}
		>
			{link.label}
		</Link>
	));

	return (
		<Header height={60} className='fixed top-0'>
			<Container className={classes.header}>
				<Menu shadow='lg' onClose={toggle} width='50vw'>
					<Menu.Target>
						<Burger
							opened={opened}
							onClick={toggle}
							className={classes.burger}
							size='sm'
						/>
					</Menu.Target>

					<Menu.Dropdown mt={12}>
						{items.map((item, i) => (
							<Menu.Item key={i}>{item}</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>

				<div onClick={() => navigate("/")} className="hover:cursor-pointer">
					<Logo />
				</div>

				<Group spacing={5} className={classes.small}>
					{items}
				</Group>

				<UserAvatar />
			</Container>
		</Header>
	);
};

export default Nav;

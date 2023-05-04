import { Flex, Title } from "@mantine/core";
import { IconToolsKitchen } from "@tabler/icons-react";

const Logo = () => {
	return (
		<Flex
      align="center"
      gap={6}
    >
			<IconToolsKitchen color="#54cf6b" size={30} stroke={2} />
      <Title order={3} color="green">Culi</Title>
		</Flex>
	);
};

export default Logo;

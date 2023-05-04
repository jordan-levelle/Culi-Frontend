import { Flex, Button, Title, Text } from "@mantine/core"

const EmailVerification = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
    >
      <Title order={1}>Verification Email Sent</Title>
      <Text fz="lg">Please confirm your email address first</Text>
      <Button mt='lg' variant="gradient">Proceed to Login</Button>
    </Flex>
  )
}

export default EmailVerification
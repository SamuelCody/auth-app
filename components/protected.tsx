import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Protect(props: any) {
  const session = useSession();
  const router = useRouter();

  if (
    (session !== null && session?.status === "authenticated") ||
    router.pathname === "/" ||
    router.pathname === "/register"
  ) {
    return props.children;
  } else {
    return (
      <>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"column"}
          height="100vh"
          gap="10px"
        >
          <Heading as="h1" size="xl" textAlign="center">
            You are not authenticated
          </Heading>
          <Box as="p" textAlign="center">
            <Link href="/" style={{ cursor: "pointer" }}>
              Back to Login
            </Link>
          </Box>
        </Flex>
      </>
    );
  }
}

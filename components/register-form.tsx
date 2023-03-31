import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function RegisterForm() {
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("/api/register", { ...values });
      if (response.status === 200) {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: `${window.location.origin}/dashboard`,
          redirect: false,
        })
          .then(function (result: any) {
            router.push(result.url);
          })
          .catch((err) => {
            toast({
              title: "Failed to register",
              status: "error",
              isClosable: true,
              duration: 3000,
            });
          });
      }
    } catch (error: any) {
      toast({
        title: error?.response?.data?.error,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Must be a minimum of 3 characters")
      .required("Please add username")
      .matches(
        /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/,
        "Invalid username"
      ),
    email: Yup.string()
      .email("It must be a valid email")
      .required("Provide a valid email"),
    password: Yup.string()
      .min(6, "Minimum of 6 characters")
      .required("Provide a strong password"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Password must match"),
  });
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
          Register Page
        </Heading>
        <Box as="p" textAlign="center">
          Have an account already?
          <Link href="/" color="blue.400" _hover={{ color: "blue.500" }}>
            {" "}
            Log in
          </Link>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, errors }) => (
            <Flex
              borderWidth="1px"
              rounded="lg"
              shadow="1px 1px 3px rgba(0,0,0,0.3)"
              maxWidth={400}
              p={6}
              w="100%"
              m="10px auto"
              flexDirection={"column"}
              gap="10px"
              as="form"
              onSubmit={handleSubmit as any}
            >
              <InputControl name="username" label="Username" />
              <InputControl name="email" label="Email address" />
              <InputControl
                name="password"
                inputProps={{ type: "password" }}
                label="Password"
              />
              <InputControl
                name="confirmPassword"
                inputProps={{ type: "password" }}
                label="Confirm Password"
              />

              <SubmitButton>Submit</SubmitButton>
            </Flex>
          )}
        </Formik>
      </Flex>
    </>
  );
}

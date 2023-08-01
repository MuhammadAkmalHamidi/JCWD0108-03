import Axios from "axios";
import * as Yup from "yup";
import { Box, Button, Flex, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { Field, ErrorMessage, Formik, Form } from "formik";

export const ResetPassword = () => {
    const Resetschema = Yup.object().shape(({
        password: Yup.string()
            .required("Password is required")
            .min(6, "Paasowrd min 6 ")
            .matches(/^(?=.*[A-Z])/, "Password Must Contain 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Contain 1 Symbol")
            .matches(/.*[0-9].*/, "Password Must Contain 1 number"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password is not same")
            .required("have to same"),
    }));
    return (
        <>
            <Flex w={"full"} h={"100vh"} justifyContent={"center"} margin={"auto"} borderRadius={"10px"}
                boxShadow='0px 0px 6px black' bgGradient={"linear(yellow.500,#FFC900)"}>
                <Flex margin={"auto"} borderRadius={"10px"} justifyContent={"center"}
                    boxShadow='0px 0px 6px black' bg={"white"} w={"700px"} h={"450px"}>
                    <Box justifyContent={"center"}>
                        <Heading mt={{ base: '68px', md: '55px', lg: '80px' }} color={"#D5AD18"} fontSize={{ base: '30px', md: '40px', lg: '60px', xl: "60px" }} fontFamily={"Times New Roman"}>Reset Password!</Heading>
                        <Formik
                            initialValues={{ newPassword: "", confirmPassword: "" }}
                            validationSchema={Resetschema}
                            onSubmit={(value, action) => {
                                // handleSubmit(value);
                                // if (success) action.resetForm();
                            }}>
                            {(props) => {
                                return (
                                    <Box as={Form}>
                                        <Flex mt={"50px"} justifyContent={"center"}>
                                            <VStack>
                                                <Field as={Input} name="newPassword" w={{ base: '180px', md: '400px', lg: '400px' }} placeholder="New Password" size={"md"} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                                                <ErrorMessage component="box" name="newPassword" style={{ color: "red", marginTop: "-8px" }} />
                                            </VStack>
                                        </Flex>
                                        <Flex mt={"10px"} justifyContent={"center"}>
                                            <VStack>
                                                <Field as={Input} name="confirmPassword" w={{ base: '180px', md: '400px', lg: '400px' }} placeholder="Confirm Password" size={"md"} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                                                <ErrorMessage
                                                    component="box"
                                                    name="confirmPassword"
                                                    style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                            </VStack>
                                        </Flex>
                                        <Flex mt={"30px"} justifyContent={"center"}>
                                            <Button isDisabled={!props.dirty} type="submit" fontFamily={"Times New Roman"} boxShadow='0px 0px 6px black' color={"black"} bgGradient="linear(#FFEA61, #FFC900)" w={"200px"}>
                                                Login
                                            </Button>
                                        </Flex>
                                    </Box>
                                );
                            }}
                        </Formik>
                    </Box >
                </Flex>
            </Flex>
        </>
    );
}
import Axios from 'axios';
import * as Yup from "yup";
import { useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import { EditIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, FormControl, FormLabel, useToast, } from '@chakra-ui/react';

export default function UpdateCashier({ id, username, email }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const Formschema = Yup.object().shape(({
        username: Yup.string()
            .required("Write your name"),
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Write your Email"),
        avatar: Yup.string()
            .required("Add image"),
    }));
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            const { username, email } = value;
            data.append("username", { username }.username);
            data.append("email", { email }.email);
            data.append("avatar", file);
            const response = await Axios.patch(`http://localhost:8000/api/admin/updateCashier/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            setSuccess(true);
            toast({
                title: "Cashier Updated!",
                description: "Your Cashier Data Updated!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
            });
            window.location.reload();
            navigate("/cashierlist");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Button borderRadius={"70px"} color={"white"} bg={"blue.600"} onClick={onOpen}><EditIcon /> </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent borderRadius={"10px"}>
                    <ModalHeader borderTopRadius={"10px"} bg={"#FFC900"}>Update Cashier Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{ username: username, email: email, avatar: null }}
                            validationSchema={Formschema}
                            onSubmit={(value, action) => {
                                console.log(value);
                                handleCreate(value);
                                if (success) action.resetForm();
                            }}>
                            {() => {
                                return (
                                    <Form>
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Field as={Input} ref={initialRef} borderBottom={"2px solid"} borderColor={"#D5AD18"} variant={"flushed"} placeholder='Username' name="username" />
                                            <ErrorMessage component="Box" name="username" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Email</FormLabel>
                                            <Field as={Input} variant={"flushed"} borderBottom={"2px solid"} borderColor={"#D5AD18"} placeholder='Email' name='email' />
                                            <ErrorMessage component="Box" name="email" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <Field name="avatar">
                                            {({ field }) => (
                                                <FormControl mt={4}>
                                                    <FormLabel>Photo</FormLabel>
                                                    <Input mb={"10px"}  {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} variant={"flushed"} borderBottom={"2px solid"} borderColor={"#D5AD18"} placeholder='Photo' name='avatar' as={Field} type='file' />
                                                    <ErrorMessage component="Box" name="avatar" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button onClick={handleCreate} type='submit' colorScheme='yellow' mr={3}>  Update Cashier  </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}
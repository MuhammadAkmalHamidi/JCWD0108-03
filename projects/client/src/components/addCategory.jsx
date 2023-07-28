import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Axios from "axios";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup";

export const AddCategory = () => {
    const { onClose, onOpen, isOpen } = useDisclosure()

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            const { newCategory, imgURL } = value;
            formData.append('data',
                JSON.stringify({ newCategory, imgURL })
            );
            const response = await Axios.post(`http://localhost:8000/api/products/addCategory`, formData)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <Box>
            <Box >
                <Button h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} onClick={onOpen} color={"white"} bgColor={"gray.300"} fontSize={"50px"}><AddIcon /></Button>
            </Box>

            <Formik
                initialValues={{
                    newCategory: "",
                    imgURL: null
                }}
                onSubmit={(value, action) => {
                    handleSubmit(value)
                }}
            >
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontWeight={"bold"} color={"yellow.500"} >Add New Category</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>New Category</FormLabel>
                                <Input as={Field} placeholder='Enter New Category' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Image Category</FormLabel>
                                <Input as={Field} type="file" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='yellow' color={"white"} mr={3}>
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Formik>
        </Box>
    )
}
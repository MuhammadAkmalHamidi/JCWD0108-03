import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/navbar";
import { Cart } from "../components/cart";
import { ProductCategories } from "../components/admin/productCategories";

export const Cashier = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, []);
    return (
        <Box>
            <Navbar />
            <Flex justifyContent={"center"} pt={"100px"}>
                <Flex >
                    <ProductCategories />
                    <Flex >
                        <Cart />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
};
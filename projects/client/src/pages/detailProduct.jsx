import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cart } from "../components/cart";
import { Back } from "../components/back";


export const DetailProduct = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState([])

    const dataProduct = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/${params.id}`)
            setProduct(response.data.result[0])
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        dataProduct()
    }, [])

    console.log(product);
    return (
        <Box>
            <Box><Navbar /></Box>
            <Flex>
                <Back />
                <Flex justifyContent={"center"} pt={"100px"} px={"150px"}>
                    <Box>
                        <Box>
                            <Image borderRadius={"5px"} boxShadow={"0px 0px 10px black"} w={"400px"} h={"350px"} src={`http://localhost:8000/api/products/image/${product?.imgURL}`} />
                        </Box>
                        <Flex w={"400px"} h={"90px"} justifyContent={"space-between"} mt={"5px"}>
                            <Box mb={"110px"} alignContent={"center"}>
                                <Box textShadow={"2px 2px 3px gray"} fontSize={"50px"} fontWeight={"bold"} mb={"20px"}> {product.productName} </Box>
                            </Box>
                            <Flex alignItems={"center"}>
                                <Button bgColor={"yellow.400"} color={"white"}>Add To Cart</Button>
                            </Flex>
                        </Flex>
                        <Box textAlign={"justify"} w={"400px"}> {product.description} </Box>
                    </Box>
                    <Box>
                        <Cart />
                    </Box>
                </Flex>
            </Flex>

        </Box>
    )
}
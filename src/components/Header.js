import React from "react";
import {Container, Flex, Text} from "../components"

const Header = () => {
    return (
        <header className="py-3 border-opacity-50 bg-blue-600 text-white">
            <Container>
                <Flex>
                    <Text tag={'h1'} type={'regular'}>Perfanalytics Dashboard</Text>
                </Flex>
            </Container>
        </header>
    )
}
export default Header

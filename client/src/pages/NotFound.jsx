import { Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ErrorImage from "../assets/404 Error with a cute animal-rafiki.svg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Flex
      background="purple.800"
      direction="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={ErrorImage}
        alt="not found page"
        boxSize="500px"
        objectFit="cover"
      />

      <Button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Go Back To Home Page
      </Button>
    </Flex>
  );
}

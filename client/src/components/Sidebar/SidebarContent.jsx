import { Box, CloseButton, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  FiHome,
  FiLogOut,
  FiPlus,
  FiStar,
  FiDownloadCloud,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useExpense } from "../../context/expense-context";
import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...rest }) => {
  const authCtx = useContext(AuthContext);
  const { signOut } = useContext(AuthContext);
  const { openExpenseModal, setExpenses } = useExpense();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignout = () => {
    signOut();
    setExpenses([]);
    navigate("/");
  };

  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:3000/purchase", {
        headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
      });
      const result = await res.json();

      if (result.success) {
        let options = {
          key: result.key_id,
          order_id: result.order.orderId,
          handler: async (response) => {
            // this function is executed on successful purchase
            // update the status of the purchase in the backend
            const res = await fetch("http://localhost:3000/purchase", {
              method: "post",
              headers: {
                Authorization: localStorage.getItem("JWT_TOKEN"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
              }),
            });
            toast({
              title: "You are a premium user now.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            const data = await res.json();
            // no need to show premium button anymore
            authCtx.updateUserStatus(data);
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", () => {
          throw new Error("Payment failed");
        });
      }
    } catch (error) {
      authCtx.updateUserStatus();
      alert(error);
    }
  };

  const downloadHandler = async () => {
    try {
      const res = await fetch("http://localhost:3000/expenses/download", {
        headers: { Authorization: localStorage.getItem("JWT_TOKEN") },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      const data = await res.json();

      // Check if the response contains a download location
    debugger;
      if (data.data.Location) {
        // Create an invisible anchor element for the download
        debugger
        const downloadLink = document.createElement("a");
        downloadLink.href = data.data.location;
        downloadLink.download = "expenses.csv"; // Set the desired filename

        // Trigger a click on the anchor to start the download

        downloadLink.click();
      } else {
        console.error("Download location not found in the response");
      }
    } catch (error) {
      console.error("Error handling download:", error);
    }
  };

  return (
    <Box
      bg="linear-gradient(45deg, #000022, #220044)"
      borderRight="2px"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(45deg, #000022, #220044)",

          zIndex: -1,
        }}
      >
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="white"
        >
          Budget Buddy
        </Text>
        <CloseButton
          color="whiteAlpha.800"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      <NavItem
        display={{ base: "none", md: "flex" }}
        icon={FiPlus}
        onClick={() => openExpenseModal()}
      >
        Add Expense
      </NavItem>

      <NavItem icon={FiHome} onClick={() => navigate("/expenses")}>
        Home
      </NavItem>

      <NavItem icon={FiDownloadCloud} onClick={downloadHandler}>
        Download
      </NavItem>

      {!authCtx?.isPremium && (
        <NavItem icon={FiStar} onClick={handlePayment}>
          Add Premium Membership
        </NavItem>
      )}
      <NavItem icon={FiLogOut} onClick={handleSignout}>
        Sign Out
      </NavItem>
    </Box>
  );
};

export default React.memo(SidebarContent);

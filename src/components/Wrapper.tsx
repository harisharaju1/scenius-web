import { Box, Container } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Container
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "1200px" : "1200px"}
      w="100%"
    >
      {children}
    </Container>
  );
};

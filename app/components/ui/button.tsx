import { extendVariants, Button } from "@nextui-org/react";

const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      khaki: "text-white bg-khaki",
    },
  },
});

export default CustomButton;

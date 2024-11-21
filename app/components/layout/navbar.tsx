"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Logo from "@/app/assets/svgs/Logo";

export default function NavBar() {
  return (
    <Navbar isBordered className="max-h-[5vh] bg-gunmetal-800">
      <NavbarBrand>
        <Logo className="max-h-[5vh] text-success-300/50" height="50" />
        <p className="pl-2 font-bold text-inherit">Famous Hallers</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="success"
            href="#"
            radius="sm"
            variant="flat"
            className="max-h-[4vh]"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

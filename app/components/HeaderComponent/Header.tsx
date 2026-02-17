"use client";

import AppLogo from "@/public/AppLogo";
import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import InputButton from "../FormComponents/ButtonComponent/InputButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { Building, Plus, Ticket } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-background/10 backdrop-blur-xl z-20 border-b">
        <div className="mx-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <div><AppLogo /></div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-1">
            <InputButton
              label={"Pricing"}
              size={"sm"}
              variant={"ghost"}
            />
            <InputButton
              className={"mr-2"}
              label={"Explore"}
              size={"sm"}
              variant={"ghost"}
              navigateTo={"/explore"}
              asChild
            />
            <Authenticated>
              <InputButton
                className={"flex gap-2 mr-3"}
                label={"Create Event"}
                size={"sm"}
                navigateTo={"/create-event"}
                asChild
                icon={<Plus />}
              />
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Bookings"
                    href="/my-bookings"
                    labelIcon={<Ticket size={16} />}
                  />
                  <UserButton.Link
                    label="Events"
                    href="/events"
                    labelIcon={<Building size={16} />}
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode="modal">
                <InputButton label={"Sign In"} size={"sm"} />
              </SignInButton>
            </Unauthenticated>
          </div>

          {isLoading && <div className="absolute bottom-0 left-0 w-full">
            <BarLoader
              width={"100%"}
              color={"#8B5CF6"}
            />
          </div>}
        </div>
      </nav>
    </>
  );
};

export default Header;

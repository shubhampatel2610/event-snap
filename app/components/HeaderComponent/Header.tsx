"use client";

import AppLogo from "@/public/AppLogo";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import InputButton from "../common/ButtonComponent/InputButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { Building, Crown, Plus, Ticket } from "lucide-react";
import { AppConstants } from "@/app/constants/AppConstants";
import InterestsDialogComponent from "../InterestsDialogComponent/InterestsDialogComponent";
import useInterests from "@/hooks/use-interests";
import SearchBarComponent from "./SearchBarComponent";
import { Badge } from "@/components/ui/badge";
import PricingPlanDialogComponent from "../PricingPlanDialogComponent/PricingPlanDialogComponent";
import { setShowPricingPlans } from "@/app/store/dashboardSlice";
import { useAppDispatch } from "@/app/store/store";

const Header = () => {
  const { isLoading } = useStoreUser();
  const {
    showInterests,
    handleDialogStepsComplete,
    handleDialogStepSkip
  } = useInterests();
  const { has } = useAuth();
  const dispatch = useAppDispatch();

  const proPlan = has?.({ plan: AppConstants.PRO_PLAN_KEY });

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-background/10 backdrop-blur-xl z-20 border-b">
        <div className="mx-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between">
          <Link href={AppConstants.HOME_ROUTE} className="text-2xl font-bold">
            <AppLogo />
          </Link>
          {proPlan &&
            <Badge className="ml-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500  gap-1 text-black">
              <Crown className="w-3 h-3" />
              {AppConstants.PRO_PLAN_TEXT}
            </Badge>}

          <div className="hidden md:flex flex-1 justify-center">
            <SearchBarComponent />
          </div>

          <div className="flex items-center gap-2 sm:gap-1">
            {!proPlan && <InputButton
              label={AppConstants.PRICING_BTN_LABEL}
              size={"sm"}
              variant={"ghost"}
              onClick={() => dispatch(setShowPricingPlans(true))}
            />}
            <InputButton
              className={"mr-2"}
              label={AppConstants.EXPLORE_BTN_LABEL}
              size={"sm"}
              variant={"ghost"}
              navigateTo={AppConstants.EXPLORE_ROUTE}
              asChild
            />
            <Authenticated>
              <InputButton
                className={"flex gap-2 mr-3"}
                label={AppConstants.CREATE_EVENT_BTN_LABEL}
                size={"sm"}
                navigateTo={AppConstants.CREATE_EVENT_ROUTE}
                asChild
                icon={<Plus />}
                iconClassName={"hidden sm:inline"}
              />
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label={AppConstants.MY_BOOKINGS_LABEL}
                    href={AppConstants.MY_BOOKINGS_ROUTE}
                    labelIcon={<Ticket size={16} />}
                  />
                  <UserButton.Link
                    label={AppConstants.EVENTS_LABEL}
                    href={AppConstants.EVENTS_ROUTE}
                    labelIcon={<Building size={16} />}
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>
            <Unauthenticated>
              <SignInButton mode="modal">
                <InputButton
                  label={AppConstants.SIGN_IN_BTN_LABEL}
                  size={"sm"}
                />
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

        <div className="md:hidden border-t p-2">
          <SearchBarComponent />
        </div>
      </nav>

      <InterestsDialogComponent
        isOpen={showInterests}
        onClose={handleDialogStepSkip}
        onComplete={handleDialogStepsComplete}
      />

      <PricingPlanDialogComponent triggerPath={AppConstants.HEADER_TRIGGER_PATH} />
    </>
  );
};

export default Header;

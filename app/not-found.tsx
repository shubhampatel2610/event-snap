import { PartyPopper } from "lucide-react";
import InputButton from "@/app/components/common/ButtonComponent/InputButton";
import { AppConstants } from "@/app/constants/AppConstants";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-center px-5">
      <PartyPopper className="h-10 w-10 text-muted-foreground" />
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <InputButton
        label="Back to Explore"
        navigateTo={AppConstants.EXPLORE_ROUTE}
        asChild
        variant="outline"
        size="sm"
      />
    </div>
  );
}

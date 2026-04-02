import { setCurrentTab, setSearchQuery } from "@/app/store/eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Search } from "lucide-react";
import InputComponent from "../common/InputComponent/InputComponent";
import InputButton from "../common/ButtonComponent/InputButton";
import AttendeeCardRenderer from "./AttendeeCardRenderer";
import { AppConstants } from "@/app/constants/AppConstants";

interface AttendeeManagementProps {
    registrationsData: any;
    statistics: any;
}

const AttendeeManagementComponent = (props: AttendeeManagementProps) => {
    const { registrationsData, statistics } = props;

    const dispatch = useAppDispatch();
    const currentTab = useAppSelector((state) => state.event.currentTab);
    const searchQuery = useAppSelector((state) => state.event.searchQuery);

    const onTabChange = (value: string) => {
        if (value === "all" || value === "checkedIn" || value === "notCheckedIn") {
            dispatch(setCurrentTab(value));
        }
    };

    const filteredRegistrations = registrationsData?.filter((registration: any) => {
        const searchMatch = registration.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) || registration.attendeeEmail.toLowerCase().includes(searchQuery.toLowerCase()) || registration.uniqueId.toLowerCase().includes(searchQuery.toLowerCase());

        if (currentTab === "all") {
            return searchMatch && registration.status === "confirmed"
        };

        if (currentTab === "checkedIn") {
            return searchMatch && registration.checkedIn && registration.status === "confirmed";
        }

        if (currentTab === "notCheckedIn") {
            return searchMatch && !registration.checkedIn && registration.status === "confirmed";
        }

        return searchMatch;
    });

    return (
        <div className="mt-5">
            <Tabs value={currentTab} onValueChange={onTabChange}>
                <TabsList className="mb-2 bg-accent-foreground border">
                    <TabsTrigger className="text-white hover:text-accent" value="all">
                        {AppConstants.ALL_TABS_LABEL} ({statistics?.totalRegistrations})
                    </TabsTrigger>
                    <TabsTrigger className="text-white hover:text-accent" value="checkedIn">
                        {AppConstants.CHECKED_IN_TAB_LABEL} ({statistics?.totalCheckins})
                    </TabsTrigger>
                    <TabsTrigger className="text-white hover:text-accent" value="notCheckedIn">
                        {AppConstants.NOT_CHECKED_IN_TAB_LABEL} ({statistics?.pendingCheckins})
                    </TabsTrigger>
                </TabsList>

                {/* Search and Actions */}
                <div className="flex gap-3 mb-2">
                    <InputComponent
                        className="pl-10"
                        placeholder={AppConstants.SEARCH_PLACEHOLDER}
                        value={searchQuery}
                        onChange={(e: any) => dispatch(setSearchQuery(e.target.value))}
                        icon={<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
                    />
                    <InputButton
                        label={AppConstants.EXPORT_CSV_LABEL}
                        variant="default"
                        className="border"
                        onClick={() => { }}
                        icon={<Download className="w-4 h-4" />}
                        asChild
                    />
                </div>

                {/* Attendee List */}
                <TabsContent value={currentTab} className="space-y-2 mt-0">
                    {filteredRegistrations && filteredRegistrations.length > 0 ? (
                        filteredRegistrations.map((registration: any) => (
                            <AttendeeCardRenderer
                                key={registration._id}
                                registrationData={registration}
                            />
                        ))
                    ) : (
                        <div className="text-center py-5 text-muted-foreground">
                            {AppConstants.ATTENDEE_NOT_FOUND}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AttendeeManagementComponent;
export class AppConstants {
    // AppLogo Constants
    static EVENT_WORD = "Event";
    static SNAP_WORD = "Snap";

    // App Routes
    static HOME_ROUTE = "/";
    static EVENTS_ROUTE = "/events";
    static MY_EVENTS_ROUTE = "/my-events";
    static CREATE_EVENT_ROUTE = "/create-event";
    static EXPLORE_ROUTE = "/explore";
    static MY_BOOKINGS_ROUTE = "/my-bookings";
    static LOCATION_ROUTE = "/location";
    static MANAGE_ROUTE = "/manage"

    // Landing Page Constants
    static LANDING_PAGE_HEADER = "Welcome to EventSnap!";
    static LANDING_PAGE_TITLE = [
        "Discover & share amazing",
        "events",
        "happening around you.",
        "Even you can",
        "create",
        "one!"
    ];
    static HIGHLIGHT_INDEXES = [1, 4];
    static LANDING_PAGE_DESCRIPTION = "Whether you are looking for concerts, sports, or community gatherings, EventSnap has got you covered. Join us and never miss out on the fun!";

    // Button Labels
    static GET_STARTED_BTN_LABEL = "Get Started";
    static PRICING_BTN_LABEL = "Pricing";
    static EXPLORE_BTN_LABEL = "Explore";
    static CREATE_EVENT_BTN_LABEL = "Create Event";
    static SIGN_IN_BTN_LABEL = "Sign In";
    static MY_BOOKINGS_LABEL = "My Bookings";
    static EVENTS_LABEL = "Events";
    static VIEW_ALL_LABEL = "View All";
    static VIEW_LABEL = "View";
    static BACK_LABEL = "Back";
    static CONTINUE_LABEL = "Continue";
    static SAVE_LABEL = "Save";
    static MAYBE_LATER_LABEL = "Maybe Later";
    static SUBMIT_LABEL = "Submit";
    static GENERATE_LABEL = "Generate";
    static CANCEL_LABEL = "Cancel";
    static GENERATE_WITH_AI_LABEL = "Generate with AI";
    static MAP_LABEL = "Map";
    static MANAGE_EVENT_LABEL = "Manage Event";
    static REGISTER_LABEL = "Register";
    static SHARE_LABEL = "Share";
    static VIEW_TICKET_LABEL = "View Ticket";
    static NAME_LABEL = "Name";
    static EMAIL_LABEL = "Email";
    static BROWSE_EVENTS_LABEL = "Browse Events";
    static DONE_LABEL = "Done";

    // Categories
    static CATEGORIES = [
        {
            id: "tech",
            label: "Technology",
            icon: "💻",
            description: "Tech meetups, hackathons, and developer conferences",
        },
        {
            id: "music",
            label: "Music",
            icon: "🎵",
            description: "Concerts, festivals, and live performances",
        },
        {
            id: "sports",
            label: "Sports",
            icon: "⚽",
            description: "Sports events, tournaments, and fitness activities",
        },
        {
            id: "art",
            label: "Art & Culture",
            icon: "🎨",
            description: "Art exhibitions, cultural events, and creative workshops",
        },
        {
            id: "food",
            label: "Food & Drink",
            icon: "🍕",
            description: "Food festivals, cooking classes, and culinary experiences",
        },
        {
            id: "business",
            label: "Business",
            icon: "💼",
            description: "Networking events, conferences, and startup meetups",
        },
        {
            id: "health",
            label: "Health & Wellness",
            icon: "🧘",
            description: "Yoga, meditation, wellness workshops, and health seminars",
        },
        {
            id: "education",
            label: "Education",
            icon: "📚",
            description: "Workshops, seminars, and learning experiences",
        },
        {
            id: "gaming",
            label: "Gaming",
            icon: "🎮",
            description: "Gaming tournaments, esports, and gaming conventions",
        },
        {
            id: "networking",
            label: "Networking",
            icon: "🤝",
            description: "Professional networking and community building events",
        },
        {
            id: "outdoor",
            label: "Outdoor & Adventure",
            icon: "🏕️",
            description: "Hiking, camping, and outdoor activities",
        },
        {
            id: "community",
            label: "Community",
            icon: "👥",
            description: "Local community gatherings and social events",
        },
    ];

    // Explore Page Constants
    static EXPLORE_PAGE_HEADER = "Explore Events";
    static EXPLORE_PAGE_SUBHEADER = "Explore featured events, find what's happening in your city!, or browse across the world!";
    static EVENT_BY_LOCATION_HEADER = "Events Nearby...";
    static EVENT_BY_LOCATION_SUBHEADER_PREFIX = "Find events happening in";
    static EVENT_BY_LOCATION_SUBHEADER_POSTFIX = "your city...";
    static ONLINE_EVENT_KEY = "online";
    static ONLINE_EVENT_LABEL = "Online Event";
    static ATTENDEES_LABEL_POSTFIX = "Attending";
    static REGISTERED_LABEL_POSTFIX = "Registered";
    static FREE_LABEL = "Free";
    static PAID_LABEL = "Paid";
    static EVENTS_BY_CATEGORY_HEADER = "Events by Categories...";
    static EVENT_SINGULAR_LABEL = "Event";
    static EVENT_PLURAL_LABEL = "Events";
    static POPULAR_EVENTS_HEADER = "Popular events around you";
    static NO_EVENT_FOUND_LABEL = "No Event Found";
    static BE_FIRST_TO_CREATE_LABEL = "Be the first to create one...";
    static FOUND_LABEL = "Found";
    static NO_EVENT_FOR_CATEGORY_LABEL = "No Events Found for this Category.";
    static CATEGORY_SLUG_KEY = "category";
    static LOCATION_SLUG_KEY = "location";

    // Interests Onboarding Constants
    static STEP_1_HEADER = "What Are Your Interests?";
    static STEP_2_HEADER = "Whats Your Location?";
    static STEP_1_SUBHEADER = "Select atleast 3 categories of your interest";
    static STEP_2_SUBHEADER = "Personalize your experience by location";
    static SELECTED_POSTFIX = "Selected";
    static READY_TO_CONTINUE_TEXT = "Ready To Continue...";
    static STATE_LABEL = "State";
    static CITY_LABEL = "City";
    static FIRST_POSTFIX = "First";
    static SELECT_PREFIX = "Select";
    static ONBOARDING_SUCCESS = "Welcome To EventSnap :)";
    static ONBOARDING_ERROR = "Failed To Complete Onboarding :(";

    // Global Search Constants
    static GLOBAL_SEARCH_PLACEHOLDER = "Search By Title";
    static SEARCH_RESULT_TITLE = "Search Results";

    // Pricing Constants
    static PRO_PLAN_KEY = "pro_plan";
    static PRO_PLAN_TEXT = "PRO";
    static DEFAULT_HEADER_MESSAGE = "Go Beyond Limitations & Unlock Premium Features";
    static HEADER_TRIGGER_PATH = "header";
    static HEADER_HEADER_MESSAGE = "Create Unlimited Access With PRO!";
    static FREE_TRIGGER_PATH = "free";
    static FREE_HEADER_MESSAGE = "You Have Reached Your Limit. Upgrade To PRO.";
    static CUSTOM_TRIGGER_PATH = "custom";
    static CUSTOM_HEADER_MESSAGE = "Achieve Customization With PRO!";
    static UPGRADE_PLAN_HEADER = "Upgrade Your Plan...";

    // Create Event Constants
    static MAX_EVENT_COUNT_ERROR = "You Have Reached Maximum Numbers Of Free Events. Upgrade To PRO For More!";
    static CREATE_EVENT_ERROR = "Failed To Create Event";
    static EVENT_NOT_FOUND = "Event Not Found!";
    static DELETE_EVENT_AUTH_ERROR = "You Are Not Authorized To Delete This Event!";
    static DEFAULT_COLOR = "#141E3A";
    static PRO_COLOR_OPTIONS = ["#4C1D95", "#065F46", "#92400E", "#7F1D1D", "#831843"];
    static TITLE_REQ_ERROR = "Title must be atleast 5 characters long";
    static DESCRIPTION_REQ_ERROR = "Description must be atleast 20 characters long";
    static SELECT_CATEGORY_ERROR = "Please select a category";
    static START_DATE_REQ_ERROR = "Start Date is required";
    static END_DATE_REQ_ERROR = "End Date is required";
    static TIME_FORMAT_ERROR = "Time must be in HH:MM format";
    static VALID_URL_ERROR = "Please enter valid url";
    static CITY_REQ_ERROR = "City is required";
    static STATE_REQ_ERROR = "State is required";
    static PRICE_REQ_ERROR = "Price is required";
    static CREATE_EVENT_HEADER = "Create New Event";
    static FREE_REMAINING_EVENT_TEXT = "free event remaining";
    static COVER_IMG_PLACEHOLDER = "Click to add cover image";
    static FETCH_IMAGE_ERROR = "Error While Fetching Images: ";
    static IMG_PICKER_HEADER = "Event Cover Image";
    static IMG_PICKER_PLACEHOLDER = "Seach For Images";
    static CATEGORY_LABEL = "Category";
    static LOCATION_LABEL = "Location";
    static VENUE_LABEL = "Venue";
    static EVENT_TYPE_LABEL = "Event Type";
    static CUSTOMIZE_COLOR_PRO_TEXT = "Upgrade to PRO for customization";
    static PRO_COLOR_BTN_TITLE = "Unlock more themes with PRO";
    static EVENT_NAME_PLACEHOLDER = "Event Name";
    static START_DATE_LABEL = "Start Date";
    static END_DATE_LABEL = "End Date";
    static VENUE_PLACEHOLDER = "Venue location link (Google Maps)";
    static ADDRESS_PLACEHOLDER = "Building no. / street / city / full address";
    static EVENT_TYPE_OPTIONS = [
        { label: "Free", value: true },
        { label: "Paid", value: false },
    ];
    static TICKET_PRICE_PLACEHOLDER = "Ticket Price";
    static CAPACITY_PLACEHOLDER = "Attendee Capacity";
    static SELECT_DATE_TIME_ERROR = "Please Select Date and Time.";
    static FREE_EVENT_COUNT_ERROR = "You Have Reached Maximum Limit. Please Upgrade to PRO!";
    static CUSTOM_THEME_COLOR_ERROR = "Please Upgrade to PRO for Theme Color Customization!";
    static CREATE_EVENT_SUCCESS = "Event Created Successfully.";

    // Generate With AI Constants
    static GEMINI_AI_MODEL = "gemini-2.0-flash";
    static PROMPT_REQUIRED_ERROR = "Prompt is Required.";
    static GENERATE_EVENT_ERROR = "Error Generating Event";
    static GENERATE_EVENT_SUCCESS = "Event's data generated. You can customize it.";
    static GENERATE_EVENT_TITLE = "Generate With AI";
    static GENERATE_EVENT_SUBTITLE = "Explain your idea and let AI handles further";
    static GENERATE_EVENT_TEXTAREA_PLACEHOLDER = "Explain your idea in detail... Eg, A tech event for developers in Pune with goal of leveraging AI tools for high productivity and faster shipping...";

    // Registration Constants
    static REGISTRATION_EXCEED_ERROR = "No More Seats Available!";
    static REGISTRATION_LIMIT_ERROR = "You Are Already Registered!";
    static ABOUT_EVENT_TITLE = "About Event";
    static ORGANIZER_TITLE = "Organizer";
    static PRICE_TITLE = "Price";
    static ATTENDEES_TITLE = "Attendees";
    static DATE_TITLE = "Date";
    static TIME_TITLE = "Time";
    static EVENT_ORGANIZER_TAG = "Event Organizer";
    static SIGNIN_REQUEST = "Please Sign In Again!";
    static CLIPBOARD_COPY_TEXT = "Copied to clipboard!";
    static PAY_AT_VENUE_TEXT = "Pay at Venue";
    static ALREADY_REGISTERED_TEXT = "You're registered!";
    static EVENT_ENDED_TEXT = "Event is ended";
    static EVENT_FULL_TEXT = "Event is full";
    static FREE_EVENT_TEXT = "Free Event";
    static ALL_FIELDS_REQUIRED = "Please fill in all fields";
    static REGISTRATION_SUCCESS = "Registration successful.";
    static REGISTRATION_ERROR = "Registration failed!";
    static REGISTRATION_TITLE = "Registration";
    static REGISTRATION_SUBTITLE = "Fill in your details to register for";
    static REGISTRATION_SUCCESS_TITLE = "You're all set for this event.";
    static REGISTRATION_SUCCESS_SUBTITLE = "Your registration is confirmed. Check your Tickets for event details and your code ticket.";
    static TERMS_CO_TEXT = "By registering, you agree to receive event updates and reminders via email.";

    // My Bookings Constants
    static REGISTRATION_NOT_FOUND = "Registration Not Found!";
    static UNAUTHORIZED_ACCESS = "Unauthorized Access!";
    static MY_BOOKINGS_HEADER = "My Bookings";
    static MY_BOOKINGS_SUBHEADER = "View and Manage your bookings";
    static UPCOMING_EVENTS_HEADER = "Upcoming Events";
    static PAST_EVENTS_HEADER = "Past Events";
    static CANCEL_REGISTRATION_SUCCESS = "Registration Cancelled Successfully.";
    static CANCEL_REGISTRATION_ERROR = "Failed to Cancel Registration!";
    static MY_TICKET_HEADER = "My Ticket";
    static TICKET_ID_LABEL = "Ticket ID";
    static MY_TICKET_FOOTER_NOTE = "Show This Ticket Details at Venue for Entry";

    // My Events Constants
    static MY_EVENTS_HEADER = "My Events";
    static MY_EVENTS_SUBHEADER = "View and Manage your Events";
    static DELETE_EVENT_SUCCESS = "Event Deleted Successfully.";
    static DELETE_EVENT_ERROR = "Failed to Delete Event!";
}
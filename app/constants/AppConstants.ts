export class AppConstants {
    // AppLogo Constants
    static EVENT_WORD = "Event";
    static SNAP_WORD = "Snap";

    // App Routes
    static HOME_ROUTE = "/";
    static EVENTS_ROUTE = "/events"
    static CREATE_EVENT_ROUTE = "/create-event"
    static EXPLORE_ROUTE = "/explore";
    static MY_BOOKINGS_ROUTE = "/my-bookings";
    static LOCATION_ROUTE = "/location";

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
}
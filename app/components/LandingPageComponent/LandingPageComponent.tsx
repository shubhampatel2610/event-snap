import LandingPageLeftSection from './LandingPageLeftSection';
import LandingPageRightSection from './LandingPageRightSection';

const LandingPageComponent = () => {
    return (
        <div className="grid grid-cols-12 max-h-screen">
            <div className="col-span-12 md:col-span-6 px-15 py-10">
                <LandingPageLeftSection />
            </div>

            <div className="col-span-12 md:col-span-6 p-5 h-full">
                <LandingPageRightSection />
            </div>
        </div>
    )
}

export default LandingPageComponent;

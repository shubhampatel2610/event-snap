import LandingPageLeftSection from './LandingPageLeftSection';

const LandingPageComponent = () => {
    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-12 md:col-span-6 px-15 py-10">
                <LandingPageLeftSection />
            </div>

            <div className="col-span-12 md:col-span-6 px-10 py-5">
                Right Section
            </div>
        </div>
    )
}

export default LandingPageComponent;

"use client";

import Image from 'next/image';
import { useState } from 'react';

const LandingPageRightSection = () => {
    const [image, setImage] = useState("/LandingPageImages/hero-img.jpg");

    return (
        <>
            <div className="relative w-full h-full hover:scale-101 transition-transform"
                onMouseEnter={() => setImage("/LandingPageImages/hero-img.gif")}
                onMouseLeave={() => setImage("/LandingPageImages/hero-img.jpg")}
            >
                <div className="absolute inset-1 bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-purple-400 blur-sm rounded-xl"></div>
                <Image
                    src={image}
                    alt="event crowd"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                />
            </div>
        </>
    )
}

export default LandingPageRightSection;
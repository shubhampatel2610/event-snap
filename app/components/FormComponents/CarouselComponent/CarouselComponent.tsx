/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { JSX, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselComponentProps {
    carouselItems: any[];
    itemTemplate: (item: any) => JSX.Element;
    interval?: number;
}

const CarouselComponent = (props: CarouselComponentProps) => {
    const { carouselItems, interval = 5000, itemTemplate } = props;

    const autoPlayPlugin = useRef(
        Autoplay({
            delay: interval,
            stopOnInteraction: true,
            stopOnMouseEnter: false,
        })
    );

    return (
        <>
            <Carousel className="w-full" plugins={[autoPlayPlugin.current]}>
                <CarouselContent>
                    {carouselItems.map((item) => (
                        itemTemplate(item)
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={"ghost"} />
                <CarouselNext variant={"ghost"} />
            </Carousel>
        </>
    )
}

export default CarouselComponent

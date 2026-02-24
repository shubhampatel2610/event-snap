/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { CarouselItem } from "@/components/ui/carousel";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";

const EventCarouselItemTemplate = (item: any) => {
    const router = useRouter();

    const handleItemClick = (item: any) => {
        if (item.slug) {
            router.push(`/events/${item.slug}`);
        }
        return;
    }

    return (
        <CarouselItem
            key={item.index}
            onClick={() => handleItemClick(item)}
        >
            <div className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer">
                {
                    item.bannerImageUrl ?
                        <Image
                            src={item.bannerImageUrl}
                            alt={item.title}
                            fill
                            className="object-cover" />
                        : <div
                            className="absolute inset-0"
                            style={{ backgroundColor: item.themeColor || "#cccccc" }}
                        />
                }

                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

                <div className="relative h-full flex flex-col gap-2.5 justify-end p-8 md:p-10">
                    <Badge variant="secondary" className="w-fit">
                        <MapPin className="w-4 h-4" />
                        {item.city}
                        {item.state ? `, ${item.state}` : ""}
                        {item.country ? `, ${item.country}` : ""}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-start">
                        {item.title}
                    </h2>
                    <span className="text-1xl text-white/90 max-w--2xl line-clamp-2 text-start">
                        {item.description}
                    </span>
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {moment(item.startDate).format("DD MMMM, YYYY")}
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {`${item.registrationCount || 0} Registered`}
                        </div>
                    </div>
                </div>
            </div>
        </CarouselItem>
    )
}

export default EventCarouselItemTemplate;
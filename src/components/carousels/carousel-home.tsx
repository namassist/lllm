"use client";

import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselHome({ testimonials }: any) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[plugin.current]} className="w-full mt-14">
      <CarouselContent className="-ml-5">
        {testimonials?.map((testi: any, index: number) => (
          <CarouselItem
            key={index}
            className="pl-5 md:basis-1/2 lg:basis-1/3 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center"
          >
            <img
              src={testi?.url}
              alt="logo customer"
              className="rounded-l-lg h-[100%] w-[140px] object-cover"
            />
            <div className="flex flex-col p-4">
              <h4 className="font-semibold text-lg text-gray-700">
                {testi?.name}
              </h4>
              <p className="text-sm text-gray-500">{testi?.job}</p>
              <p className="text-xs mt-5 text-gray-600">{testi?.message}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

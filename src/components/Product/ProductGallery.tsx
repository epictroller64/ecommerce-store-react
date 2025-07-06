'use client'
import { useState } from "react";
import { Variant } from "../../lib/interface/Products"
import Image from "next/image"

export const Gallery = ({ variant }: { variant: Variant }) => {
    const [selectedImage, setSelectedImage] = useState(variant.images.length > 0 ? variant.images[0] : '/placeholder-image.jpg');
    return <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
            <div className="relative w-full h-full">
                <Image
                    src={selectedImage}
                    alt={variant.name || 'Product image'}
                    className="object-cover object-center"
                    fill
                />
            </div>
        </div>
        {variant.images && variant.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
                {variant.images.slice(1, 5).map((image, index) => (
                    <div onClick={() => setSelectedImage(image)} key={index} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                        <div className="relative w-full h-full ">
                            <Image
                                src={image}
                                alt={`${variant.name} ${index + 2}`}
                                fill
                                className="object-cover object-center cursor-pointer hover:opacity-75 transition-opacity"
                            />
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
}
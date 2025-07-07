'use client'
import { ComponentStyles } from "../../lib/styles/componentStyles";
import TranslatedText from "../Text";

export default function ShopFeatures({ features }: { features: ShopFeature[] }) {
    return (
        <div className={`${ComponentStyles.shopFeatures.container} w-full bg-gray-50`}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className={ComponentStyles.shopFeatures.internalContainer}>
                    {features.map((feature) => (
                        <div key={feature.title} className={`${ComponentStyles.shopFeatures.feature.container}`}>
                            <div className="flex justify-center mb-2">
                                <div className={ComponentStyles.shopFeatures.feature.icon}>
                                    {feature.icon}
                                </div>
                            </div>
                            <TranslatedText className={ComponentStyles.shopFeatures.feature.title} textTag="h3">
                                {feature.title}
                            </TranslatedText>
                            <TranslatedText className={ComponentStyles.shopFeatures.feature.description} textTag="p">
                                {feature.description}
                            </TranslatedText>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export type ShopFeature = {
    title: string
    description: string
    icon: React.ReactNode
}
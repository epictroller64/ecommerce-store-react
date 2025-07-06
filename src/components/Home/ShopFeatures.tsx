
export default function ShopFeatures({ features }: { features: ShopFeature[] }) {
    return (
        <div className="w-full bg-gray-50 py-16">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row gap-4 justify-between">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="text-2xl text-blue-600">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
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
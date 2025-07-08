import { ComponentStyles } from '../../lib/styles/componentStyles';

// Skeletons for checkout page
export default function CheckoutLoading() {
    return (
        <div className={ComponentStyles.checkout.container}>
            <div className="space-y-8">
                <div className={ComponentStyles.checkout.section.container}>
                    <div className={`${ComponentStyles.loading.skeleton} h-6 w-32 mb-4`}></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div className="flex-1">
                                    <div className={`${ComponentStyles.loading.skeleton} h-4 w-48 mb-1`}></div>
                                    <div className={`${ComponentStyles.loading.skeleton} h-3 w-16`}></div>
                                </div>
                                <div className={`${ComponentStyles.loading.skeleton} h-4 w-16`}></div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center py-2">
                            <div className={`${ComponentStyles.loading.skeleton} h-4 w-20`}></div>
                            <div className={`${ComponentStyles.loading.skeleton} h-4 w-16`}></div>
                        </div>
                    </div>
                </div>

                <div className={ComponentStyles.checkout.section.container}>
                    <div className={`${ComponentStyles.loading.skeleton} h-6 w-32 mb-4`}></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-4 border border-gray-200 rounded-lg">
                                <div className={`${ComponentStyles.loading.skeleton} h-4 w-4 mr-3`}></div>
                                <div className="flex items-center flex-1">
                                    <div className={`${ComponentStyles.loading.skeleton} h-6 w-6 mr-3`}></div>
                                    <div className="flex-1">
                                        <div className={`${ComponentStyles.loading.skeleton} h-4 w-32 mb-1`}></div>
                                        <div className={`${ComponentStyles.loading.skeleton} h-3 w-48`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={ComponentStyles.checkout.section.container}>
                    <div className={`${ComponentStyles.loading.skeleton} h-6 w-32 mb-4`}></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-4 border border-gray-200 rounded-lg">
                                <div className={`${ComponentStyles.loading.skeleton} h-4 w-4 mr-3`}></div>
                                <div className="flex items-center flex-1">
                                    <div className={`${ComponentStyles.loading.skeleton} h-6 w-6 mr-3`}></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className={`${ComponentStyles.loading.skeleton} h-4 w-32 mb-1`}></div>
                                                <div className={`${ComponentStyles.loading.skeleton} h-3 w-48 mb-1`}></div>
                                                <div className={`${ComponentStyles.loading.skeleton} h-3 w-24`}></div>
                                            </div>
                                            <div className={`${ComponentStyles.loading.skeleton} h-4 w-16`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className={`${ComponentStyles.loading.skeleton} h-12 w-48 rounded-lg`}></div>
                </div>
            </div>
        </div>
    );
} 
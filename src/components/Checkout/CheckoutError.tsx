'use client'
import { ComponentStyles } from '../../lib/styles/componentStyles';

interface CheckoutErrorProps {
    error: string;
    onRetry?: () => void;
}

export default function CheckoutError({ error, onRetry }: CheckoutErrorProps) {
    return (
        <div className={ComponentStyles.checkout.container}>
            <div className="text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                </div>

                <div className="flex justify-center space-x-4">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className={`${ComponentStyles.button.base} ${ComponentStyles.button.variants.primary} ${ComponentStyles.button.sizes.md}`}
                        >
                            Try Again
                        </button>
                    )}
                    <button
                        onClick={() => window.location.href = '/'}
                        className={`${ComponentStyles.button.base} ${ComponentStyles.button.variants.outline} ${ComponentStyles.button.sizes.md}`}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
} 
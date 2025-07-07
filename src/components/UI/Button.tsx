'use client'
import { ComponentStyles } from "../../lib/styles/componentStyles"

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type RoundedButtonProps = {
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function getVariantClasses(variant: 'primary' | 'secondary' | 'outline' | 'ghost') {
    switch (variant) {
        case 'primary':
            return ComponentStyles.button.variants.primary
        case 'secondary':
            return ComponentStyles.button.variants.secondary
        case 'outline':
            return ComponentStyles.button.variants.outline
        case 'ghost':
            return ComponentStyles.button.variants.ghost
        default:
            return ComponentStyles.button.variants.primary
    }
}

function getSizeClasses(size: 'sm' | 'md' | 'lg') {
    switch (size) {
        case 'sm':
            return ComponentStyles.button.sizes.sm
        case 'md':
            return ComponentStyles.button.sizes.md
        case 'lg':
            return ComponentStyles.button.sizes.lg
    }
}

function getRoundedSizeClasses(size: 'sm' | 'md' | 'lg') {
    switch (size) {
        case 'sm':
            return 'text-sm p-1 w-6 h-6'
        case 'md':
            return 'text-lg p-1 w-8 h-8'
        case 'lg':
            return 'text-xl p-2 w-10 h-10'
    }
}

export default function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
    const { className, ...rest } = props;

    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);

    return (
        <button
            {...rest}
            className={`${ComponentStyles.button.base} ${sizeClasses} ${variantClasses} ${className || ''}`}
        >
            {children}
        </button>
    )
}

export function RoundedButton({ size = 'md', children, ...props }: RoundedButtonProps) {
    const { className, ...rest } = props;

    const sizeClasses = getRoundedSizeClasses(size);
    const roundedClasses = "bg-white text-gray-700 hover:bg-gray-100 rounded-full aspect-square flex items-center justify-center";

    return (
        <button
            {...rest}
            className={`cursor-pointer ${sizeClasses} ${roundedClasses} ${className || ''}`}
        >
            {children}
        </button>
    )
}
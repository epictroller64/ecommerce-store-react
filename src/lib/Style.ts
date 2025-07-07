
// Theme configuration interface
export interface ThemeConfig {
    colors: {
        primary: string;
        primaryHover: string;
        secondary: string;
        secondaryHover: string;
        accent: string;
        accentHover: string;
        background: string;
        text: string;
        textLight: string;
    };
    button: {
        borderRadius: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    typography: {
        fontFamily: string;
        headingSizes: {
            h1: string;
            h2: string;
            h3: string;
            h4: string;
        };
    };
    breakpoints: {
        mobile: string;
        tablet: string;
        desktop: string;
        wide: string;
    };
}

export const defaultTheme: ThemeConfig = {
    colors: {
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        secondary: 'bg-gray-700',
        secondaryHover: 'hover:bg-gray-800',
        accent: 'bg-yellow-500',
        accentHover: 'hover:bg-yellow-600',
        background: 'bg-white',
        text: 'text-white',
        textLight: 'text-gray-500',
    },
    button: {
        borderRadius: 'rounded-lg',
    },
    spacing: {
        xs: 'p-1',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
    },
    typography: {
        fontFamily: 'font-sans',
        headingSizes: {
            h1: 'text-4xl md:text-6xl font-bold',
            h2: 'text-3xl md:text-5xl font-bold',
            h3: 'text-2xl md:text-4xl font-semibold',
            h4: 'text-xl md:text-3xl font-medium',
        },
    },
    breakpoints: {
        mobile: 'sm',
        tablet: 'md',
        desktop: 'lg',
        wide: 'xl',
    },
};
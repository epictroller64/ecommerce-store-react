// Theme configuration interface
export interface ThemeConfig {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
        textLight: string;
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
        primary: '#3B82F6',
        secondary: '#1F2937',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937',
        textLight: '#6B7280',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        headingSizes: {
            h1: 'text-4xl md:text-6xl',
            h2: 'text-3xl md:text-5xl',
            h3: 'text-2xl md:text-4xl',
            h4: 'text-xl md:text-3xl',
        },
    },
    breakpoints: {
        mobile: '640px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1280px',
    },
};

//Responsive stylingh
export class ResponsiveStyles {
    private theme: ThemeConfig;

    constructor(theme: ThemeConfig = defaultTheme) {
        this.theme = theme;
    }

    private responsive(classes: {
        mobile?: string;
        tablet?: string;
        desktop?: string;
        wide?: string;
    }): string {
        const { mobile, tablet, desktop, wide } = classes;
        return [
            mobile,
            tablet && `md:${tablet}`,
            desktop && `lg:${desktop}`,
            wide && `xl:${wide}`,
        ].filter(Boolean).join(' ');
    }

    get heroHeight() {
        return this.responsive({
            mobile: 'h-[60vh]',
            tablet: 'h-[70vh]',
            desktop: 'h-[80vh]',
            wide: 'h-[85vh]',
        });
    }

    get heroHeading() {
        return this.responsive({
            mobile: 'text-white text-2xl font-bold',
            tablet: 'text-white text-3xl font-bold',
            desktop: 'text-white text-4xl font-bold',
            wide: 'text-white text-5xl font-bold',
        });
    }

    get heroSubheading() {
        return this.responsive({
            mobile: 'text-white text-sm',
            tablet: 'text-white text-base',
            desktop: 'text-white text-lg',
            wide: 'text-white text-xl',
        });
    }

    get container() {
        return this.responsive({
            mobile: 'container mx-auto px-4',
            tablet: 'container mx-auto px-6',
            desktop: 'container mx-auto px-8',
            wide: 'container mx-auto px-12',
        });
    }

    get productGrid() {
        return this.responsive({
            mobile: 'grid grid-cols-1 gap-4',
            tablet: 'grid grid-cols-2 gap-6',
            desktop: 'grid grid-cols-3 gap-8',
            wide: 'grid grid-cols-4 gap-8',
        });
    }

    get categoryGrid() {
        return this.responsive({
            mobile: 'grid grid-cols-2 gap-3',
            tablet: 'grid grid-cols-3 gap-4',
            desktop: 'grid grid-cols-4 gap-6',
            wide: 'grid grid-cols-6 gap-6',
        });
    }

    get navbar() {
        return this.responsive({
            mobile: 'px-4 py-3',
            tablet: 'px-6 py-4',
            desktop: 'px-8 py-6',
            wide: 'px-12 py-8',
        });
    }

    get primaryButton() {
        return this.responsive({
            mobile: 'px-4 py-2 text-sm font-medium',
            tablet: 'px-6 py-3 text-base font-medium',
            desktop: 'px-8 py-4 text-lg font-medium',
            wide: 'px-10 py-5 text-xl font-medium',
        });
    }

    get productCard() {
        return this.responsive({
            mobile: 'p-3 rounded-lg',
            tablet: 'p-4 rounded-lg',
            desktop: 'p-6 rounded-xl',
            wide: 'p-8 rounded-xl',
        });
    }

    get spacing() {
        return {
            xs: this.responsive({ mobile: 'p-1', tablet: 'p-2', desktop: 'p-3', wide: 'p-4' }),
            sm: this.responsive({ mobile: 'p-2', tablet: 'p-3', desktop: 'p-4', wide: 'p-6' }),
            md: this.responsive({ mobile: 'p-4', tablet: 'p-6', desktop: 'p-8', wide: 'p-10' }),
            lg: this.responsive({ mobile: 'p-6', tablet: 'p-8', desktop: 'p-10', wide: 'p-12' }),
            xl: this.responsive({ mobile: 'p-8', tablet: 'p-10', desktop: 'p-12', wide: 'p-16' }),
        };
    }

    updateTheme(newTheme: Partial<ThemeConfig>) {
        this.theme = { ...this.theme, ...newTheme };
    }

    getTheme(): ThemeConfig {
        return this.theme;
    }
}

export const Styles = new ResponsiveStyles();

export const LegacyStyles = {
    homeContainer: "container mx-auto px-4",
    heroHeading: "text-white text-4xl font-bold",
    heroSubheading: "text-white text-lg",
    heroHeight: "h-[80vh]"
};
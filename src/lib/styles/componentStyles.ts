export const ComponentStyles = {
    hero: {
        container: "relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] xl:h-[85vh] overflow-hidden",
        content: "absolute inset-0 flex items-center justify-center",
        heading: "text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold",
        subheading: "text-white text-sm sm:text-base lg:text-lg xl:text-xl",
        navigation: {
            button: "absolute z-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm",
            left: "left-4",
            right: "right-4",
            dots: "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2",
            dot: "w-3 h-3 rounded-full transition-all duration-300",
            dotActive: "bg-white",
            dotInactive: "bg-white bg-opacity-50 hover:bg-opacity-75"
        }
    },
    featuredCard: {
        container: "bg-slate-100 rounded-xl overflow-hidden flex flex-col",
        imageContainer: "relative h-48 sm:h-64 bg-gray-100",
        image: "w-full h-full object-cover",
        placeholder: "w-full h-full flex items-center justify-center",
        placeholderIcon: "w-12 h-12 sm:w-16 sm:h-16 text-gray-400",
        saleBadge: "absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold",
        content: "p-4 sm:p-6",
        title: "text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2",
        priceContainer: "flex items-center space-x-2 mb-4",
        price: "text-xl sm:text-2xl font-bold text-gray-900",
        originalPrice: "text-base sm:text-lg text-gray-500 line-through"
    },
    productCard: {
        container: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
        image: "w-full h-48 object-cover",
        content: "p-4",
        title: "text-lg font-semibold mb-2",
        price: "text-xl font-bold text-blue-600"
    },
    productPage: {
        container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        internalContainer: "grid grid-cols-1 lg:grid-cols-2 gap-8",
    },

    categoryCard: {
        container: "bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer",
        icon: "text-4xl mb-4",
        title: "text-lg font-semibold mb-2",
        description: "text-gray-600"
    },
    categoryCollection: {
        container: "flex flex-row gap-4 overflow-x-auto",
    },

    shopFeatures: {
        container: "py-8 sm:py-16 lg:py-20 xl:py-24",
        internalContainer: "flex flex-col gap-4 md:flex-row",
        feature: {
            container: "text-center",
            icon: "md:text-4xl text-2xl md:mb-4 text-blue-600",
            title: "text-sm md:text-lg font-semibold mb-2",
            description: "text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl md:block hidden"
        }
    },

    button: {
        base: "cursor-pointer transition-colors",
        variants: {
            primary: "bg-blue-600 text-white hover:bg-blue-700 rounded-lg",
            secondary: "bg-gray-700 text-white hover:bg-gray-800 rounded-lg",
            outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg",
            ghost: "bg-transparent text-gray-700 hover:bg-gray-100 rounded-lg"
        },
        sizes: {
            sm: "text-sm py-1 px-2",
            md: "text-lg py-2 px-4",
            lg: "text-xl py-2 px-4"
        }
    },

    navbar: {
        container: "bg-white shadow-sm border-b sticky top-0 z-50",
        content: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        header: "flex justify-between items-center min-h-16 py-2",
        logo: "text-lg sm:text-xl font-bold text-gray-900 truncate",
        desktopMenu: "hidden md:block",
        desktopMenuItems: "ml-10 flex items-baseline space-x-4",
        mobileMenu: "md:hidden flex items-center space-x-2",
        mobileMenuButton: "text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2",
        mobileMenuContent: "md:hidden border-t border-gray-200 overflow-hidden",
        mobileMenuItem: "text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-50 transition-colors",
        cartButton: "relative inline-flex items-center px-2 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200",
        cartIcon: "w-5 h-5 sm:mr-2",
        cartBadge: "absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[1.25rem] h-5"
    },

    layout: {
        container: "container mx-auto px-4 sm:px-6 lg:px-8",
        main: "min-h-screen",
        section: "py-8 sm:py-12 lg:py-16"
    },

    grid: {
        productGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        categoryGrid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
    },

    form: {
        group: "mb-4",
        label: "block text-sm font-medium mb-2",
        input: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        textarea: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical",
        select: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        checkbox: "mr-2",
        radio: "mr-2",
        error: "text-red-500 text-sm mt-1",
        success: "text-green-500 text-sm mt-1"
    },

    alert: {
        base: "p-4 rounded-lg mb-4",
        success: "bg-green-100 text-green-800 border border-green-200",
        error: "bg-red-100 text-red-800 border border-red-200",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
        info: "bg-blue-100 text-blue-800 border border-blue-200"
    },

    badge: {
        base: "inline-block px-2 py-1 text-xs font-semibold rounded",
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800"
    },

    loading: {
        skeleton: "animate-pulse bg-gray-200 rounded",
        skeletonText: "h-4 bg-gray-200 rounded",
        skeletonImage: "w-full h-32 bg-gray-200 rounded",
        skeletonButton: "h-10 bg-gray-200 rounded",
        spinner: "animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
    }
}; 
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
        container: "bg-white shadow-sm sticky top-0 z-50",
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
    },

    auth: {
        container: "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",
        card: "max-w-md w-full bg-white rounded-xl p-8",
        header: {
            container: "text-center mb-8",
            title: "text-3xl font-bold text-gray-900 mb-2",
            subtitle: "text-gray-600 text-sm"
        },
        tabs: {
            container: "flex mb-8 bg-gray-100 rounded-lg p-1",
            tab: "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 hover:cursor-pointer",
            tabActive: "bg-white text-blue-600 shadow-sm",
            tabInactive: "text-gray-600 hover:text-gray-900"
        },
        form: {
            container: "space-y-6",
            group: "space-y-2",
            label: "block text-sm font-medium text-gray-700",
            input: "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
            inputError: "w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors",
            error: "text-red-500 text-sm mt-1",
            success: "text-green-500 text-sm mt-1",
            submitButton: "w-full mt-6"
        },
        divider: {
            container: "relative my-6",
            line: "absolute inset-0 flex items-center",
            lineInner: "w-full border-t border-gray-300",
            text: "relative flex justify-center text-sm"
        },
        social: {
            container: "mt-6",
            button: "w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        }
    },

    checkout: {
        container: "max-w-4xl mx-auto space-y-8",
        section: {
            container: "bg-slate-50 rounded-lg p-6",
            title: "text-xl font-semibold mb-4",
            content: "space-y-3"
        },
        orderSummary: {
            item: "flex justify-between items-center py-2 border-b border-gray-100",
            itemContent: "flex-1",
            itemName: "font-medium",
            itemDetails: "text-sm text-gray-600",
            itemPrice: "font-semibold",
            total: "text-lg font-bold"
        },
        paymentMethod: {
            container: "flex items-center p-4 bg-white border-transparent border rounded-lg cursor-pointer hover:border-blue-500 transition-colors",
            radio: "mr-3",
            content: "flex items-center flex-1",
            icon: "text-2xl mr-3",
            details: "flex-1",
            name: "font-medium",
            description: "text-sm text-gray-600",
            fee: "text-sm text-gray-500"
        },
        deliveryMethod: {
            container: "flex items-center p-4 border border-transparent bg-white rounded-lg cursor-pointer hover:border-blue-500 transition-colors",
            radio: "mr-3",
            content: "flex items-center flex-1",
            icon: "text-2xl mr-3",
            details: "flex-1",
            header: "flex justify-between items-start",
            name: "font-medium",
            description: "text-sm text-gray-600",
            estimatedDays: "text-sm text-gray-500",
            price: "font-semibold"
        },
        submitButton: {
            container: "flex justify-end",
            button: "px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        }
    },

    orderPage: {
        container: "max-w-4xl mx-auto px-4 py-8",
        header: {
            container: "mb-8",
            title: "text-3xl font-bold text-gray-900 mb-2",
            subtitle: "text-gray-600"
        },
        orderInfo: {
            container: "bg-slate-50 rounded-lg p-6 mb-6",
            header: "flex justify-between items-start mb-6",
            orderId: "text-sm text-gray-600",
            orderIdValue: "font-mono text-sm font-medium",
            date: "text-sm text-gray-500",
            status: "flex items-center gap-2"
        },
        orderItems: {
            container: "bg-slate-50 rounded-lg p-6 mb-6",
            title: "text-xl font-semibold mb-4",
            item: "flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0",
            itemContent: "flex-1",
            itemName: "font-medium text-gray-900",
            itemVariant: "text-sm text-gray-600 mt-1",
            itemQuantity: "text-sm text-gray-500 mt-1",
            itemPrice: "font-semibold text-gray-900"
        },
        orderSummary: {
            container: "bg-slate-50 rounded-lg p-6",
            title: "text-xl font-semibold mb-4",
            row: "flex justify-between items-center py-2",
            label: "text-gray-600",
            value: "font-semibold",
            total: "text-lg font-bold text-gray-900 border-t border-gray-200 pt-2"
        },
        actions: {
            container: "flex gap-4 mt-6",
            button: "flex-1"
        }
    },

    profile: {
        container: "max-w-4xl mx-auto px-4 py-8 gap-2 flex flex-col",
        header: {
            container: "",
            title: "text-3xl font-bold text-gray-900 mb-2",
            subtitle: "text-gray-600"
        },
        userInfo: {
            container: "bg-slate-50 rounded-lg p-6 mb-6",
            header: "flex items-center justify-between mb-4",
            title: "text-xl font-semibold",
            avatar: "w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold",
            userDetails: "flex-1 ml-4",
            userName: "text-lg font-semibold text-gray-900",
            userEmail: "text-gray-600",
            userRole: "text-sm text-gray-500 mt-1"
        },
        stats: {
            container: "grid grid-cols-1 md:grid-cols-3 gap-4",
            card: "bg-slate-50 rounded-lg p-6 text-center",
            number: "text-2xl font-bold text-gray-900",
            label: "text-sm text-gray-600 mt-1"
        },
        sections: {
            container: "grid grid-cols-1 lg:grid-cols-2 gap-6",
            section: "bg-slate-50 rounded-lg p-6",
            title: "text-lg font-semibold mb-4",
            content: "space-y-3"
        },
        quickActions: {
            container: "bg-slate-50 rounded-lg p-6",
            title: "text-lg font-semibold mb-4",
            grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            action: "flex items-center p-4 bg-white rounded-lg border border-transparent hover:border-blue-500 transition-all cursor-pointer",
            icon: "w-8 h-8 text-blue-600 mr-3",
            content: "flex-1",
            description: "text-sm text-gray-600"
        }
    },

    settings: {
        container: "max-w-4xl mx-auto px-4 py-8 gap-2 flex flex-col",
        header: {
            container: "",
            title: "text-3xl font-bold text-gray-900 mb-2",
            subtitle: "text-gray-600"
        },
        section: {
            container: "bg-slate-50 rounded-lg p-6",
            title: "text-xl font-semibold mb-4",
            content: "space-y-4"
        },
        form: {
            group: "space-y-2",
            label: "block text-sm font-medium text-gray-700",
            input: "w-full px-3 py-2 border border-transparent bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
            textarea: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical",
            error: "text-red-500 text-sm mt-1",
            success: "text-green-500 text-sm mt-1"
        },
        button: {
            container: "flex justify-end gap-4",
            primary: "px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex flex-row items-center gap-2",
            secondary: "px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors flex flex-row items-center gap-2"
        }
    },

    wishlist: {
        container: "max-w-4xl mx-auto px-4 py-8 gap-2 flex flex-col",
        header: {
            container: "",
            title: "text-3xl font-bold text-gray-900 mb-2",
            subtitle: "text-gray-600"
        },
        empty: {
            container: "text-center py-12",
            icon: "w-16 h-16 text-gray-300 mx-auto mb-4",
            title: "text-xl text-gray-600 mb-4",
            description: "text-gray-500 mb-6",
            button: "inline-flex items-center gap-2"
        },
        grid: {
            container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            item: "bg-slate-50 rounded-lg overflow-hidden"
        },
        item: {
            image: "w-full h-48 object-cover",
            content: "p-4",
            title: "text-lg font-semibold mb-2 line-clamp-2",
            price: "text-xl font-bold text-blue-600 mb-3",
            actions: "flex gap-2"
        }
    }
}; 
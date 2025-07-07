"use client"
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import { useHero } from '../../lib/hooks/useConfig';
import { useLanguage } from '../../lib/i18n/LanguageProvider';

export default function Hero() {
    const { data: heroConfig, loading } = useHero();
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const fallbackConfig = {
        title: t('hero.title'),
        subtitle: t('hero.subtitle'),
        images: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
        ],
        autoPlay: true,
        autoPlayInterval: 5000,
    };
    const config = heroConfig || fallbackConfig;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % config.images.length);
    }, [config.images.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + config.images.length) % config.images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (config.autoPlay) {
            const interval = setInterval(nextSlide, config.autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [nextSlide, config.autoPlay, config.autoPlayInterval]);

    if (loading) {
        return (
            <div className={`relative w-full ${ComponentStyles.hero.container} bg-gray-200 animate-pulse`}>
                <div className={ComponentStyles.hero.content}>
                    <div className="text-center">
                        <div className="h-8 bg-gray-300 rounded mb-4 w-64"></div>
                        <div className="h-4 bg-gray-300 rounded w-96"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full ${ComponentStyles.hero.container}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div className='relative w-full h-full'>
                        <Image
                            src={config.images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                        />
                        <div className='absolute inset-0 bg-black/30' />
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={prevSlide}
                className={`${ComponentStyles.hero.navigation.button} ${ComponentStyles.hero.navigation.left}`}
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
                onClick={nextSlide}
                className={`${ComponentStyles.hero.navigation.button} ${ComponentStyles.hero.navigation.right}`}
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            <div className={ComponentStyles.hero.navigation.dots}>
                {config.images.map((_, index: number) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`${ComponentStyles.hero.navigation.dot} ${index === currentIndex
                            ? ComponentStyles.hero.navigation.dotActive
                            : ComponentStyles.hero.navigation.dotInactive
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            scale: index === currentIndex ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <HeroContent config={config} />
        </div>
    );
}

const HeroContent = ({ config }: { config: { title: string; subtitle: string; images: string[]; autoPlay: boolean; autoPlayInterval: number } }) => {
    return <div className={ComponentStyles.hero.content}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-white"
        >
            <h1 className={`${ComponentStyles.hero.heading} mb-4`}>
                {config.title}
            </h1>
            <p className={`${ComponentStyles.hero.subheading} max-w-2xl mx-auto px-4`}>
                {config.subtitle}
            </p>
        </motion.div>
    </div>
}
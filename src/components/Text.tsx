'use client'
import { useEffect, useState } from "react";
import { useLanguage } from "../lib/i18n/LanguageProvider";
import React from "react";

// Translated text component, if string key has a match translation is provided
export default function TranslatedText({ children, className, textTag = 'p' }: { children: string, className?: string, textTag?: string }) {
    const { t } = useLanguage();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);
    return React.createElement(textTag, { className }, loaded ? t(children) : children)
}
'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../components/UI/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema, registerUserSchema } from "../../lib/schemas/zodSchemas";
import { loginUser, registerUser } from "../../lib/actions/authActions";
import { useTranslations } from "../../lib/hooks/useTranslations";
import { ComponentStyles } from "../../lib/styles/componentStyles";
import { useRouter } from "next/navigation";
import { handleWithToast } from "../../components/Utils";

export default function AuthenticationPage() {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const { t } = useTranslations();
    return (
        <div className={ComponentStyles.auth.container}>
            <div className={ComponentStyles.auth.card}>
                <div className={ComponentStyles.auth.header.container}>
                    <h1 className={ComponentStyles.auth.header.title}>
                        {t("welcome")}
                    </h1>
                    <p className={ComponentStyles.auth.header.subtitle}>
                        {isLoginTab ? t("loginSubtitle") : t("registerSubtitle")}
                    </p>
                </div>

                <div className={ComponentStyles.auth.tabs.container}>
                    <button
                        onClick={() => setIsLoginTab(true)}
                        className={`${ComponentStyles.auth.tabs.tab} ${isLoginTab ? ComponentStyles.auth.tabs.tabActive : ComponentStyles.auth.tabs.tabInactive}`}
                    >
                        {t("login")}
                    </button>
                    <button
                        onClick={() => setIsLoginTab(false)}
                        className={`${ComponentStyles.auth.tabs.tab} ${!isLoginTab ? ComponentStyles.auth.tabs.tabActive : ComponentStyles.auth.tabs.tabInactive}`}
                    >
                        {t("register")}
                    </button>
                </div>

                {isLoginTab ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
}

const RegisterForm = () => {
    const { t } = useTranslations();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
    });

    async function onSubmit(data: z.infer<typeof registerUserSchema>) {
        setIsLoading(true);

        const response = await handleWithToast(
            registerUser(data),
            t,
            'auth.registrationSuccess',
            'auth.registrationFailed'
        );

        if (response.success) {
            router.push("/");
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={ComponentStyles.auth.form.container}>
            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="name" className={ComponentStyles.auth.form.label}>
                    {t("name")}
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder={t("namePlaceholder")}
                    {...form.register("name")}
                    className={form.formState.errors.name ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.name && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="email" className={ComponentStyles.auth.form.label}>
                    {t("email")}
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    {...form.register("email")}
                    className={form.formState.errors.email ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.email && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="password" className={ComponentStyles.auth.form.label}>
                    {t("password")}
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    {...form.register("password")}
                    className={form.formState.errors.password ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.password && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="confirmPassword" className={ComponentStyles.auth.form.label}>
                    {t("confirmPassword")}
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder={t("confirmPasswordPlaceholder")}
                    {...form.register("confirmPassword")}
                    className={form.formState.errors.confirmPassword ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.confirmPassword && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.confirmPassword.message}
                    </p>
                )}
            </div>

            <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                className={ComponentStyles.auth.form.submitButton}
            >
                {isLoading ? t("registering") : t("register")}
            </Button>
        </form>
    );
};

const LoginForm = () => {
    const { t } = useTranslations();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
    });

    async function onSubmit(data: z.infer<typeof loginUserSchema>) {
        setIsLoading(true);

        const response = await handleWithToast(
            loginUser(data),
            t,
            'auth.loginSuccess',
            'auth.loginFailed'
        );

        if (response.success) {
            router.push("/");
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={ComponentStyles.auth.form.container}>
            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="loginEmail" className={ComponentStyles.auth.form.label}>
                    {t("email")}
                </label>
                <input
                    id="loginEmail"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    {...form.register("email")}
                    className={form.formState.errors.email ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.email && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div className={ComponentStyles.auth.form.group}>
                <label htmlFor="loginPassword" className={ComponentStyles.auth.form.label}>
                    {t("password")}
                </label>
                <input
                    id="loginPassword"
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    {...form.register("password")}
                    className={form.formState.errors.password ? ComponentStyles.auth.form.inputError : ComponentStyles.auth.form.input}
                />
                {form.formState.errors.password && (
                    <p className={ComponentStyles.auth.form.error}>
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                className={ComponentStyles.auth.form.submitButton}
            >
                {isLoading ? t("loggingIn") : t("login")}
            </Button>
        </form>
    );
};
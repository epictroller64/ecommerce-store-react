'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaUser, FaEnvelope, FaLock, FaSave, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import { User } from '../../lib/interface/User';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import { updateUserSettingsSchema } from '../../lib/schemas/zodSchemas';
import type { z } from 'zod';
import Button from '../UI/Button';
import { handleWithToast } from '../Utils';
import { updateUserSettings } from '../../lib/actions/userActions';

interface SettingsProps {
    user: User;
}

type FormData = z.infer<typeof updateUserSettingsSchema>;

export default function Settings({ user }: SettingsProps) {
    const { t } = useLanguage();
    const [success, setSuccess] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(updateUserSettingsSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data: FormData) => {
        setSuccess('');
        setIsLoading(true);
        // Show toast depending on the response and send it back, actions catch errors and return them in response obj
        const response = await handleWithToast(updateUserSettings(data), t, 'settings.settingsUpdated', 'settings.failedToUpdate');
        if (response.success && response.data) {
            setSuccess(t('settings.settingsUpdated'));
            reset({
                name: response.data.name,
                email: response.data.email,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
        setIsLoading(false);
    };

    const handleCancel = () => {
        reset({
            name: user.name,
            email: user.email,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setSuccess('');
    };

    return (
        <div className={ComponentStyles.settings.container}>
            <div className={ComponentStyles.settings.header.container}>
                <h1 className={ComponentStyles.settings.header.title}>
                    {t('navigation.settings')}
                </h1>
                <p className={ComponentStyles.settings.header.subtitle}>
                    {t('settings.manageAccountSettings')}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className={ComponentStyles.settings.section.container}>
                    <h2 className={ComponentStyles.settings.section.title}>
                        {t('settings.personalInformation')}
                    </h2>
                    <div className={ComponentStyles.settings.section.content}>
                        <div className={ComponentStyles.settings.form.group}>
                            <label className={ComponentStyles.settings.form.label}>
                                <FaUser className="inline w-4 h-4 mr-2" />
                                {t('settings.fullName')}
                            </label>
                            <input
                                type="text"
                                {...register('name')}
                                className={ComponentStyles.settings.form.input}
                                placeholder={t('settings.enterFullName')}
                            />
                            {errors.name && (
                                <div className={ComponentStyles.settings.form.error}>
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className={ComponentStyles.settings.form.group}>
                            <label className={ComponentStyles.settings.form.label}>
                                <FaEnvelope className="inline w-4 h-4 mr-2" />
                                {t('settings.emailAddress')}
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className={ComponentStyles.settings.form.input}
                                placeholder={t('settings.enterEmailAddress')}
                            />
                            {errors.email && (
                                <div className={ComponentStyles.settings.form.error}>
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={ComponentStyles.settings.section.container}>
                    <h2 className={ComponentStyles.settings.section.title}>
                        {t('settings.changePassword')}
                    </h2>
                    <div className={ComponentStyles.settings.section.content}>
                        <div className={ComponentStyles.settings.form.group}>
                            <label className={ComponentStyles.settings.form.label}>
                                <FaLock className="inline w-4 h-4 mr-2" />
                                {t('settings.currentPassword')}
                            </label>
                            <input
                                type="password"
                                {...register('currentPassword')}
                                className={ComponentStyles.settings.form.input}
                                placeholder={t('settings.enterCurrentPassword')}
                            />
                            {errors.currentPassword && (
                                <div className={ComponentStyles.settings.form.error}>
                                    {errors.currentPassword.message}
                                </div>
                            )}
                        </div>

                        <div className={ComponentStyles.settings.form.group}>
                            <label className={ComponentStyles.settings.form.label}>
                                <FaLock className="inline w-4 h-4 mr-2" />
                                {t('settings.newPassword')}
                            </label>
                            <input
                                type="password"
                                {...register('newPassword')}
                                className={ComponentStyles.settings.form.input}
                                placeholder={t('settings.enterNewPassword')}
                            />
                            {errors.newPassword && (
                                <div className={ComponentStyles.settings.form.error}>
                                    {errors.newPassword.message}
                                </div>
                            )}
                        </div>

                        <div className={ComponentStyles.settings.form.group}>
                            <label className={ComponentStyles.settings.form.label}>
                                <FaLock className="inline w-4 h-4 mr-2" />
                                {t('settings.confirmNewPassword')}
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword')}
                                className={ComponentStyles.settings.form.input}
                                placeholder={t('settings.confirmNewPasswordPlaceholder')}
                            />
                            {errors.confirmPassword && (
                                <div className={ComponentStyles.settings.form.error}>
                                    {errors.confirmPassword.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {success && (
                    <div className="bg-green-100 text-green-800 border border-green-200 rounded-lg p-4">
                        {success}
                    </div>
                )}

                <div className={ComponentStyles.settings.button.container}>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className={ComponentStyles.settings.button.secondary}
                    >
                        <FaTimes className="w-4 h-4 mr-2" />
                        {t('settings.cancel')}
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading || !isDirty}
                        className={ComponentStyles.settings.button.primary}
                    >
                        <FaSave className="w-4 h-4 mr-2" />
                        {isLoading ? t('settings.saving') : t('settings.saveChanges')}
                    </Button>
                </div>
            </form>
        </div>
    );
} 
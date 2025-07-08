'use client'

import { FaBox, FaHeart, FaCog, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa';
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import { User } from '../../lib/interface/User';
import { Order } from '../../lib/interface/Order';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import Button from '../UI/Button';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../lib/actions/authActions';

interface ProfileOverviewProps {
    user: User;
    orders: Order[];
}

interface UserInfoSectionProps {
    user: User;
}

interface StatsCardProps {
    number: number;
    label: string;
}

interface QuickActionProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

interface QuickActionsSectionProps {
    title: string;
}

interface AccountInfoSectionProps {
    user: User;
}

interface RecentActivitySectionProps {
    orders: Order[];
}

function UserInfoSection({ user }: UserInfoSectionProps) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className={ComponentStyles.profile.userInfo.container}>
            <div className="flex items-center">
                <div className={ComponentStyles.profile.userInfo.avatar}>
                    {getInitials(user.name)}
                </div>
                <div className={ComponentStyles.profile.userInfo.userDetails}>
                    <div className={ComponentStyles.profile.userInfo.userName}>
                        {user.name}
                    </div>
                    <div className={ComponentStyles.profile.userInfo.userEmail}>
                        {user.email}
                    </div>
                    <div className={ComponentStyles.profile.userInfo.userRole}>
                        {user.role}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ number, label }: StatsCardProps) {
    return (
        <div className={ComponentStyles.profile.stats.card}>
            <div className={ComponentStyles.profile.stats.number}>
                {number}
            </div>
            <div className={ComponentStyles.profile.stats.label}>
                {label}
            </div>
        </div>
    );
}

function QuickAction({ icon, title, description, href }: QuickActionProps) {
    return (
        <div
            className={ComponentStyles.profile.quickActions.action}
            onClick={() => window.location.href = href}
        >
            {icon}
            <div className={ComponentStyles.profile.quickActions.content}>
                <div className={ComponentStyles.profile.quickActions.title}>
                    {title}
                </div>
                <div className={ComponentStyles.profile.quickActions.description}>
                    {description}
                </div>
            </div>
        </div>
    );
}

function QuickActionsSection({ title }: QuickActionsSectionProps) {
    const { t } = useLanguage();

    return (
        <div className={ComponentStyles.profile.quickActions.container}>
            <h2 className={ComponentStyles.profile.quickActions.title}>
                {title}
            </h2>
            <div className={ComponentStyles.profile.quickActions.grid}>
                <QuickAction
                    icon={<FaShoppingBag className={ComponentStyles.profile.quickActions.icon} />}
                    title={t('navigation.orders')}
                    description={t('profile.viewOrderHistory')}
                    href="/profile/orders"
                />
                <QuickAction
                    icon={<FaCog className={ComponentStyles.profile.quickActions.icon} />}
                    title={t('navigation.settings')}
                    description={t('profile.manageAccountSettings')}
                    href="/profile/settings"
                />
                <QuickAction
                    icon={<FaHeart className={ComponentStyles.profile.quickActions.icon} />}
                    title={t('navigation.wishlist')}
                    description={t('profile.viewSavedItems')}
                    href="/profile/wishlist"
                />
                <QuickAction
                    icon={<FaBox className={ComponentStyles.profile.quickActions.icon} />}
                    title={t('profile.continueShopping')}
                    description={t('profile.browseProducts')}
                    href="/"
                />
            </div>
        </div>
    );
}

function AccountInfoSection({ user }: AccountInfoSectionProps) {
    const { t } = useLanguage();

    return (
        <div className={ComponentStyles.profile.sections.section}>
            <h3 className={ComponentStyles.profile.sections.title}>
                {t('profile.accountInformation')}
            </h3>
            <div className={ComponentStyles.profile.sections.content}>
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">{t('profile.memberSince')}:</span>
                    <span className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

function RecentActivitySection({ orders }: RecentActivitySectionProps) {
    const { t } = useLanguage();

    return (
        <div className={ComponentStyles.profile.sections.section}>
            <h3 className={ComponentStyles.profile.sections.title}>
                {t('profile.recentActivity')}
            </h3>
            <div className={ComponentStyles.profile.sections.content}>
                {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                            <div className="font-medium">Order #{order.id}</div>
                            <div className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-medium">${order.totalPrice.toFixed(2)}</div>
                            <div className="text-sm text-gray-600 capitalize">
                                {order.status}
                            </div>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        {t('profile.noOrdersYet')}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProfileOverview({ user, orders }: ProfileOverviewProps) {
    const { t } = useLanguage();
    const [loaded, setLoaded] = useState(false);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'delivered').length;

    useEffect(() => {
        // For hydration errors withdate
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className={ComponentStyles.profile.container}>
            <div className={ComponentStyles.profile.header.container}>
                <h1 className={ComponentStyles.profile.header.title}>
                    {t('navigation.profile')}
                </h1>
                <p className={ComponentStyles.profile.header.subtitle}>
                    {t('profile.manageAccount')}
                </p>
            </div>

            <UserInfoSection user={user} />

            <div className={ComponentStyles.profile.stats.container}>
                <StatsCard
                    number={totalOrders}
                    label={t('navigation.orders')}
                />
                <StatsCard
                    number={pendingOrders}
                    label={t('profile.pendingOrders')}
                />
                <StatsCard
                    number={completedOrders}
                    label={t('profile.completedOrders')}
                />
            </div>

            <QuickActionsSection title={t('profile.quickActions')} />

            <div className={ComponentStyles.profile.sections.container}>
                <AccountInfoSection user={user} />
                <RecentActivitySection orders={orders} />
            </div>

            <div className="mt-8 text-center">
                <Button
                    variant="outline"
                    onClick={async () => {
                        await logoutUser();

                    }}
                    className="flex items-center gap-2 mx-auto"
                >
                    <FaSignOutAlt className="w-4 h-4" />
                    {t('navigation.logout')}
                </Button>
            </div>
        </div>
    );
} 
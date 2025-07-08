'use client'

import Link from "next/link";
import { LocalApi } from "../../lib/api/LocalApi";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import { Order } from "../../lib/interface/Order";
import Button from "../UI/Button";


export default function ManageOrder({ order }: { order: Order }) {
    const { t } = useLanguage()
    const allowCancel = order.status === 'pending'
    async function cancelOrder() {
        if (!allowCancel) {
            return
        }
        const response = await LocalApi.cancelOrder(order.id)
        if (response.error) {
            //todo: show error
            return
        }
    }
    return (
        <div className="flex gap-2">
            {allowCancel && (
                <Button onClick={cancelOrder} variant="outline" size="sm">
                    {t('common.cancel')}
                </Button>
            )}
            <Button variant="outline" size="sm">
                <Link href={`/profile/order/${order.id}`}>
                    {t('common.view')}
                </Link>
            </Button>
        </div>
    )
}
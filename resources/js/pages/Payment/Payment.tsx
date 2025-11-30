import { Button } from '@/components/ui/Button/Button';
import AppLayout from '@/layouts/AppLayout/AppLayout';
import { router } from '@inertiajs/react';

const Payment = () => {
    const { tier } = route().params;

    const handleClick = () => {
        router.visit(route('payment.store', tier), { method: 'post' });
    };
    return (
        <AppLayout className="payment">
            <h1 class="payment__title">This is a payment processing page</h1>
            <div className="payment__content">
                <Button
                    onClick={handleClick}
                    class="payment__button button secondary"
                    variant="primary"
                >
                    Pay
                </Button>
            </div>
        </AppLayout>
    );
};
export default Payment;

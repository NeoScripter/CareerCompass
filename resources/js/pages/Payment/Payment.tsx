import AppLayout from '@/layouts/AppLayout/AppLayout';

const Payment = () => {
    const { tier } = route().params;

    return (
        <AppLayout className="payment">
            <h1 className="payment__title">
                This is a payment processing page
            </h1>

            <div className="payment__content">
                <form method="POST" action={route('payment.store', tier)}>
                    <input
                        type="hidden"
                        name="_token"
                        value={
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute('content')!
                        }
                    />

                    <button
                        type="submit"
                        className="payment__button button secondary"
                    >
                        Pay
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};

export default Payment;

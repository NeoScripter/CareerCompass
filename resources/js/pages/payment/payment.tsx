import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

const Payment = () => {
    return (
        <AppLayout className="pt-35 sm:pt-42 lg:pt-50">
            <h1 class="mb-5 text-center text-5xl font-bold text-balance lg:mb-10 lg:text-6xl xl:mb-14 xl:text-7xl">
                This is a payment processing page
            </h1>
            <div className="sm:prose-md prose prose-sm lg:prose-lg 2xl:prose-xl text-foreground mx-auto my-3 block max-w-320 lg:mt-5">
                <Button class='lg:px-[3em] mx-auto' variant="primary">Pay</Button>
            </div>
        </AppLayout>
    );
};

export default Payment;

import AppLayout from '@/layouts/AppLayout/AppLayout';
import HeroSection from './partials/HeroSection/HeroSection';
import IntroSection from './partials/IntroSection/IntroSection';

const Home = () => {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
            {/* <OutcomesSection /> */}
            {/* <ReasonsSection /> */}
            {/* <PlansSection /> */}
        </AppLayout>
    );
};

export default Home;

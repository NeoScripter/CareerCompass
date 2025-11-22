import AppLayout from '@/layouts/app-layout';
import HeroSection from './partials/hero-section';
import IntroSection from './partials/intro-section';
import OutcomesSection from './partials/outcomes-section';
import ReasonsSection from './partials/reasons-section';

const Home = () => {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
            <OutcomesSection />
            <ReasonsSection />

        </AppLayout>
    );
};

export default Home;

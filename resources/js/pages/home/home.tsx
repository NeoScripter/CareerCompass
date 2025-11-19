import AppLayout from '@/layouts/app-layout';
import HeroSection from './partials/hero-section';
import IntroSection from './partials/intro-section';

const Home = () => {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />

        </AppLayout>
    );
};

export default Home;

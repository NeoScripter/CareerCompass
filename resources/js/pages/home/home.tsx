import AppLayout from '@/layouts/app-layout';
import HeroSection from './partials/hero-section';
import IntroSection from './partials/intro-section';
import OutcomesSection from './partials/outcomes-section';
import PlansSection from './partials/plans-section';
import ReasonsSection from './partials/reasons-section/reasons-section';

const Home = () => {
    return (
        <AppLayout>
            <HeroSection />
            <IntroSection />
            <OutcomesSection />
            <ReasonsSection />
            <PlansSection />
        </AppLayout>
    );
};

export default Home;

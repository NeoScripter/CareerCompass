import AppLayout from '@/layouts/AppLayout/AppLayout';
import HeroSection from './partials/HeroSection/HeroSection';
import IntroSection from './partials/IntroSection/IntroSection';
import OutcomesSection from './partials/OutcomesSection/OutcomesSection';
import PlansSection from './partials/PlansSection/PlansSection';
import ReasonsSection from './partials/ReasonsSection/ReasonsSection';

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

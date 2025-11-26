import AppLayout from '@/layouts/AppLayout/AppLayout';
import HeroSection from './Partials/HeroSection/HeroSection';
import IntroSection from './Partials/IntroSection/IntroSection';
import OutcomesSection from './Partials/OutcomesSection/OutcomesSection';
import PlansSection from './Partials/PlansSection/PlansSection';
import ReasonsSection from './Partials/ReasonsSection/ReasonsSection';

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

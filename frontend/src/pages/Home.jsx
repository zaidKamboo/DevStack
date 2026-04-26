import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import CTA from "../components/home/CTA";
import Demo from "../components/home/Demo";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";


const Landing = () => {
    return (
        <div className="bg-radial-dark text-white">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <Demo />
            <CTA />
            <Footer />
        </div>
    );
};

export default Landing;
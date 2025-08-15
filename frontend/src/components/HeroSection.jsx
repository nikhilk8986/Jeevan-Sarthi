import TypewriterComponent from "./Typewriter"

export default function HeroSection() {
    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
            style={{
                backgroundImage: "url('/src/assets/background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <TypewriterComponent />
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button className="btn border border-black bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors">
                    Get Started
                </button>
                <button className="btn border border-black bg-green-400 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    )
}

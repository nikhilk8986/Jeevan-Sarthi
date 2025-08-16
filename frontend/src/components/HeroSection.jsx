import TypewriterComponent from "./Typewriter"

export default function HeroSection() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
                     style={{
                         backgroundImage: `radial-gradient(circle at 1px 1px, rgba(220, 38, 38, 0.1) 1px, transparent 0)`,
                         backgroundSize: '20px 20px'
                     }}>
                </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
            
            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                {/* Hero Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 border border-red-200 text-red-700 text-sm font-medium mb-8">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Saving Lives Through Blood Donation
                </div>
                
                {/* Main Heading */}
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent">
                        Jeevan Sarthi
                    </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Connecting donors with hospitals in need. Every drop counts, every donor matters.
                </p>
                
                {/* Typewriter Component */}
                <div className="mb-12">
                    <TypewriterComponent/>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-red-700 hover:to-red-800">
                        Become a Donor
                    </button>
                    <button className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-red-50">
                        Find Hospitals
                    </button>
                </div>
                
                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 mb-2">1000+</div>
                        <div className="text-gray-600">Active Donors</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                        <div className="text-gray-600">Partner Hospitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 mb-2">5000+</div>
                        <div className="text-gray-600">Lives Saved</div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full">
                <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
    )
}

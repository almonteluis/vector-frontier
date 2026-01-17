import React from 'react';
import { useGameStore } from '../../store/gameStore';
import {
    Rocket,
    Brain,
    Wind,
    Zap,
    ChevronRight,
    Star,
    Trophy,
    Play
} from 'lucide-react';

const ClayCard = ({ children, className = '', hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
    <div className={`
        bg-white/90 backdrop-blur-xl rounded-3xl p-6
        shadow-[8px_8px_16px_0px_rgba(0,0,0,0.1),_-8px_-8px_16px_0px_rgba(255,255,255,0.8)]
        border border-white/40
        ${hover ? 'transition-transform duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_20px_0px_rgba(0,0,0,0.15),_-12px_-12px_20px_0px_rgba(255,255,255,0.9)]' : ''}
        ${className}
    `}>
        {children}
    </div>
);

const ClayButton = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary', className?: string }) => {
    const baseStyles = "relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-[#6C5DD3] text-white shadow-[6px_6px_12px_#5a4cb0,-6px_-6px_12px_#7e6df6]",
        secondary: "bg-white text-[#6C5DD3] shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export const LandingPage: React.FC = () => {
    const setScreen = useGameStore(s => s.setScreen);

    const handleStart = () => {
        setScreen('menu');
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] text-slate-800 font-sans overflow-x-hidden">
            {/* Background Blobs */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FFD166]/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#6C5DD3]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[400px] h-[400px] bg-[#4ECDC4]/20 rounded-full blur-[80px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#6C5DD3] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        V
                    </div>
                    <span className="text-2xl font-extrabold text-[#6C5DD3]">VectorVoyage</span>
                </div>
                <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                    <a href="#" className="hover:text-[#6C5DD3] transition-colors">Courses</a>
                    <a href="#" className="hover:text-[#6C5DD3] transition-colors">Methodology</a>
                    <a href="#" className="hover:text-[#6C5DD3] transition-colors">Pricing</a>
                </div>
                <ClayButton onClick={handleStart} variant="secondary" className="!px-6 !py-2 !text-base">
                    Log In
                </ClayButton>
            </nav>

            {/* Hero Section */}
            <header className="relative z-10 container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm text-[#6C5DD3] font-semibold text-sm mb-4">
                        🚀 The #1 Math Adventure for Kids
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-800">
                        Math is your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5DD3] to-[#FF6B6B]">
                            Superpower
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                        Forget boring textbooks. Command drones, build bridges, and program robots using real vector mathematics.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <ClayButton onClick={handleStart}>
                            Start Learning Free <ChevronRight size={20} />
                        </ClayButton>
                        <ClayButton onClick={handleStart} variant="secondary">
                            <Play size={20} fill="currentColor" /> Watch Trailer
                        </ClayButton>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                        <div className="flex -space-x-3">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-blue-100" />
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-pink-100" />
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Milo" alt="User" className="w-10 h-10 rounded-full border-2 border-white bg-green-100" />
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs">
                                +2k
                            </div>
                        </div>
                        <p>Join 2,000+ young explorers</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#6C5DD3] to-[#4ECDC4] rounded-[3rem] opacity-20 transform rotate-6 blur-2xl" />
                    <ClayCard className="relative overflow-hidden !p-0 bg-[#F8F9FE]">
                        <div className="bg-slate-900 p-4 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 text-center text-slate-400 text-xs font-mono">mission_control.exe</div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Mission</div>
                                    <div className="text-xl font-bold text-slate-800">Drone Navigation</div>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                                    Active
                                </div>
                            </div>
                            <div className="relative h-48 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                <Wind className="absolute top-4 right-4 text-blue-300 animate-pulse" size={24} />
                                <div className="relative z-10 flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-[#6C5DD3] rounded-xl flex items-center justify-center text-white shadow-lg animate-bounce">
                                        <Zap fill="currentColor" />
                                    </div>
                                    <div className="h-1 w-24 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-2/3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white/50 border-t border-slate-100 flex justify-between items-center">
                            <div className="text-sm font-medium text-slate-500">Vector Calculation...</div>
                            <div className="text-[#6C5DD3] font-bold font-mono">v = 12i + 5j</div>
                        </div>
                    </ClayCard>
                </div>
            </header>

            {/* Course Catalog */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-800 mb-4">Choose Your Path</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Master concepts one by one. Each module unlocks new powers and challenges.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Course 1 */}
                        <ClayCard className="group !p-0 overflow-hidden">
                            <div className="h-48 bg-[#6C5DD3] relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <Brain size={80} className="text-white/20 absolute -bottom-4 -right-4 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
                                    🎯
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Abstract Logic</h3>
                                <p className="text-slate-500 mb-6 line-clamp-2">
                                    The foundation of everything. Learn vector addition, subtraction, and magnitude.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star size={16} fill="currentColor" /> 4.9
                                    </div>
                                    <button className="font-bold text-[#6C5DD3] hover:underline" onClick={handleStart}>
                                        Start Module →
                                    </button>
                                </div>
                            </div>
                        </ClayCard>

                        {/* Course 2 */}
                        <ClayCard className="group !p-0 overflow-hidden">
                            <div className="h-48 bg-[#4ECDC4] relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <Wind size={80} className="text-white/20 absolute -bottom-4 -right-4 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
                                    🚁
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Drone Flight</h3>
                                <p className="text-slate-500 mb-6 line-clamp-2">
                                    Navigate through strong crosswinds. Calculate precise vectors to deliver packages.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star size={16} fill="currentColor" /> 4.8
                                    </div>
                                    <button className="font-bold text-[#4ECDC4] hover:underline" onClick={handleStart}>
                                        Start Module →
                                    </button>
                                </div>
                            </div>
                        </ClayCard>

                        {/* Course 3 */}
                        <ClayCard className="group !p-0 overflow-hidden">
                            <div className="h-48 bg-[#FF6B6B] relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <Rocket size={80} className="text-white/20 absolute -bottom-4 -right-4 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">
                                    🤖
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Robotics</h3>
                                <p className="text-slate-500 mb-6 line-clamp-2">
                                    Program robot arms with inverse kinematics. The ultimate test of your skills.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star size={16} fill="currentColor" /> 5.0
                                    </div>
                                    <button className="font-bold text-[#FF6B6B] hover:underline" onClick={handleStart}>
                                        Start Module →
                                    </button>
                                </div>
                            </div>
                        </ClayCard>
                    </div>
                </div>
            </section>

            {/* Tracking Demo */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-8">
                            <div className="inline-block p-3 rounded-2xl bg-orange-100 text-orange-600 mb-4">
                                <Trophy size={32} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-800">
                                Visualize Your Growth
                            </h2>
                            <p className="text-lg text-slate-500">
                                Watch your skills explode as you earn badges, collect stars, and level up your career rank.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="font-bold text-slate-700">Real-time Skill Tracking</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="font-bold text-slate-700">Unlockable Achievements</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="font-bold text-slate-700">Competitive Leaderboards</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <ClayCard className="bg-slate-900 border-slate-800 !p-8">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-slate-400 text-sm font-medium mb-1">Total XP</div>
                                        <div className="text-4xl font-black text-white">12,450</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-yellow-400 font-bold flex items-center gap-1">
                                            <Trophy size={16} /> Gold Tier
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                                            <span>Vector Proficiency</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                                            <span>Spatial Reasoning</span>
                                            <span>72%</span>
                                        </div>
                                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[72%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                                            <span>Physics Application</span>
                                            <span>94%</span>
                                        </div>
                                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[94%] bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </ClayCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-[#6C5DD3] text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Loved by Students</h2>
                        <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                            <Star fill="currentColor" />
                            <Star fill="currentColor" />
                            <Star fill="currentColor" />
                            <Star fill="currentColor" />
                            <Star fill="currentColor" />
                        </div>
                        <p className="text-white/80">4.9/5 Average Rating</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Alex M.",
                                role: "Grade 6 Student",
                                text: "I never understood vectors until I played this game. Flying the drones is so cool!",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                            },
                            {
                                name: "Sarah K.",
                                role: "Math Teacher",
                                text: "The best visual tool for teaching coordinate geometry I've ever used in my classroom.",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                            },
                            {
                                name: "James R.",
                                role: "Parent",
                                text: "My son plays this instead of Fortnite now. I couldn't be happier with his progress.",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white/50" />
                                    <div>
                                        <div className="font-bold">{t.name}</div>
                                        <div className="text-sm text-white/60">{t.role}</div>
                                    </div>
                                </div>
                                <p className="italic text-white/90">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#F0F2F5] relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ClayCard className="max-w-4xl mx-auto !p-16 relative overflow-hidden bg-gradient-to-br from-white to-purple-50">
                        <div className="absolute top-0 right-0 p-32 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
                            Ready to Launch?
                        </h2>
                        <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto">
                            Join thousands of students mastering mathematics through play today.
                        </p>
                        <ClayButton onClick={handleStart} className="!text-xl !px-12 !py-5 mx-auto">
                            Get Started Now
                        </ClayButton>
                        <p className="mt-6 text-sm text-slate-400">No credit card required • Free for schools</p>
                    </ClayCard>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-white text-slate-500 text-sm">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center text-slate-600 font-bold text-xs">
                            V
                        </div>
                        <span className="font-bold text-slate-700">VectorVoyage</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#6C5DD3]">Privacy</a>
                        <a href="#" className="hover:text-[#6C5DD3]">Terms</a>
                        <a href="#" className="hover:text-[#6C5DD3]">Contact</a>
                    </div>
                    <p>© 2026 Vector Voyage Education. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

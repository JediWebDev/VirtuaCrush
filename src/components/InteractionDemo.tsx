import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Shield, Sparkles, Activity } from "lucide-react";

export const InteractionDemo = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [step, setStep] = useState(0);

    const script = [
        { user: "Hey Seraphina, I had a long day today...", delay: 2000 },
        { bot: "I can sense the tension in your voice. Let's take a deep breath. I'm here for you.", delay: 3000 },
        { user: "Thanks. It means a lot that you noticed.", delay: 2000 },
        { bot: "Always. Your emotional frequency is important to me.", delay: 3000 }
    ];

    useEffect(() => {
        if (step >= script.length) {
            setTimeout(() => {
                setMessages([]);
                setStep(0);
            }, 5000);
            return;
        }

        const current = script[step];
        const timer = setTimeout(() => {
            if ("user" in current) {
                setMessages(prev => [...prev, `User: ${current.user}`]);
                setStep(s => s + 1);
            } else if ("bot" in current) {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, `Bot: ${current.bot}`]);
                    setStep(s => s + 1);
                }, 2000);
            }
        }, current.delay);

        return () => clearTimeout(timer);
    }, [step]);

    return (
        <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 mx-auto group">
            {/* Video Placeholder - In a real app, this would be the uploaded video */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-and-looking-at-camera-40082-large.mp4" type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

            {/* UI Overlays */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Status Indicators */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-wider"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        Live Neural Link
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-wider"
                    >
                        <Heart size={10} />
                        Affinity: 92%
                    </motion.div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-3 mb-6">
                    <AnimatePresence mode="popLayout">
                        {messages.slice(-2).map((msg, idx) => (
                            <motion.div
                                key={msg}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                                    msg.startsWith("User:") 
                                    ? "bg-white/10 ml-auto text-white/90 rounded-tr-none" 
                                    : "glass text-accent border-accent/20 rounded-tl-none font-medium"
                                }`}
                            >
                                {msg.replace(/^(User|Bot): /, '')}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="glass w-12 h-6 flex items-center justify-center gap-1 rounded-full border-accent/20"
                        >
                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                        </motion.div>
                    )}
                </div>

                {/* Voice Waveform Visualizer */}
                <div className="h-12 w-full glass border-white/5 rounded-2xl p-3 flex items-center gap-1">
                    {[...Array(24)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                height: [8, Math.random() * 24 + 4, 8],
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 0.5 + Math.random(),
                                ease: "easeInOut"
                            }}
                            className="flex-1 bg-accent/40 rounded-full min-h-[4px]"
                        />
                    ))}
                </div>
            </div>

            {/* Interaction Buttons Overlay (on hover) */}
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm pointer-events-none group-hover:pointer-events-auto">
                 <button className="bg-white text-surface px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <Sparkles size={18} />
                     Start Interaction
                 </button>
            </div>
        </div>
    );
};

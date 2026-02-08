import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMember } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { actions, isLoading } = useMember();

  const handleAuth = () => {
    actions.login();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding */}
            <motion.div
              className="bg-primary rounded-3xl p-12 lg:p-16 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
                <div className="relative w-full h-full">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-16 bg-secondary origin-bottom"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6">
                  Welcome to Neural
                </h1>
                <p className="font-paragraph text-xl text-primary-foreground mb-8 leading-relaxed">
                  Join thousands of thinkers exploring ideas in a revolutionary spatial environment. Your journey into connected thinking begins here.
                </p>
                
                <div className="space-y-4">
                  {['Unlimited Mindmaps', 'Real-time Collaboration', 'AI-Powered Insights', 'Cross-Platform Sync'].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="font-paragraph text-lg text-primary-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              className="bg-surfacealt rounded-3xl p-12 lg:p-16"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Toggle Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setIsSignIn(true)}
                  className={`flex-1 font-paragraph text-lg py-3 rounded-2xl transition-all duration-300 ${
                    isSignIn
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-background text-foreground hover:bg-background/80'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignIn(false)}
                  className={`flex-1 font-paragraph text-lg py-3 rounded-2xl transition-all duration-300 ${
                    !isSignIn
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-background text-foreground hover:bg-background/80'
                  }`}
                >
                  Register
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSignIn ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                      Welcome Back
                    </h2>
                    <p className="font-paragraph text-base text-foreground/70 mb-8">
                      Continue your exploration of interconnected ideas
                    </p>

                    <button
                      onClick={handleAuth}
                      disabled={isLoading}
                      className="w-full bg-primary text-primary-foreground font-paragraph text-lg py-4 rounded-2xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner />
                          <span>Signing In...</span>
                        </>
                      ) : (
                        'Sign In with Wix'
                      )}
                    </button>

                    <p className="font-paragraph text-sm text-foreground/60 text-center mt-6">
                      Secure authentication powered by Wix Members
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
                      Create Account
                    </h2>
                    <p className="font-paragraph text-base text-foreground/70 mb-8">
                      Start building your neural network of ideas today
                    </p>

                    <button
                      onClick={handleAuth}
                      disabled={isLoading}
                      className="w-full bg-secondary text-secondary-foreground font-paragraph text-lg py-4 rounded-2xl hover:bg-secondary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        'Register with Wix'
                      )}
                    </button>

                    <p className="font-paragraph text-sm text-foreground/60 text-center mt-6">
                      By registering, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-foreground/10">
                <p className="font-paragraph text-sm text-foreground/60 text-center">
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsSignIn(!isSignIn)}
                    className="text-secondary hover:underline"
                  >
                    {isSignIn ? 'Register here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

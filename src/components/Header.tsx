import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMember } from '@/integrations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, member } = useMember();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#intro', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-secondary rounded-full opacity-20 blur-md" />
              <div className="absolute inset-0 bg-secondary rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary rounded-full" />
              </div>
            </div>
            <span className="font-heading text-2xl text-foreground">Neural</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-paragraph text-base text-foreground hover:text-secondary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-secondary text-secondary-foreground font-paragraph text-base px-4 py-2 rounded-full hover:bg-secondary/90 transition-colors duration-300"
              >
                <User className="w-4 h-4" />
                {member?.profile?.nickname || 'Profile'}
              </Link>
            ) : (
              <Link
                to="/auth"
                className="bg-secondary text-secondary-foreground font-paragraph text-base px-6 py-2 rounded-full hover:bg-secondary/90 transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-paragraph text-lg text-foreground hover:text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-paragraph text-lg text-foreground hover:text-secondary transition-colors duration-300"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-paragraph text-lg text-foreground hover:text-secondary transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

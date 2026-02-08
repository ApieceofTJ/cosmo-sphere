import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary py-16 px-6">
      <div className="max-w-[100rem] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-secondary rounded-full opacity-20 blur-md" />
                <div className="absolute inset-0 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary-foreground rounded-full" />
                </div>
              </div>
              <span className="font-heading text-2xl text-primary-foreground">Neural</span>
            </div>
            <p className="font-paragraph text-base text-primary-foreground/80 leading-relaxed">
              Transforming the way you visualize and connect ideas in a dynamic digital space.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-heading text-xl text-secondary mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading text-xl text-secondary mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-heading text-xl text-secondary mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/" className="font-paragraph text-base text-primary-foreground/80 hover:text-secondary transition-colors duration-300">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              © {currentYear} Neural Mindmap. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/" className="font-paragraph text-sm text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/" className="font-paragraph text-sm text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

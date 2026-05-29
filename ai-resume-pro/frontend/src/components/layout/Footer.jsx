import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-card rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-bold text-text-primary">
                AI Resume <span className="text-primary-600">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Land more interviews with AI-optimized resumes tailored to every job application.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">Pricing</a></li>
              <li><Link to="/signup" className="text-sm text-text-secondary hover:text-primary-600 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-text-secondary">About</span></li>
              <li><span className="text-sm text-text-secondary">Blog</span></li>
              <li><span className="text-sm text-text-secondary">Careers</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-text-secondary">Privacy Policy</span></li>
              <li><span className="text-sm text-text-secondary">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} AI Resume Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
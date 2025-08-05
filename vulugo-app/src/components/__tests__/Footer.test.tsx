import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the company name and logo', () => {
    render(<Footer />);
    
    expect(screen.getByText('VuluGO')).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
  });

  it('renders the current year in copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} VuluGO. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders the technology stack information', () => {
    render(<Footer />);
    
    expect(screen.getByText('Built with Next.js and Tailwind CSS')).toBeInTheDocument();
  });

  it('has correct link attributes', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByText('Privacy Policy');
    const termsLink = screen.getByText('Terms of Service');
    const contactLink = screen.getByText('Contact Us');
    
    expect(privacyLink).toHaveAttribute('href', '/privacy');
    expect(termsLink).toHaveAttribute('href', '/terms');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
}); 
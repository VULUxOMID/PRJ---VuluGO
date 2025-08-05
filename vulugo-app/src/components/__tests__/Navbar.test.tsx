import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Navbar', () => {
  it('renders the logo and company name', () => {
    render(<Navbar />);
    
    expect(screen.getByText('VuluGO')).toBeInTheDocument();
    expect(screen.getByText('V')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    // Menu should be closed initially
    expect(screen.queryByText('Home')).toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Menu should now be open (mobile links should be visible)
    expect(screen.getAllByText('Home')).toHaveLength(2); // Desktop + mobile
    
    // Click to close menu
    fireEvent.click(menuButton);
    
    // Menu should be closed again
    expect(screen.getAllByText('Home')).toHaveLength(1); // Only desktop
  });

  it('has mobile menu button', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    // Button should be clickable
    fireEvent.click(menuButton);
    expect(menuButton).toBeInTheDocument();
  });
}); 
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Footer from '../src/app/components/Footer/Footer';

// Mock dependencies
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe('Footer Component', () => {
  it('renders navigation links', () => {
    render(<Footer />);

    // Verify navigation links
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Whitepaper')).toBeTruthy();
    expect(screen.getByText('FAQs')).toBeTruthy();
    expect(screen.getByText('About us')).toBeTruthy();
    expect(screen.getByText('MarketPlace')).toBeTruthy();
    expect(screen.getByText('News')).toBeTruthy();
    expect(screen.getByText('Our teams')).toBeTruthy();
    expect(screen.getByText('Roadmap')).toBeTruthy();
    expect(screen.getByText('Community')).toBeTruthy();
  });

  it('renders contact information', () => {
    render(<Footer />);

    // Verify contact details
    expect(screen.getByAltText('phone contact')).toBeTruthy();
    expect(screen.getByText('012345678910')).toBeTruthy();
    expect(screen.getByAltText('email contact')).toBeTruthy();
    expect(screen.getByText('Tymex-talent@tyme.com')).toBeTruthy();
  });

  it('renders subscription form', () => {
    render(<Footer />);

    // Verify subscription form elements
    expect(screen.getByPlaceholderText('Your email address')).toBeTruthy();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeTruthy();
  });

  it('renders footer background image', () => {
    render(<Footer />);

    // Verify the background image
    expect(screen.getByAltText('footer background')).toBeTruthy();
  });

  it('renders copyright and legal links', () => {
    render(<Footer />);

    // Verify copyright text
    expect(
      screen.getByText('©2023 Tyme - Edit. All Rights reserved.')
    ).toBeTruthy();

    // Verify legal links
    expect(screen.getByText('Security')).toBeTruthy();
    expect(screen.getByText('Legal')).toBeTruthy();
    expect(screen.getByText('Privacy')).toBeTruthy();
  });
});

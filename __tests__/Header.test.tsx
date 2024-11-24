import { render, screen } from '@testing-library/react';
// import { describe, it, vi, expect } from 'vitest';
import Header from '../src/app/components/Header/Header';

// Mock dependencies
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

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('Header Component', () => {
  it('renders navigation links', () => {
    render(<Header />);

    // Check navigation links
    const homeLink = screen.getByText('HOME');
    const aboutUsLink = screen.getByText('ABOUT US');
    const ourTeamLink = screen.getByText('OUR TEAM');

    expect(homeLink).toBeDefined();
    expect(homeLink.tagName).toBe('A');

    expect(aboutUsLink).toBeDefined();
    expect(ourTeamLink).toBeDefined();
  });

  it('renders Connect Wallet button', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /connect wallet/i });

    expect(button).toBeDefined();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders language dropdown', () => {
    render(<Header />);
    const langIcon = screen.getByAltText('lang');

    expect(langIcon).toBeDefined();
    expect(langIcon.tagName).toBe('IMG');
  });

  it('renders the banner image', () => {
    render(<Header />);
    const bannerImage = screen.getByAltText('new arrival');

    expect(bannerImage).toBeDefined();
    expect(bannerImage.tagName).toBe('IMG');
  });

  it('renders The DJ section', () => {
    render(<Header />);
    const djImage = screen.getByAltText('the Dj');
    const djText = screen.getByText('THE DJ');

    expect(djImage).toBeDefined();
    expect(djImage.tagName).toBe('IMG');
    expect(djText).toBeDefined();
  });

  it('renders NFT new arrivals', () => {
    render(<Header />);

    // Check individual NFT items by alt text
    const nftAssasin = screen.getByAltText('nft assasin');
    const nftNeonGuy = screen.getByAltText('nft neon guy');
    const nftMafiaEngland = screen.getByAltText('nft mafia england');
    const nftBasketballGirl = screen.getByAltText('nft basketball girl');

    expect(nftAssasin).toBeDefined();
    expect(nftAssasin.tagName).toBe('IMG');

    expect(nftNeonGuy).toBeDefined();
    expect(nftMafiaEngland).toBeDefined();
    expect(nftBasketballGirl).toBeDefined();
  });
});

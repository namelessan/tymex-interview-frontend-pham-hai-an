'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Image from 'next/image';
import globeIcon from '../../../../public/icons/globe.svg';
import newArrival from '../../../../public/images/new_arrival.png';
import theDj from '../../../../public/images/nft/na_the_dj.png';
import nftAssasin from '../../../../public/images/nft/na_assasin.png';
import nftNeonGuy from '../../../../public/images/nft/na_neon_guy.png';
import nftMafiaEngland from '../../../../public/images/nft/na_mafia_england.png';
import nftBasketballGirl from '../../../../public/images/nft/na_basketball_girl.png';
import thDjFrame from '../../../../public/images/the_dj_frame.png';

export default function Header() {
  const navbar = [
    {
      key: 'home',
      label: <Link href={'/'}>HOME</Link>,
      name: 'HOME',
      path: '/',
    },
    {
      key: 'aboutUs',
      label: <Link href={'#'}>ABOUT US</Link>,
      name: 'ABOUT US',
      path: '#',
    },
    {
      key: 'ourTeam',
      label: <Link href={'#'}>OUR TEAM</Link>,
      name: 'OUR TEAM',
      path: '#',
    },
    {
      key: 'marketplace',
      label: <Link href={'#'}>MARKETPLACE</Link>,
      name: 'MARKETPLACE',
      path: '#',
    },
    {
      key: 'roadmap',
      label: <Link href={'#'}>ROAD MAP</Link>,
      name: 'ROAD MAP',
      path: '#',
    },
    {
      key: 'whitepaper',
      label: <Link href={'#'}>WHITE PAPER</Link>,
      name: 'WHITE PAPER',
      path: '#',
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'English',
    },
    {
      key: '2',
      label: 'Tiếng Việt',
    },
  ];

  const newArrivals = [
    {
      id: 1,
      src: nftAssasin,
      alt: 'nft assasin',
    },
    {
      id: 2,
      src: nftNeonGuy,
      alt: 'nft neon guy',
    },
    {
      id: 3,
      src: nftMafiaEngland,
      alt: 'nft mafia england',
    },
    {
      id: 4,
      src: nftBasketballGirl,
      alt: 'nft basketball girl',
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerOverlay}></div>
      <div className={styles.headerContainer}>
        <div className={styles.headerTop}>
          <Dropdown menu={{ items: navbar }} className={styles.navbarMobile}>
            <a>
              <MenuUnfoldOutlined />
            </a>
          </Dropdown>
          <nav className={styles.navbar}>
            {navbar.map((item) => (
              <Link key={item.key} href={item.path} className={styles.navItem}>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className={styles.buttons}>
            <Button type="primary">Connect Wallet</Button>
            <Dropdown menu={{ items }}>
              <a className={styles.language}>
                <Space>
                  <Image
                    src={globeIcon}
                    alt="lang"
                    width={16}
                    height={16}
                  ></Image>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>

        <div className={styles.bannerText}>
          <Image
            src={newArrival}
            className={styles.newArrival}
            alt="new arrival"
          ></Image>
        </div>

        <div className={styles.theDjPositioner}>
          <div className={styles.theDjContainer}>
            <Image src={theDj} className={styles.theDj} alt="the Dj"></Image>
            <div className={styles.theDjFrame}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Image src={thDjFrame} alt="the Dj"></Image>
                <div className={styles.theDjName}>THE DJ</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.nftContainer}>
            {newArrivals.map((nft) => (
              <div key={nft.id} className={styles.nftItem}>
                <Image
                  src={nft.src}
                  alt={nft.alt}
                  className={styles.nftImage}
                ></Image>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

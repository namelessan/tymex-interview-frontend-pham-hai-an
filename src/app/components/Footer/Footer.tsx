import Image from 'next/image';
import styles from './footer.module.scss';
import footerTopBg from '../../../../public/images/footer_top.png';
import { Divider, Input, Button } from 'antd';
import Link from 'next/link';
import phoneIcon from '../../../../public/icons/phone_icon.svg';
import messageIcon from '../../../../public/icons/message_icon.svg';

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerTop}>
        <Image src={footerTopBg} alt="footer background"></Image>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerInfo}>
          <nav className={styles.footerNavigation}>
            <h1 className={styles.navigationTitle}>Navigation</h1>
            <div className={styles.navRow}>
              <div className={styles.navCol}>
                <Link href={'/'}>Home</Link>
              </div>
              <div className={styles.navCol}>
                <Link href={'#'}>Whitepaper</Link>
              </div>
              <div className={styles.navCol}>
                <Link href={'#'}>FAQs</Link>
              </div>
            </div>
            <div className={styles.navRow}>
              <div className={styles.navCol}>
                <Link href={'#'}>About us</Link>
              </div>
              <div className={styles.navCol}>
                <Link href={'#'}>MarketPlace</Link>
              </div>
              <div className={styles.navCol}>
                <Link href={'#'}>News</Link>
              </div>
            </div>
            <div className={styles.navRow}>
              <div className={styles.navCol}>
                <Link href={'#'}>Our teams</Link>
              </div>

              <div className={styles.navCol}>
                <Link href={'#'}>Roadmap</Link>
              </div>
              <div className={styles.navCol}>
                <Link href={'#'}>Community</Link>
              </div>
            </div>
          </nav>
          <div className={styles.footerContact}>
            <h1 className={styles.contactTitle}>Contact us</h1>
            <div className={styles.contactRow}>
              <Image src={phoneIcon} alt="phone contact"></Image>
              <span className={styles.contactText}>012345678910</span>
            </div>
            <div className={styles.contactRow}>
              <Image src={messageIcon} alt="email contact"></Image>
              <span className={styles.contactText}>Tymex-talent@tyme.com</span>
            </div>
          </div>
          <div className={styles.footerSubscribe}>
            <h1 className={styles.subscribeTitle}>
              Subscribe to receive our latest update
            </h1>
            <div className={styles.subscribeForm}>
              <Input placeholder="Your email address"></Input>
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </div>
        <Divider></Divider>
        <div className={styles.copyright}>
          <div className={styles.copyrightLeft}>
            ©2023 Tyme - Edit. All Rights reserved.
          </div>
          <div className={styles.copyrightRight}>
            <Link href={'#'}>Security</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

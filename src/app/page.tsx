'use client';

import NFT from './components/NFT/NFT';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './page.module.scss';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header></Header>
      <Suspense>
        <NFT></NFT>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}

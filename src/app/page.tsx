import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header></Header>
      <main className={styles.main}></main>
      <Footer></Footer>
    </div>
  );
}

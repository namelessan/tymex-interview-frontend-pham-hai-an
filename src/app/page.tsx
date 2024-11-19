import Header from './components/Header/Header';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

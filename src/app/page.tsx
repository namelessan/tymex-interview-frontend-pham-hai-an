'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Filter from './components/Filter/Filter';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import styles from './page.module.scss';
import FilterButtons from './components/FilterButtons/FilterButtons';
import NFTCard, { NFTCardSkeleton } from './components/NFTCard/NFTCard';
import { useSearchParams } from 'next/navigation';
import { generateParams, getQuery } from './helper';
import { Button } from 'antd';

interface IState {
  products: IProduct[];
  page: number;
}

export default function Home() {
  const url = `https://tymex-fake-server-namelessans-projects.vercel.app/products`;

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<IState>({
    products: [] as IProduct[],
    page: 1,
  });
  const searchParams = useSearchParams();

  const nftListRef = useRef(null);

  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    const query = getQuery(searchParams.toString());
    const queryStr = generateParams(query);

    try {
      const response = await fetch(
        `${url}?_page=${page}&_limit=20&${queryStr}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch Product data');
      }

      let data: IProduct[] = await response.json();
      setState((prevState) => ({
        ...prevState,
        products: [...prevState.products, ...data],
      }));
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const refreshProducts = useCallback(() => {
    setState({ products: [], page: 1 });
    fetchProducts(1);
  }, [fetchProducts]);

  const fetchMoreProducts = useCallback(async () => {
    const newPage = state.page + 1;
    setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
    fetchProducts(newPage);
    if (nftListRef.current) {
      const nftList = nftListRef.current as HTMLDivElement;
      nftList.scrollTo(0, nftList.scrollHeight);
    }
  }, [fetchProducts, nftListRef]);

  useEffect(() => {
    refreshProducts();
  }, [searchParams]);

  useEffect(() => {
    console.log('changed state', { state });
  }, [state]);

  return (
    <div className={styles.page}>
      <Header></Header>
      <main className={styles.main}>
        <div className={styles.mainLeft}>
          <Filter></Filter>
        </div>
        <div className={styles.mainRight}>
          <div className={styles.filterButtons}>
            <FilterButtons></FilterButtons>
          </div>
          <div className={styles.nftCards}>
            <div className={styles.row} ref={nftListRef}>
              {state.products.map((p) => (
                <div key={p.id} className={styles.col}>
                  <NFTCard product={p}></NFTCard>
                </div>
              ))}
              {loading
                ? Array.from(Array(5)).map((key) => (
                    <div key={key} className={styles.col}>
                      <NFTCardSkeleton></NFTCardSkeleton>
                    </div>
                  ))
                : []}
            </div>
          </div>
          <div className={styles.nftMore}>
            <Button type="primary" onClick={fetchMoreProducts}>
              View More
            </Button>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

import styles from './filterButtons.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getQuery } from '@/app/helper';
import queryString from 'query-string';
import { useMemo, useState } from 'react';
import arrowUpIcon from '../../../../public/icons/arrow_up.svg';
import Image from 'next/image';

const FilterButtons = function FilterButtons() {
  const filterGroup = [
    { value: 'All', label: 'All' },
    { value: 'Upper Body', label: 'Upper Body' },
    { value: 'Lower Body', label: 'Lower Body' },
    { value: 'Hat', label: 'Hat' },
    { value: 'Shoes', label: 'Shoes' },
    { value: 'Accessory', label: 'Accessory' },
    { value: 'Legendary', label: 'Legendary' },
    { value: 'Mythic', label: 'Mythic' },
    { value: 'Epic', label: 'Epic' },
    { value: 'Rare', label: 'Rare' },
  ];
  const [expanded, setExpanded] = useState(false);

  const searchParams = useSearchParams();
  const query = getQuery(searchParams.toString());
  const path = usePathname();
  const router = useRouter();

  const [category, setCategory] = useState('All');

  useMemo(() => {
    if (query.category) {
      setCategory(query.category as string);
    }
  }, []);

  const onClickButton = (option: (typeof filterGroup)[number]) => {
    setCategory(option.value);
    const queryStr = queryString.stringify({
      ...query,
      category: option.value === 'All' ? undefined : option.value,
    });
    const url = `${path}?${queryStr}`;
    router.push(url, { scroll: false });
  };

  const conClickFilterMore = () => {
    const newVal = !expanded;
    setExpanded(newVal);
  };

  return (
    <div>
      <div
        className={
          expanded
            ? `${styles.filterButtonGroup} ${styles.expanded}`
            : styles.filterButtonGroup
        }
      >
        {filterGroup.map((opt) => (
          <span
            key={opt.value}
            onClick={() => onClickButton(opt)}
            className={`${styles.btnFilter} ${
              category === opt.value ? styles.active : ''
            }`}
          >
            {opt.label}
          </span>
        ))}
      </div>
      <span
        className={
          expanded
            ? `${styles.filterMore} ${styles.expanded}`
            : styles.filterMore
        }
        onClick={conClickFilterMore}
      >
        <Image src={arrowUpIcon} alt="filter more"></Image>
      </span>
    </div>
  );
};

export default FilterButtons;

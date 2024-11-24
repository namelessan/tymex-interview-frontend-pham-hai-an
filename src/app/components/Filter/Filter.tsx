import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Slider } from 'antd';
import styles from './filter.module.scss';
import Image from 'next/image';
import closeIcon from '../../../../public/icons/close.svg';
import { useMemo, useRef, useState } from 'react';
import queryString from 'query-string';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FilterOutlined } from '@ant-design/icons';
import { debounce, getQuery } from '@/app/helper';

export default function Filter() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const [open, setOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const searchStrRef = useRef(searchStr);

  const defaultValue = {
    price: [0, 200],
    tier: 'all',
    theme: 'Light',
    timeSort: 'createdAt',
    priceSort: 'price',
  };

  const searchParams = useSearchParams();
  const query = getQuery(searchParams.toString());
  const path = usePathname();

  const onSubmit = () => {
    const filterForm = form.getFieldsValue();
    const { timeSort, priceSort } = filterForm;

    const newQuery = {
      title_like: searchStrRef.current || undefined,
      price_gte: filterForm.price[0],
      price_lte: filterForm.price[1],
      tier: filterForm.tier === 'all' ? undefined : filterForm.tier,
      theme: filterForm.theme,
      sort: `${timeSort},${priceSort}`,
    };

    const queryStr = queryString.stringify({
      ...query,
      ...newQuery,
    });

    const url = `${path}?${queryStr}`;
    console.trace('onSubmit new query', url);
    router.push(url, { scroll: false });
  };

  const debounceSubmit = debounce(onSubmit, 1000);

  const tierOptions = [
    { value: 'all', label: 'All' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Deluxe', label: 'Deluxe' },
    { value: 'Basic', label: 'Basic' },
  ];

  const themeOptions = [
    { value: 'Dark', label: 'Dark' },
    { value: 'Light', label: 'Light' },
    { value: 'Halloween', label: 'Halloween' },
    { value: 'Colorful', label: 'Colorful' },
  ];

  const timeOptions = [
    { value: 'createdAt', label: 'Latest' },
    { value: '-createdAt', label: 'Oldest' },
  ];

  const priceOptions = [
    { value: 'price', label: 'Low to High' },
    { value: '-price', label: 'High to Low' },
  ];

  const generateInitialFilterValue = () => {
    const query = getQuery(searchParams.toString());
    const sortGroup = ((query.sort as string) || '').split(',');
    setSearchStr((query.title_like as string) || '');
    return {
      price: [
        Number(query.price_gte) || defaultValue.price[0],
        Number(query.price_lte) || defaultValue.price[1],
      ],
      tier: (query.tier as string) || defaultValue.tier,
      theme: (query.theme as string) || defaultValue.theme,
      timeSort:
        sortGroup.find((s: string) => s.includes('createdAt')) ||
        defaultValue.timeSort,
      priceSort:
        sortGroup.find((s: string) => s.includes('price')) ||
        defaultValue.priceSort,
    };
  };

  const initialValues = useMemo(() => generateInitialFilterValue(), []);
  const onChangeSearchStr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Update state and ref simultaneously
    setSearchStr(newValue);
    searchStrRef.current = newValue;

    debounceSubmit();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className={styles.btnFilterModal}
      >
        <FilterOutlined />
      </Button>
      <Modal
        style={{ top: 10 }}
        open={open}
        title=""
        okText="Search"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        footer={null}
      >
        <div className={styles.filterContainerModal}>
          <div className={styles.search}>
            <Input
              value={searchStr}
              prefix={
                <SearchOutlined style={{ color: 'rgba(255,255,255,.25)' }} />
              }
              placeholder="Quick search"
              onChange={onChangeSearchStr}
            ></Input>
          </div>

          <Form
            form={form}
            name="filterFormModal"
            initialValues={initialValues}
            layout="vertical"
            className={styles.filterForm}
          >
            <Form.Item label="Price" name="price">
              <Slider
                tooltip={{ formatter: (value) => `${value} ETH` }}
                range
                max={200}
                marks={{ 0: '0 ETH', 200: '200 ETH' }}
              />
            </Form.Item>
            <Form.Item label="Tier" name="tier">
              <Select options={tierOptions}></Select>
            </Form.Item>
            <Form.Item label="Theme" name="theme">
              <Select options={themeOptions}></Select>
            </Form.Item>
            <Form.Item label="Time" name="timeSort">
              <Select options={timeOptions}></Select>
            </Form.Item>
            <Form.Item label="Price" name="priceSort">
              <Select options={priceOptions}></Select>
            </Form.Item>
            <Form.Item>
              <div className={styles.formBottom}>
                <button className={styles.btnReset} onClick={onReset}>
                  <Image src={closeIcon} alt="close"></Image>
                  Reset filter
                </button>
                <Button
                  type="primary"
                  className={styles.btnSubmit}
                  onClick={onSubmit}
                >
                  Search
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className={styles.filterContainer}>
        <div className={styles.search}>
          <Input
            value={searchStr}
            prefix={
              <SearchOutlined style={{ color: 'rgba(255,255,255,.25)' }} />
            }
            placeholder="Quick search"
            onChange={onChangeSearchStr}
          ></Input>
        </div>

        <Form
          form={form}
          name="filterForm"
          initialValues={initialValues}
          layout="vertical"
          className={styles.filterForm}
        >
          <Form.Item label="Price" name="price">
            <Slider
              tooltip={{ formatter: (value) => `${value} ETH` }}
              range
              max={200}
              marks={{ 0: '0 ETH', 200: '200 ETH' }}
            />
          </Form.Item>
          <Form.Item label="Tier" name="tier">
            <Select options={tierOptions}></Select>
          </Form.Item>
          <Form.Item label="Theme" name="theme">
            <Select options={themeOptions}></Select>
          </Form.Item>
          <Form.Item label="Time" name="timeSort">
            <Select options={timeOptions}></Select>
          </Form.Item>
          <Form.Item label="Price" name="priceSort">
            <Select options={priceOptions}></Select>
          </Form.Item>
          <Form.Item>
            <div className={styles.formBottom}>
              <button className={styles.btnReset} onClick={onReset}>
                <Image src={closeIcon} alt="close"></Image>
                Reset filter
              </button>
              <Button
                type="primary"
                className={styles.btnSubmit}
                onClick={onSubmit}
              >
                Search
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

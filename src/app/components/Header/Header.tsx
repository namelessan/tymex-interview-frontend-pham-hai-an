import Link from 'next/link';
import styles from './header.module.scss';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';

export default function Header() {
  const navbar = [
    {
      id: 'home',
      name: 'HOME',
      path: '/',
    },
    {
      id: 'aboutUs',
      name: 'ABOUT US',
      path: '#',
    },
    {
      id: 'ourTeam',
      name: 'OUR TEAM',
      path: '#',
    },
    {
      id: 'marketplace',
      name: 'MARKETPLACE',
      path: '#',
    },
    {
      id: 'roadmap',
      name: 'ROAD MAP',
      path: '#',
    },
    {
      id: 'whitepaper',
      name: 'WHITE PAPER',
      path: '#',
    },
  ];

  // const items: MenuProps['items'] = [
  //   { key: '1', label: 'English' },
  //   { key: '2', label: 'Tiếng Việt' },
  // ];
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'English',
    },
    {
      key: '2',
      label: 'Tiếng Việt',
      // extra: '⌘P',
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <nav className={styles.navbar}>
          {navbar.map((item) => (
            <Link key={item.id} href={item.path} className={styles.navItem}>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className={styles.buttons}>
          <Button>Connect Wallet</Button>
          <Dropdown menu={{ items }}>
            <a>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    switch (pathname) {
      case '/account/post':
        setTitle('Add Post');
        break;
      case '/account/stats':
        setTitle('Stats');
        break;
      default:
        setTitle('My Account');
        break;
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;

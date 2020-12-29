import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import useMedia from '../../Hooks/useMedia';
import { useLocation } from 'react-router-dom';

import { ReactComponent as FeedSvg } from '../../Assets/feed.svg';
import { ReactComponent as PostSvg } from '../../Assets/adicionar.svg';
import { ReactComponent as StatsSvg } from '../../Assets/estatisticas.svg';
import { ReactComponent as LogoutSvg } from '../../Assets/sair.svg';

import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia('(max-width:40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end activeClassName={styles.active}>
          <FeedSvg />
          {mobile && 'Feed'}
        </NavLink>
        <NavLink to="/account/post" activeClassName={styles.active}>
          <PostSvg />
          {mobile && 'Post Photo'}
        </NavLink>
        <NavLink to="/account/stats" activeClassName={styles.active}>
          <StatsSvg />
          {mobile && 'Stats'}
        </NavLink>
        <button onClick={() => userLogout()}>
          <LogoutSvg />
          {mobile && 'Logout'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;

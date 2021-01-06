import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as LogoSvg } from '../Assets/dogs-footer.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LogoSvg />
      <p>Dogs. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

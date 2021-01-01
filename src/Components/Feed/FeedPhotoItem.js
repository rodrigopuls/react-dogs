import React from 'react';
import styles from './FeedPhotoItem.module.css';
import Image from '../Helpers/Image';

const FeedPhotoItem = ({ item, setModalPhotoItem }) => {
  function handleClick() {
    setModalPhotoItem(item);
  }

  return (
    <li className={styles.item}>
      <Image src={item.src} alt={item.title} onClick={handleClick} />
      <span className={styles.views}>{item.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;

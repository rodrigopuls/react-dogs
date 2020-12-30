import React from 'react';
import styles from './FeedPhotoItem.module.css';

const FeedPhotoItem = ({ item, setModalPhotoItem }) => {
  function handleClick() {
    setModalPhotoItem(item);
  }

  return (
    <li className={styles.item}>
      <img src={item.src} alt={item.title} onClick={handleClick} />
      <span className={styles.views}>{item.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;

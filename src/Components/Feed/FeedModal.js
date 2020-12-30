import React from 'react';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { PHOTO_GET } from '../../ApiHelper';
import styles from './FeedModal.module.css';

const FeedModal = ({ item, setModalPhotoItem }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(item.id);
      const { json } = await request(url, options);
    }

    fetchPhoto();
  }, [item, request]);

  function handleOutsideClick(event) {
    // event.target is the clicked element
    // event.currentTarget is always the modal div

    if (event.target === event.currentTarget) setModalPhotoItem(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

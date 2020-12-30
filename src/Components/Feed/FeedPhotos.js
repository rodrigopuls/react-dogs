import React from 'react';
import FeedPhotoItem from './FeedPhotoItem';
import useFetch from '../../Hooks/useFetch';
import Error from '../../Components/Helpers/Error';
import Loading from '../../Components/Helpers/Loading';
import { PHOTOS_GET } from '../../ApiHelper';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ setModalPhotoItem }) => {
  const { data, loading, error, request } = useFetch();
  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const { json } = await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((item) => (
          <FeedPhotoItem
            key={item.id}
            item={item}
            setModalPhotoItem={setModalPhotoItem}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;

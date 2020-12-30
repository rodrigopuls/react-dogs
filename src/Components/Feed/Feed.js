import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = () => {
  const [modalPhotoItem, setModalPhotoItem] = React.useState(null);

  return (
    <div>
      {modalPhotoItem && (
        <FeedModal
          item={modalPhotoItem}
          setModalPhotoItem={setModalPhotoItem}
        />
      )}
      <FeedPhotos setModalPhotoItem={setModalPhotoItem} />
    </div>
  );
};

export default Feed;

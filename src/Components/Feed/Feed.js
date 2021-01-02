import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ userId }) => {
  const [modalPhotoItem, setModalPhotoItem] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infiniteScroll, setInfiniteScroll] = React.useState(true);

  React.useEffect(() => {
    let wait = false;

    function loadMoreItems() {
      if (infiniteScroll) {
        const scrolledY = window.scrollY;
        const scrollSize = document.body.offsetHeight - window.innerHeight;

        // Page was scrolled more than 75%?
        if (scrolledY > scrollSize * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);

          // Disable multiple changes
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', loadMoreItems);
    window.addEventListener('scroll', loadMoreItems);

    return () => {
      window.removeEventListener('wheel', loadMoreItems);
      window.removeEventListener('scroll', loadMoreItems);
    };
  }, [infiniteScroll, pages]);

  return (
    <div>
      {modalPhotoItem && (
        <FeedModal
          item={modalPhotoItem}
          setModalPhotoItem={setModalPhotoItem}
        />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          userId={userId}
          page={page}
          itemsPerPage="6"
          setModalPhotoItem={setModalPhotoItem}
          setInfiniteScroll={setInfiniteScroll}
        />
      ))}
    </div>
  );
};

export default Feed;

import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ items, openModal }) => (
  <ul className={styles.imageGallery}>
    {items.map(({ id, smallImg, largeImg, descr }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        img={smallImg}
        alt={descr}
        largeImg={largeImg}
        onImgClick={openModal}
      />
    ))}
  </ul>
);

export default ImageGallery;


ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
  PropTypes.shape({
  id: PropTypes.number.isRequired,
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  };
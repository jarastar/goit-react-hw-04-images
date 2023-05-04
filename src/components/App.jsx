import React, { useState, useEffect } from 'react';
import searchImages from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import LargeImage from './LargeImage/LargeImage';
import Loader from './Loader/Loader';
import styles from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setIsLoading(true);
          const response = await searchImages(search, page);

          const data = response.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            smallImg: webformatURL,
            largeImg: largeImageURL,
            descr: tags,
          }));

          const totalImgs = response.totalHits;

          setImages(prevImages => [...prevImages, ...data]);
          setTotal(totalImgs);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = search => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setError(null);
    setTotal(null);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalOpen = data => {
    setLargeImage(data);
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearchImages} />
      {search && <ImageGallery items={images} openModal={onModalOpen} />}
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {images.length < total && !isLoading && (
        <div className={styles.buttonWrap}>
          <Button clickHandler={onLoadMore} />
        </div>
      )}
      {showModal && (
        <Modal closeModal={onModalClose}>
          <LargeImage {...largeImage} />
        </Modal>
      )}
    </div>
  );
};

export default App;

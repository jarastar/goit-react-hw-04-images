import axios from 'axios';

const API_KEY = '34864216-4fa8cf27ab1b277ad0c21156c';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const searchImages = async (q, page) => {
  const response = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return response.data;
};

export default searchImages;
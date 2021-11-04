const BASE_URL = 'https://pixabay.com/api';
const API_URL = '24155040-09394a9154ec72d89d619259b';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPhotos() {
    return fetch(
      `${BASE_URL}/?key=${API_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${this.page}`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

import './sass/main.scss';
import PixabayApiService from './apiService';
import hitsTemp from './templates/hitsTemp.hbs';
import LoadMoreBtn from './loadMoreBtn';
const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery'),
  // loadMore: document.querySelector('[data-action="load-more"]'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pixabayApiService = new PixabayApiService();

console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearHitsContainer();
  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query === '' || pixabayApiService.query === 'Space') {
    return error({
      text: 'Enter text!',
      delay: 300,
    });
  }
  loadMoreBtn.show();
  loadMoreBtn.disable();
  pixabayApiService.resetPage();
  pixabayApiService.fetchPhotos().then(appendHitsMarkup);
  loadMoreBtn.enable();
}
function onLoadMore() {
  loadMoreBtn.disable();
  pixabayApiService.fetchPhotos().then(appendHitsMarkup);
  loadMoreBtn.enable();
}
function fetchHits() {}
function appendHitsMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', hitsTemp(hits));
}
function clearHitsContainer() {
  refs.galleryList.innerHTML = '';
}

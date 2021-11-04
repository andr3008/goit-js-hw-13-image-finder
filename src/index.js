import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

import './sass/main.scss';
import PixabayApiService from './apiService';
import hitsTemp from './templates/hitsTemp.hbs';
// import LoadMoreBtn from './loadMoreBtn';
const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.gallery'),
  loadMore: document.querySelector('[data-action="load-more"]'),
};
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const pixabayApiService = new PixabayApiService();

// console.log(loadMoreBtn);
// refs.searchForm.addEventListener('submit', scrollInto);
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
// refs.scroll.addEventListener('click', scrollInto);
refs.loadMore.style.display = 'none';
function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query === '') {
    return error({
      text: 'Enter text!',
      delay: 300,
    });
  }

  clearHitsContainer();
  pixabayApiService.resetPage();
  pixabayApiService.fetchPhotos().then(appendHitsMarkup);
}
function onLoadMore() {
  pixabayApiService.fetchPhotos().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.loadMore.style.display = 'block';
  refs.galleryList.insertAdjacentHTML('beforeend', hitsTemp(hits));
  scrollInto();
}
function clearHitsContainer() {
  refs.galleryList.innerHTML = '';
}
function scrollInto() {
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

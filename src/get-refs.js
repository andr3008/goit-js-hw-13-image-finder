export default function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    loadMore: document.querySelector('[data-action="load-more"]'),
  };
}

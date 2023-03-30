// import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imageMarkup } from './js/imageMarkup';
import { baseURL, API_KEY } from './js/Pixabay';


const refs = {
    form: document.querySelector('.search__form'),
    searhInput: document.querySelector('.search__form-input'),
    searhBtn: document.querySelector('.search__form-button'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),  
};

const notifyInit = {
  width: '300px',
  position: 'center-top',
  borderRadius: '15px',
  timeout: 2000,
  fontSize: '16px',
  cssAnimationDuration: 600,
  cssAnimationStyle: 'from-top',
};

// "Sorry, there are no images matching your search query. Please try again.";
// "We're sorry, but you've reached the end of search results.";
// "Hooray! We found ${totalHits} images.";

refs.loadMoreBtn.style.visibility = 'hidden';

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  // heightRatio: 0.85,
});

refs.form.addEventListener('submit', onSubmitBtnClick);
refs.form.addEventListener('click', onLoadMoreBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();

  const query = document.querySelector('input').value.trim();
  const URL = `${baseURL}?key=${API_KEY}&q=${query}&image_type=photo&orientation='horizontal'&safesearch=true`;

  refs.gallery.innerHTML = '';

  fetch(URL)
  .then(response => response.json())
  .then((data) => {
    const imageMarkupResult = imageMarkup(data.hits)
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);
  })
  .catch((error) => console.error(error));
};

function onLoadMoreBtnClick(event) {

};
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imageMarkup } from './js/imageMarkup';
import { Pixabay } from './js/Pixabay';


const refs = {
    form: document.querySelector('.search__form'),
    searhInput: document.querySelector('.search__form-input'),
    searhBtn: document.querySelector('.search__form-button'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),  
};

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  // heightRatio: 0.85,
});

imageMarkup();

Notiflix.Notify.init({
    width: '300px',
    position: 'center-top',
    borderRadius: '15px',
    timeout: 2000,
    fontSize: '16px',
    cssAnimationDuration: 600,
    cssAnimationStyle: 'from-top',
  });

//   "Sorry, there are no images matching your search query. Please try again."
// "We're sorry, but you've reached the end of search results."
// "Hooray! We found totalHits images."

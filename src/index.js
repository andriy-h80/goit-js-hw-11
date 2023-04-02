
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imageMarkup } from './js/imageMarkup';
import { Pixabay } from './js/Pixabay';

const DEBOUNCE_DELAY = 300;
const refs = {
  form: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__form-input'),
  searchBtn: document.querySelector('.search__form-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'), 
  body: document.querySelector('body'),  
};

const pixaby = new Pixabay();

const notifyInit = {
  width: '300px',
  position: 'right-top',
  borderRadius: '15px',
  timeout: 2000,
  fontSize: '16px',
  cssAnimationDuration: 600,
  cssAnimationStyle: 'from-top',
};

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.loadMoreBtn.classList.add('is-hidden');

const loadMoreImages = async function (entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      pixaby.incrementPage();

      try {
        const { hits } = await pixaby.getImages();
        const imageMarkupResult = imageMarkup(hits);
        refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);
        
        if (!pixaby.hasMoreImages) {
          const lastImage = document.querySelector('.gallery a:last-child');
          observer.observe(lastImage);
        } else {
          Notify.info("We're sorry, but you've reached the end of search results.", notifyInit);
          refs.loadMoreBtn.classList.add('is-hidden');
        };
    
          lightboxGallery.refresh();
          refs.loadMoreBtn.classList.remove('is-hidden');
        scrolling();
      } catch (error) {
        Notify.failure(error.message, 'Something went wrong!', notifyInit);
      }
    }
 });
};

const observer = new IntersectionObserver(loadMoreImages, { threshold: 1, rootMargin: '300px' });

const onSubmitBtnClick = async event => {
  event.preventDefault();

  const query = document.querySelector('input').value.trim().toLowerCase();
  
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add('is-hidden');
  pixaby.resetPage();
  
  if (!query) {
    Notify.info('Enter data to search!', notifyInit);
  
    refs.searchInput.placeholder = 'Please enter what images are you looking for?';
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  };

  pixaby.query = query;

  try {
    const { hits, total } = await pixaby.getImages();

    if (hits.length === 0) {
      Notify.failure(`Sorry, there are no images matching your ${query}. Please try again.`, notifyInit);

      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }

    const imageMarkupResult = imageMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);

    pixaby.totalPages(total);
    Notify.success(`Hooray! We found ${total} images.`, notifyInit);

    if (pixaby.shouldMoreImages) {
      const lastImage = document.querySelector('.gallery a:last-child');
      observer.observe(lastImage);
    }

    lightboxGallery.refresh();
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!', notifyInit);
  };

};

const onLoadMoreBtnClick = async () => {
  pixaby.incrementPage();

  try {
    const { hits } = await pixaby.getImages();
    const imageMarkupResult = imageMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);
    lightboxGallery.refresh();
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!', notifyInit);
  }; 

  if (!pixaby.hasMoreImages) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.", notifyInit);
  }

 };

refs.form.addEventListener('submit', onSubmitBtnClick);
refs.loadMoreBtn.addEventListener('click', debounce(onLoadMoreBtnClick, DEBOUNCE_DELAY));

// Плавне прокручування
function scrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Нескінченний скрол

import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imageMarkup } from './js/imageMarkup';
import { Pixabay } from './js/Pixabay';

const refs = {
  form: document.querySelector('.search__form'),
  searchInput: document.querySelector('.search__form-input'),
  searchBtn: document.querySelector('.search__form-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'), 
    
};

const pixaby = new Pixabay();

const notifyInit = {
  width: '300px',
  position: 'center-top',
  borderRadius: '15px',
  timeout: 2000,
  fontSize: '16px',
  cssAnimationDuration: 600,
  cssAnimationStyle: 'from-top',
};

// "We're sorry, but you've reached the end of search results.";


let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  // heightRatio: 0.85,
});

refs.loadMoreBtn.style.visibility = 'hidden';

refs.form.addEventListener('submit', onSubmitBtnClick);
refs.form.addEventListener('click', onLoadMoreBtnClick);

async function onSubmitBtnClick(event) {
  event.preventDefault();

  const query = document.querySelector('input').value.trim().toLowerCase();
  
  refs.gallery.innerHTML = '';

  if (!query) {
    Notify.info('Enter data to search!', notifyInit);

    refs.searchInput.placeholder = 'What are you looking for?';
    return;
  };

  pixaby.query = query;

  try {
    const { hits, totalHits } = await pixaby.getImages();

    if (hits.length === 0) {
      Notify.failure(`Sorry, there are no images matching your ${query}. Please try again.`, notifyInit);

      return;
    }

    const imageMarkupResult = imageMarkup(hits);
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);

    pixaby.totalPages(totalHits);
    Notify.success(`Hooray! We found ${totalHits} images.`, notifyInit);

    lightboxGallery.refresh();
    refs.loadMoreBtn.style.visibility = 'visible';
  } catch (error) {
    console.error(error);
  };

};

async function onLoadMoreBtnClick() {
  // refs.loadMoreBtn.style.visibility = 'hidden';

  // try {
  //   const { hits, totalHits } = await pixaby.getImages();

  //   const imageMarkupResult = imageMarkup(hits);
  //   refs.gallery.insertAdjacentHTML('beforeend', imageMarkupResult);

  //   lightboxGallery.refresh();
  //   refs.loadMoreBtn.style.visibility = 'visible';
  // } catch (error) {
  //   console.error(error);
  // };

};


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

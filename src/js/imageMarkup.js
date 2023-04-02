
export function imageMarkup(images) {

    return images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__item" href="${largeImageURL}" rel='noreferrer noopener nofollow'>
            <div class="gallery__card">    
                <img class="gallery__card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info__item">
                        <b>Likes: </b>${likes}
                    </p>
                    <p class="info__item">
                        <b>Views: </b>${views}
                    </p>
                    <p class="info__item">
                        <b>Comments: </b>${comments}
                    </p>
                    <p class="info__item">
                        <b>Downloads: </b>${downloads}
                    </p>
                </div>
            </div>
        </a>`;
        }
    ).join('');

};

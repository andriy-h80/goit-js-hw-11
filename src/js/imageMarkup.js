
function imageMarkup(result) {

    const imageMarkup = result.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
            <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>${likes}</b>
                </p>
                <p class="info-item">
                    <b>${views}</b>
                </p>
                <p class="info-item">
                    <b>${comments}</b>
                </p>
                <p class="info-item">
                    <b>${downloads}</b>
                </p>
            </div>
        </div>`;
    }).join('');
    refs.gallery.innerHTML = imageMarkup;
    return imageMarkup;

};

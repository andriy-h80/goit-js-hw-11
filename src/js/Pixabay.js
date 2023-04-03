import axios from 'axios';

const API_KEY = '34772509-2b3ff3d3039847d74197d09be';
const baseURL = 'https://pixabay.com/api/';

export class Pixabay {
    #page = 1;
    #per_page = 40;
    #query = '';
    #totalPages = 0;

    async getImages() {
        const params = {
            key: API_KEY,
            page: this.#page,
            q: this.#query,
            per_page: this.#per_page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }

        const { data } = await axios.get(baseURL, { params });
        return data;
    }

    get query() {
       this.#query;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }

    incrementPage() {
        this.#page += 1;
    }

    resetPage() {
        this.#page = 1;
    }

    totalPages(total) {
        this.#totalPages = total;
    }

    hasMoreImages() {
        return Math.ceil(this.#totalPages / this.#per_page) === this.#page || this.#totalPages < this.#per_page;
    }
}

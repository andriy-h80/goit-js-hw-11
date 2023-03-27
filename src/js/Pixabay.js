import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34772509-2b3ff3d3039847d74197d09be';

// var API_KEY = '34772509-2b3ff3d3039847d74197d09be';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });


// key - твій унікальний ключ доступу до API.
// q - термін для пошуку. Те, що буде вводити користувач.
// image_type = photo;
// orientation = 'horizontal';
// safesearch = true;
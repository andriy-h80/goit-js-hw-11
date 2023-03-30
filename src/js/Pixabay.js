import axios from 'axios';

export const API_KEY = '34772509-2b3ff3d3039847d74197d09be';


export const baseURL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';


// export const instance = axios.create({
//     baseURL: 'https://pixabay.com/api/',
// });

// export function getAllImages() {
//     return instance.get('images');
// };

///////////////////////////////////
// const fetchFriends = async () => {
//     const token = await fetch("my-api.com/me");
//     const user = await fetch(`my-api.com/profile?token=${token}`);
//     const friends = await fetch(`my-api.com/users/${user.id}/friends`);
//     return friends;
//   };
  
// fetchFriends()
//     .then(friends => console.log(friends))
//     .catch(error => console.error(error));
////////////////////////////////////
// const fetchUsers = async () => {
//     try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/users");
//       const users = await response.json();
//       console.log(users);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  
//   fetchUsers();
////////////////////////////////////


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
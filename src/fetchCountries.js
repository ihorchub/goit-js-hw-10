import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearMarkup, dataProcessing } from './dataProcessing';

const endpoint = 'https://restcountries.com/v3.1/name/';
const param = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  fetch(`${endpoint}${name}?${param}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(dataProcessing)
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name', {
        width: '500px',
        fontSize: '20px',
      });
      clearMarkup();
    });
}

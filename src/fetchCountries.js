import { Notify } from 'notiflix/build/notiflix-notify-aio';

const endpoint = 'https://restcountries.com/v3.1/name/';
const param = 'fields=name,capital,population,flags,languages';

export const countryList = document.querySelector('.country-list');
export const countryInfo = document.querySelector('.country-info');

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
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    });
}

function dataProcessing(data) {
  if (data.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        width: '500px',
        fontSize: '20px',
      }
    );
  } else if (data.length >= 2) {
    countryInfo.innerHTML = '';
    const markup = data
      .map(
        ({ flags, name }) =>
          `<li class='list'><img src='${flags.svg}' alt='flag ${name.official}' width='60'/><h3>${name.official}</h3></li>`
      )
      .join('');
    countryList.innerHTML = markup;
  } else if (data.length === 1) {
    countryList.innerHTML = '';
    const { capital, flags, languages, name, population } = data[0];
    countryInfo.innerHTML = `<div class='country-name'>
        <img src="${flags.svg}" alt='flag of ${name.official}' width='200'>
        <h2>${name.official}</h2></div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages).join(', ')}</p>`;
  } else if (data.length === 0) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
}

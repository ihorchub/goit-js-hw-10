import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function clearMarckup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function createMarkupCountryList(data) {
  countryList.innerHTML = data
    .map(
      ({ flags, name }) =>
        `<li class='list'><img src='${flags.svg}' alt='flag ${name.official}' width='60'/><h3>${name.official}</h3></li>`
    )
    .join('');
}

function createMarkupselectedCountry(data) {
  const { capital, flags, languages, name, population } = data[0];
  countryInfo.innerHTML = `<div class='country-name'>
        <img src="${flags.svg}" alt='flag of ${name.official}' width='200'>
        <h2>${name.official}</h2></div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages).join(', ')}</p>`;
}

export function dataProcessing(data) {
  if (data.length > 10) {
    clearMarkup();
    return Notify.info(
      'Too many matches found. Please enter a more specific name.',
      { width: '500px', fontSize: '20px' }
    );
  } else if (data.length >= 2) {
    countryInfo.innerHTML = '';
    createMarkupCountryList(data);
  } else if (data.length === 1) {
    countryList.innerHTML = '';
    createMarkupselectedCountry(data);
  } else if (data.length === 0) {
    clearMarkup();
  }
}

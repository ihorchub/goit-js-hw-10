import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { clearMarkup } from './dataProcessing';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector('#search-box');

inputCountryName.addEventListener(
  'input',
  debounce(handlerInput, DEBOUNCE_DELAY)
);

function handlerInput(evt) {
  const countryName = evt.target.value.trim();
  if (countryName === '') {
    clearMarkup();
    return;
  }
  fetchCountries(countryName);
}

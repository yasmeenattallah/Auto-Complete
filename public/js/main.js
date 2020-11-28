/* eslint-disable no-undef */
const input = document.querySelector('.search-bar');
const suggestion = document.querySelector('.search-suggestion');

function deleteChild() {
  let first = suggestion.firstChild;
  while (first) {
    first.remove();
    first = suggestion.firstChild;
  }
}

function renderDom(data) {
  deleteChild();
  data.forEach((country) => {
    const name = document.createElement('p');
    name.textContent = country.name;
    suggestion.appendChild(name);
  });
}

input.addEventListener('input', (e) => {
  deleteChild();
  searchValue = e.target.value.trim();
  if (searchValue) {
    fetch('POST', '/search', searchValue, renderDom);
  }
});

const result = document.getElementById('result');
const filter = document.getElementById('filter');
let listItems = [];

// Fetch and display data
async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();
    
    result.innerHTML = '';
    results.forEach(user => {
        const li = document.createElement('li');
        listItems.push(li);

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;

        result.appendChild(li);
    });
}

// Filter and highlight data
function filterData(searchTerm) {
    listItems.forEach(item => {
        const name = item.querySelector('h4').innerText.toLowerCase();
        const location = item.querySelector('p').innerText.toLowerCase();
        const searchValue = searchTerm.toLowerCase();

        if (name.includes(searchValue) || location.includes(searchValue)) {
            item.classList.remove('hide');
            highlightText(item, searchValue);
        } else {
            item.classList.add('hide');
        }
    });
}

// Highlight matching text
function highlightText(item, searchValue) {
    const nameElement = item.querySelector('h4');
    const locationElement = item.querySelector('p');

    nameElement.innerHTML = highlightMatch(nameElement.innerText, searchValue);
    locationElement.innerHTML = highlightMatch(locationElement.innerText, searchValue);
}

function highlightMatch(text, searchValue) {
    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

getData();
filter.addEventListener('input', (e) => filterData(e.target.value));

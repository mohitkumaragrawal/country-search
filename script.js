const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const inputBox = document.querySelector(".search-box-input");
const suggestionsBox = document.querySelector(".search-box-suggestions");

let suggestions = [];
function filterSuggestion() {
  const val = inputBox.value;

  if (val == "") {
    return;
  }
  suggestions = [];
  countries.forEach((el) => {
    if (el.toLowerCase().startsWith(val.toLowerCase())) {
      suggestions.push(el);
    }
  });
}

function createSuggestionElement(text) {
  if (text == "") {
    let el = document.createElement("div");
    el.innerHTML = `No such country exist`;
    el.classList.add("search-box-suggestion");
    return el;
  }

  let el = document.createElement("div");
  boldText = text.substr(0, inputBox.value.length);
  normalText = text.substr(inputBox.value.length);
  el.innerHTML = `<span class="bold-text">${boldText}</span>${normalText}`;
  el.classList.add("search-box-suggestion");
  el.onclick = (e) => {
    console.log("pressed");
    inputBox.value = text;
    filterSuggestion();
  };

  return el;
}

function populateSuggestion() {
  suggestionsBox.innerHTML = "";

  filterSuggestion();

  if (suggestions.length == 0) {
    const el = createSuggestionElement("");
    suggestionsBox.appendChild(el);
    return;
  }

  suggestions.forEach((text) => {
    const el = createSuggestionElement(text);
    suggestionsBox.appendChild(el);
  });
}

inputBox.onfocus = (e) => {
  if (inputBox.value == "") return;
  suggestionsBox.classList.remove("hidden");
};

inputBox.onblur = (e) => {
  suggestionsBox.classList.add("hidden");
};

inputBox.onkeyup = (e) => {
  const isEmpty = inputBox.value == "";
  if (isEmpty) {
    suggestionsBox.classList.add("hidden");
  } else {
    suggestionsBox.classList.remove("hidden");
  }

  populateSuggestion();
};

inputBox.onkeydown = (e) => {
  if (e.key == "Tab" && suggestions.length > 0) {
    e.preventDefault();
    inputBox.value = suggestions[0];

    populateSuggestion();
  }

  if (e.key == "Enter" && suggestions.length > 0) {
    e.preventDefault();
    const country = suggestions[0];
    const newLocation = `https://www.google.com/search?q=${encodeURI(country)}`;
    window.location = newLocation;
  }
};

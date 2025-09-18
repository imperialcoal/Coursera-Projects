function showweatherDetails(event) {
    event.preventDefault();

    const city = document.getElementById('city').value.trim();
    const stateAbbr = document.getElementById('state').value;
    const weatherInfo = document.getElementById('weatherInfo');

    // Check for empty fields (HTML is already requiring these fields but keeping this code here as an option)
    if (!city || !stateAbbr) {
        weatherInfo.innerHTML = `<p style="color:red;">Please enter a city and select a state.</p>`;
        return; // stop here, don’t call API
    }

    const country = 'US';
    const units = 'imperial'; // change to 'metric' for Celsius    
    const apiKey = 'YOUR_API_KEY'; // Replace with personal API key for functionality

    // Map state abbreviations to full state names
    const states = {
        "AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California",
        "CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia",
        "HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas",
        "KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts",
        "MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana",
        "NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico",
        "NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma",
        "OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina",
        "SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont",
        "VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"
    };

    const fullState = states[stateAbbr.toUpperCase()]; // Convert abbreviation to full name

    if (!fullState) {
        weatherInfo.innerHTML = `<p style="color:red;">Invalid state selected.</p>`;
        return;
    }

    // Validate city+state with Geocoding API
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},${country}&limit=1&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {
            if (!geoData || geoData.length === 0) {
                throw new Error(`No city named "${city}" found in ${fullState}.`);
            }

            // Strictly filter results by full state name (case-insensitive)
            const match = geoData.find(loc => loc.state && loc.state.toLowerCase() === fullState.toLowerCase());

            if (!match) {
                throw new Error(`"${city}" does not exist in ${fullState}.`);
            }

            const { lat, lon, name } = match;

            // Fetch weather with lat/lon
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

            return fetch(weatherUrl).then(response => response.json());
        })
        .then(data => {
            const unitSymbol = units === "imperial" ? "°F" : "°C";

            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name}, ${fullState}</h2>
                <p>Temperature: ${data.main.temp} ${unitSymbol}</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}      

// Attach event listener AFTER defining function
document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
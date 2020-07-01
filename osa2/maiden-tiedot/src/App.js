import React, {useState, useEffect} from 'react';
import axios from 'axios'
import CountryList from './components/CountryList';


const App = () => {

  const [countries, setCountries] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('use effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        
      })
  }, [])
  console.log(countries)

  const handleChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }


const DisplayButton = (props) => {
  return (
    <div>
      <button onClick={(() =>
      setSearchTerm(props.country.name))}>show</button>
    </div>
  )
}

  const ShowCountries = () => {
    

    if ( searchTerm ) {
        console.log('searching...')
        const countriesToShow = countries.filter( country => country.name.toLowerCase().includes(searchTerm.toLowerCase()) )
        console.log(countriesToShow)

        if(countriesToShow.length === 0) {
            return (
                <div></div>
            )
        }
    
        if (countriesToShow.length === 1) {

          let country = countriesToShow[0]

          const languages = () => country.languages.map( language =>
          <li key={language.iso639_1}>{language.name}</li>)

          return (
            <div>
                <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            </div>
    
            <div>
                <h3>languages</h3>
                <ul>
                    {languages()}
                </ul>
    
                <img src={country.flag} width="200px" alt="flag"></img>
            </div>
            </div>
        )

           
        }
    
        if (countriesToShow.length > 10) {
            return (
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            )
        }

        if (countriesToShow.length > 1 && countriesToShow.length < 11) {
          const rows = () => countriesToShow.map(country => 
            <li key={country.name}>
                {country.name}
                <DisplayButton country={country} />
                
            </li>
          )

            return (
              <ul>
              {rows()}
              </ul>

            )      
        }
    }

    return (
        <div>
            <p></p>
        </div>
    )
}

  

  return (
    <div>
      <p>find countries</p>
      <input value={searchTerm} onChange={handleChange} ></input>
      <ShowCountries />
      


    
    </div>
  );
}

export default App; 
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filter from './Filter'

export default function MyCountries() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchCountries = async () => {
    const res = await fetch(`https://restcountries.com/v2/all`)
    const data = await res.json()
    setCountries(data)
    console.log(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredCountries)
    } else {
      setFiltered(countries)
    }
  }

  return (
    <>
      {isLoading ? (
        <h1 className='flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold'>
          Loading...
        </h1>
      ) : (
        <>
          <div className='pt-8'>
            <Filter
              searchCountries={searchCountries}
              searchInput={searchInput}
              setCountries={setCountries}
            />
          </div>
          {searchInput.length > 0 ? (
            <section className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto'>
              {filtered.map(
                ({ flag, name, population, region, capital}) => (
                  <Link to={`/${capital}`} key={name}>
                    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300'>
                      <img
                        className='object-cover h-48 w-96 mb-2'
                        src={flag}
                        alt=''
                      />
                      <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>
                          {' '}
                          {name}
                        </div>
                      </div>
                      <div className='px-6 pb-2'>
                        <ul className='pb-8'>
                          <li className='dark:text-white text-gray-900'>
                          <b>Population:</b>
                                {population.toLocaleString('en')}
                          </li>
                          <li className='dark:text-white text-gray-900'>
                            <b>Region: </b> {region}
                          </li>
                          <li className='dark:text-white text-gray-900'>
                            <b>Capital: </b> {capital}
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </section>
          ) : (
            <section className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:container 2xl:mx-auto'>
              {countries.map(
                ({ flag, name, population, region, capital }) => (
                  <Link to={`/${capital}`} key={name}>
                    <div className='max-w-sm max-h-md rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100 transition-all duration-300'>
                      <img
                        className='object-cover h-48 w-96 mb-2'
                        src={flag}
                        alt=''
                      />
                      <div className='px-6 py-4'>
                        <div className='font-bold text-xl mb-2'>
                          {name}
                        </div>
                      </div>
                      <div className='px-6 pb-2'>
                        <ul className='pb-8'>
                          <li className='dark:text-white text-gray-900'>
                          <b>Population:</b>
                                {population.toLocaleString('en')}
                          </li>
                          <li className='dark:text-white text-gray-900'>
                            <b>Region: </b> {region}
                          </li>
                          <li className='dark:text-white text-gray-900'>
                            <b>Capital: </b> {capital}
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </section>
          )}
        </>
      )}
    </>
  )
}

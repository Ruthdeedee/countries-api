import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Country() {
  const [country, setCountry] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { capital } = useParams()

  useEffect(() => {
    const fetchCountryData = async () => {
      const res = await fetch(`https://restcountries.com/v2/capital/${capital}`)
      const data = await res.json()
      setCountry(data)
      setIsLoading(false)
    }

    fetchCountryData()
  }, [capital])

  return (
    <>
      {isLoading ? (
        <h1 className='flex items-center justify-center h-screen text-4xl uppercase tracking-widest text-gray-900 dark:text-white lg:text-7xl font-bold'>
          Loading...
        </h1>
      ) : (
        <section className='pt-32 xl:max-w-7xl xl:mx-auto px-5 xl:px-0 h-screen'>
          <Link
            to='/'
            className='bg-blue-500 pt-2 pb-3 pl-4 pr-6 rounded shadow text-white font-bold tracking-wide animate-pulse'
          >
            &larr; Back
          </Link>
          {country.map(
            ({
              flag,
              name,
              capital,
              region,
              subregion,
              population,
              nativeName,
              topLevelDomain,
              currencies,
              languages,
              borders,
            }) => (
              <article key={name}>
                <div className='flex mb-4 mt-16'>
                  <div className='w-1/2 h-full'>
                    <img
                      className='object-cover px-16 mb-2 max-w-96 max-h-80'
                      src={flag}
                      alt=''
                    />
                  </div>
                  <div className='w-1/2 h-full'>
                    <div className='flex flex-col ...'>
                      <div className='w1/3 px-6 py-4'>
                        <div className='font-bold text-3xl mb-2'>
                          <h2>{name}</h2>
                        </div>
                      </div>
                      <div className='1/3'>
                        <div className='flex '>
                          <div className='flex-1 text-gray-700 px-4 py-2 m-2'>
                            <ul>
                              <li className='dark:text-white text-gray-900'>
                                <b>Native Name: </b> {nativeName}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Population:</b>
                                {population.toLocaleString('en')}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Region: </b> {region}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Sub Region:</b> {subregion}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Capital: </b> {capital}
                              </li>
                            </ul>
                          </div>
                          <div className='flex-1 text-gray-700 px-4 py-2 m-2'>
                            <ul>
                              <li className='dark:text-white text-gray-900'>
                                <b>Top Level Domain: </b> {topLevelDomain}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Currencies:</b>{' '}
                                {currencies.map(({ name }) => name).join(', ')}
                              </li>
                              <li className='dark:text-white text-gray-900'>
                                <b>Languages: </b>{' '}
                                {languages.map(({ name }) => name).join(', ')}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='1/3'>
                        <div className='flex items-center'>
                          <div className='flex-initial text-gray-700 px-4 py-2 m-2'>
                            <b>Border Countries:</b>
                          </div>
                          {borders.map((border, index) => (
                            <div
                              key={index}
                              className='flex border-2 h-8 text-gray-700 items-center rounded shadow-md px-4 m-2'
                            >
                              {border}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </section>
      )}
    </>
  )
}

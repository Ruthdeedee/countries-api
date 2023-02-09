export default function Filter({ searchCountries, searchInput, setCountries }) {
  
  const regions = [

    {name:'Filter by Region'},
    {
      name: 'Africa',
    },
    {
      name: 'Asia',
    },
    {
      name: 'Americas',
    },
    {
      name: 'Europe',
    },
    {
      name: 'Oceania',
    },
  ]

  const fetchCountryByRegion = async (region) => {
    try {
      const res = await fetch(`https://restcountries.com/v2/region/${region}`)
      const data = await res.json()
      setCountries(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

const handleSubmitByRegion =(e)=>{
  e.preventDefault()
  fetchCountryByRegion()
}



  return (
    <>
      <div className='flex items-start justify-between flex-col md:flex-row md:items-center md:justify-between 2xl:container 2xl:mx-auto'>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for a country'
          value={searchInput}
          onChange={(e) => searchCountries(e.target.value)}
          className='py-2 px-4 rounded shadow placeholder-gray-900 ml-5 lg:w-1/2'
          autoComplete='off'
        />
        <form onSubmit={handleSubmitByRegion}>
        <select
          name='select'
          id='select'
          className='py-2 px-4 rounded shadow ml-5 md:mr-5 md:ml-0'
          value={regions.name}
          onChange={(e) => fetchCountryByRegion(e.target.value)}
        >
          {regions.map((region, index) =>(
            <option key={index} value={region.name}>
              {region.name}
              {console.log(region.name)}
            </option>
          ))}
        </select>
        </form>
      </div>
    </>
  )
}

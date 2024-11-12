const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  const {
    name: { common: countryName },
    capital: [capitalCity],
    population,
    flags: { svg: flagUrl },
  } = country
  return (
    <div>
      <h3>{countryName}</h3>
      <div>capital: {capitalCity}</div>
      <div>population: {population}</div>
      <img src={flagUrl} height="100" alt={`flag of ${countryName}`} />
    </div>
  )
}

export default Country

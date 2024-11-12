import { useEffect, useState } from "react"
import axios from "axios"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        response.status === 200
          ? setCountry({ found: true, ...response.data[0] })
          : setCountry({ found: false })
      })
      .catch((error) => {
        setCountry({ found: false })
        // console.log(error.response.data.message)
      })
  }, [name])

  return country
}

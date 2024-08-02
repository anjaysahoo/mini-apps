import {useEffect, useState} from 'react'
import './App.css'
import TableComponent from './components/table/table.component'

function App() {
  const [countries, setCountries] = useState([{
    name: 'Afghanistan',
    region: 'Asia',
    subregion: 'Southern Asia',
    population: 27657145,
    capital: ['Kabul']
  }])

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    console.log("Data : ", data);
    setCountries(data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
        <TableComponent  />
    </>
  )
}

export default App

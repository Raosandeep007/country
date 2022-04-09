import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Style.css";
export const Country = () => {
  const [countries, setCountry] = useState([]);
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searched] = useState(["name"]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json"
      )
      .then(function (response) {
        setCountry(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlesearch = (countries) => {
    return countries.filter((country) =>
      searched.some(
        (newcountry) =>
          country[newcountry]
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1
      )
    );
  };
  const handleclick = () => {
    let a = handlesearch(countries);
    setData(a);
  };
  const handleChange = (e) => {
    setIsLoading(true);

    switch (e.target.value) {
      case "Africa":
        setData([...countries].filter((country) => country.region == "Africa"));
        break;
      case "Americas":
        setData(
          [...countries].filter((country) => country.region == "Americas")
        );
        break;
      case "Asia":
        setData([...countries].filter((country) => country.region == "Asia"));
        break;
      case "Europe":
        setData([...countries].filter((country) => country.region == "Europe"));
        break;
      case "Oceania":
        setData(
          [...countries].filter((country) => country.region == "Oceania")
        );
        break;
      default:
        setData(countries);
        break;
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <div>Loading............</div>
  ) : (
    <div>
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        className="custom-select"
        aria-label="Filter Countries By Region"
      >
        <option value="All">Filter By Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <input
        className="search-input"
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      <button className="search-button" onClick={handleclick}>
        Search
      </button>
      <div className="container">
        {data.length > 0
          ? data.map((country, i) => {
              return (
                <div key={i} className={`country-list-${country.id}`} id="list">
                  <img src={country.flag} alt="" id="country_img" />
                  <div id="textdiv">
                    <h3>{country.name}</h3>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital}</p>
                  </div>
                </div>
              );
            })
          : countries.map((country, i) => {
              return (
                <div key={i} className={`country-list-${country.id}`} id="list">
                  <img src={country.flag} alt="" id="country_img" />
                  <div id="textdiv">
                    <h3>{country.name}</h3>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>Capital: {country.capital}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

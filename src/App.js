import React, { useState, useEffect } from "react";
import axios from "axios";

/* phonebook exercise */

const PersonDisplay = (props) => {
  return <li>{props.name + " " + props.number}</li>;
};

const App = () => {
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);

    setFilteredResults(
      persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    );
    console.log(filteredResults);
  };

  useEffect(() => {
    console.log("Starting effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [filteredResults, setFilteredResults] = useState([]);

  const [newSearch, setNewSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((element) => element.name === newName)) {
      setPersons(persons.concat(personObject));
      console.log(
        "Added new contact: " + personObject.name + "|" + personObject.number
      );
    } else {
      alert("Contact already exists");
    }

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      Search:
      <input onChange={handleSearchChange} type="text" id="searchInput" />
      <br />
      <form>
        <div>
          name: <input onChange={handleNameChange} type="text" id="nameInput" />
          <br />
          number:
          <input onChange={handleNumberChange} type="text" id="numberInput" />
        </div>
        <div>
          <button onClick={addPerson} type="submit">
            add
          </button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <PersonDisplay name={person.name} number={person.number} />
        ))}
      </ul>
      <ul>
        <h2>Filtered Results</h2>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(newSearch.toLowerCase())
          )
          .map((filteredPerson) => (
            <PersonDisplay
              name={filteredPerson.name}
              number={filteredPerson.number}
            />
          ))}
      </ul>
    </div>
  );
};

export default App;

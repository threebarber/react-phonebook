import React, { useState, useEffect } from "react";


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

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [same, setSame] = useState(false);

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
          number:{" "}
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
        {filteredResults.map((filteredPerson) => (
          <PersonDisplay name={filteredPerson.name} number={filteredPerson.number} />
          ))}
      </ul>
    </div>
  );
};

export default App;
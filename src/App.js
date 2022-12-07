import React, { useState, useEffect } from "react";
import axios from "axios";
import comms from "./comms"

/* phonebook exercise */

const PersonDisplay = (props) => {
  return <div><li>{props.name + " " + props.number}</li><button onClick={props.onClick}>Delete</button></div>;
};

const UserInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input onChange={props.onChange} type="text" />
    </div>
  );
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
  };

  useEffect(() => {
    console.log("Starting effect");
    comms
    .getAll()
    .then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [newSearch, setNewSearch] = useState("");


  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (!persons.some((element) => element.name === newName)) {
      console.log(
        "Added new contact: " + personObject.name + "|" + personObject.number
      );

      comms
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })

    } else {
      alert("Contact already exists");
    }

    setNewName("");
  };

  const handleDel = (event, id) => {
    
    event.preventDefault();

    comms.deletePerson(id)
    const newArr = persons.filter(person => person.id !== id);
    setPersons(newArr);

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <UserInput label="Search" onChange={handleSearchChange} />
      <br />
      <form>
        <div>
          <UserInput label="Contact Name" onChange={handleNameChange} />
          <br />
          <UserInput label="Contact Number" onChange={handleNumberChange} />
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
          <PersonDisplay name={person.name} number={person.number} onClick={event => handleDel(event, person.id)} />
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
              onClick={event => handleDel(event, filteredPerson.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import comms from "./comms";

/* phonebook exercise */

const PersonDisplay = (props) => {
  return (
    <div>
      <li>{props.name + " " + props.number}</li>
      <button onClick={props.onClick}>Delete</button>
    </div>
  );
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
    setNewName(event.target.value.toLowerCase());
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
    comms.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [newSearch, setNewSearch] = useState("");

  const handleAddClick = (event) => {
    event.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    if (
      !persons.some(
        (element) => element.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      addPerson(newPersonObj);
    } else if (
      persons.some(
        (element) => element.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      console.log(
        "Found existing person - name: " +
          existingPerson.name +
          " id: " +
          existingPerson.id
      );
      updatePerson(existingPerson.id, newPersonObj);
    } else {
      console.log("something else?");
    }
  };

  const addPerson = (personObject) => {
    console.log("adding new person");
    comms.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const updatePerson = (id, newPerson) => {
    console.log("updating person");

    comms.update(id, newPerson).then((response) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : response))
      );
    });
  };

  const handleDel = (event, id) => {
    event.preventDefault();

    comms.deletePerson(id);
    const newArr = persons.filter((person) => person.id !== id);
    setPersons(newArr);
  };

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
          <button onClick={handleAddClick} type="submit">
            add
          </button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <PersonDisplay
            name={person.name}
            number={person.number}
            onClick={(event) => handleDel(event, person.id)}
          />
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
              onClick={(event) => handleDel(event, filteredPerson.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default App;

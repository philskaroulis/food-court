import { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  // get data
  useEffect(
    () => {
      try {
        const endpoint = "http://localhost:5000/hello-world";
        fetch(endpoint + "?id=c7ICVeZJFf9SfYvT85Ov")
          .then((response) => response.json())
          .then((data) => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
          });
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Hello. My name is {firstName} {lastName}.
        </h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

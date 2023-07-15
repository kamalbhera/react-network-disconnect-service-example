import logo from './logo.svg';
import './App.css';
import ConnectionTester from './ConnectionTester'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
        <ConnectionTester url="https://jsonplaceholder.typicode.com/users" poll="15000" timeout="1500" />
    </div>
  );
}

export default App;

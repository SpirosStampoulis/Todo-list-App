import "./App.css";
import QuoteApi from "./components/Quote/QuoteApi";
import Form from "./components/Form";

function App() {
  return (
    <div className='App'>
      <QuoteApi />
      <div className='wrapper'>
        <header className='App-header'>
          <h1>Your To-Do List</h1>
        </header>
        <Form />
      </div>
    </div>
  );
}

export default App;
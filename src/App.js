// src/App.js
import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import WeatherComponent from "./components/WeatherComponent.js";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WeatherComponent />
        <footer className="Footer">
          <p>
            © 2024 Weather App - Developed by{" "}
            <a
              href="https://github.com/dxtaner"
              target="_blank"
              rel="noopener noreferrer">
              dxtaner
            </a>
          </p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;

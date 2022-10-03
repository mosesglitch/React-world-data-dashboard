import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import Bar from "./components/Bar";
import "./App.css";
import Chloropleth from "./components/Chloropleth";
// import Pie from "./components/Pie";
const App = () => {
  const [Y, setY] = useState({});
  const [country, setCountry] = useState("Uganda");
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    $.ajax({
      url: `/members`,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ selected_country: country }),
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
      success: (result) => {
        console.log(result.data);
        setY(result.data);
        return;
      },
      error: (error) => {
        alert("Unable to load questions. Please try your request again");
        return;
      },
    });
  }, [country]);

  return (
    <div className={`body ${theme ? "dark" : "light"}`}>
      <button onClick={() => setTheme(!theme)}>
        {theme ? "light mode" : "dark mode"}
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCountry(e.target[0].value);
        }}
      >
        <input />
      </form>
      <Bar saved={Y} country={country} />
      <Chloropleth />
    </div>
  );
};
export default App;

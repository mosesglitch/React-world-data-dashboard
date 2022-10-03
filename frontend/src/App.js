import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import Bar from "./components/Bar";
import "./App.css";
import Bubbleplot from "./components/Bubbleplot";
import Chloropleth from "./components/Chloropleth";
import Pie from "./components/Pie";
import BarLE from "./components/BarLE";
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
        setY(result.data);
        console.log("y");
        return;
      },
      error: (error) => {
        alert("Unable to load data. Please try your request again");
        return;
      },
    });
  }, [country]);
  useEffect(() => {
    $.ajax({
      url: `/country`,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ selected_country: country }),
      xhrFields: {
        withCredentials: true,
      },
      crossDomain: true,
      success: (result) => {
        setY(result.data);
        console.log("y");
        return;
      },
      error: (error) => {
        alert("Unable to load data. Please try your request again");
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
      <Bubbleplot />
      <Pie />
      <BarLE />
    </div>
  );
};
export default App;

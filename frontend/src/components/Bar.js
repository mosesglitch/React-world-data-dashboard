import React from "react";
import Plot from "react-plotly.js";
import "../App.css";
import axios from "axios";
// $ npm install react-plotly.js plotly.js
class Bar extends React.Component {
  constructor(props) {
    super(props);

    //   const options = {
    //     method: "GET",
    //     url: "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all",
    //     headers: {
    //       "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
    //       "x-rapidapi-key": "cJvLRNK0GfdM9WSMbQe3inU7REn8JVy5",
    //     },
    //   };
    //   axios
    //     .request(options)
    //     .then(function (response) {
    //       console.log(response.data);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });
  }
  render() {
    return (
      <div className="sixteen wide column">
        <br />
        <h4>GDP of {this.props.country}</h4>
        <Plot
          className="barplot"
          data={[
            {
              x: this.props.saved.Year,
              y: this.props.saved.Value,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
            },
            { type: "bar", x: this.props.theY, y: this.props.theX },
          ]}
          layout={{
            width: 400,
            height: 320,
            title: "",
            margin: {
              l: 50,
              r: 30,
              b: 30,
              t: 10,
              pad: 4,
            },
            paper_bgcolor: "#7f7f7f",
            plot_bgcolor: "#c7c7c7",
          }}
        />
      </div>
    );
  }
}
export default Bar;

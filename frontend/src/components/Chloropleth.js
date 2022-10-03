import React, { Component } from "react";
import Plot from "react-plotly.js";
import $ from "jquery";
// d3.csv(
//   "https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv",
//   function (err, rows) {
//     function unpack(rows, key) {
//       return rows.map(function (row) {
//         return row[key];
//       });
//     }
//   }
// );
class Chloropleth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gdp: {},
    };
  }
  componentDidMount() {
    $.ajax({
      url: `/chloropleth`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        this.setState({ gdp: result.chloropleth });
        return;
      },
      error: (error) => {
        alert("Unable to load categories. Please try your request again");
        return;
      },
    });
  }

  render() {
    return (
      <Plot
        data={[
          {
            type: "choropleth",
            // locations: unpack(rows, "CODE"),
            locations: this.state.gdp.code,
            z: this.state.gdp.gdp,
            text: this.state.gdp.country,
            colorscale: [
              [0, "rgb(5, 10, 172)"],
              [0.35, "rgb(40, 60, 190)"],
              [0.5, "rgb(70, 100, 245)"],
              [0.6, "rgb(90, 120, 245)"],
              [0.7, "rgb(106, 137, 247)"],
              [1, "rgb(220, 220, 220)"],
            ],
            autocolorscale: false,
            reversescale: true,
            marker: {
              line: {
                color: "rgb(180,180,180)",
                width: 0.5,
              },
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
              autotic: false,
              tickprefix: "$",
              title: "GDP<br>Billions US$",
            },
          },
        ]}
        layout={{
          title:
            '2014 Global GDP<br>Source: <a href="https://www.cia.gov/library/publications/the-world-factbook/fields/2195.html"> CIA World Factbook</a>',
          geo: {
            showframe: false,
            showcoastlines: false,
            projection: {
              type: "mercator",
            },
          },
          width: 400,
          height: 320,
          margin: {
            l: 0,
            r: 30,
            b: 0,
            t: 50,
            pad: 4,
          },
          paper_bgcolor: "#7f7f7f",
          plot_bgcolor: "#c7c7c7",
        }}
      />
    );
  }
}

export default Chloropleth;

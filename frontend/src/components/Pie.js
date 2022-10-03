import React, { Component } from "react";
import $ from "jquery";
import Plot from "react-plotly.js";
class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gdpcontrib: {},
    };
  }
  componentDidMount() {
    $.ajax({
      url: `/gdpcont`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        // console.log("res", result);
        this.setState({ gdpcontrib: result.gdp_contrib });

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
            values: this.state.gdpcontrib.contrib,
            labels: this.state.gdpcontrib.cols,
            type: "pie",
          },
        ]}
        layout={{
          height: 400,
          width: 500,
        }}
      />
    );
  }
}

export default Pie;

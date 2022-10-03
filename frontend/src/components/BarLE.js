import React, { Component } from "react";
import Plot from "react-plotly.js";
import $ from "jquery";

class BarLE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifeex: {},
    };
  }
  componentDidMount() {
    $.ajax({
      url: `/lifeexpectancy`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        console.log("res", result);
        this.setState({ lifeex: result.data });
        console.log("slife", this.state.lifeex);
        return;
      },
      error: (error) => {
        alert(
          "Unable to load lifeexpectancy data. Please try your request again"
        );
        return;
      },
    });
  }
  render() {
    return (
      <Plot
        data={[
          {
            x: this.state.lifeex.Yearle,
            y: this.state.lifeex.lifeex,
            mode: "lines+markers",
          },
        ]}
        // data = [ trace1, trace2, trace3 ];

        var
        layout={{
          title: "Line and Scatter Plot",
        }}
      />
    );
  }
}

export default BarLE;

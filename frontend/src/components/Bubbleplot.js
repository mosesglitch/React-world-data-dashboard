import React, { Component } from "react";

import Plot from "react-plotly.js";
import $ from "jquery";

class Bubbleplot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      econData: {},
    };
  }
  componentDidMount() {
    $.ajax({
      url: `/bubble`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        console.log("res", result);
        this.setState({ econData: result.economicSize });
        console.log("state", this.state.econData);
        return;
      },
      error: (error) => {
        alert("Unable to load categories. Please try your request again");
        return;
      },
    });
  }
  render() {
    const plot = (
      <Plot
        data={[
          {
            x: this.state.econData.Country,
            y: this.state.econData.population,
            type: "bar",
            mode: "markers",
            marker: {
              color: "blue",
              //   size: this.state.econData.PPPGNIperCapita,
            },
          },
          //   { type: "bar", x: this.props.theY, y: this.props.theX },
        ]}
        // data={{
        //   x: this.state.econData.population,
        //   y: this.state.econData.surfaceArea,
        //   type: "bar",
        //   //   text: [
        //   //     "A<br>size: 40",
        //   //     "B<br>size: 60",
        //   //     "C<br>size: 80",
        //   //     "D<br>size: 100",
        //   //   ],
        //   mode: "markers",
        //   marker: {
        //     // color: [
        //     //   "rgb(93, 164, 214)",
        //     //   "rgb(255, 144, 14)",
        //     //   "rgb(44, 160, 101)",
        //     //   "rgb(255, 65, 54)",
        //     // ],
        //     // size: this.state.econData.PPPGNIperCapita,
        //   },
        // }}
        layout={{
          title: "Bubble Chart Hover Text",
          showlegend: false,
          height: 600,
          width: 600,
        }}
      />
    );
    return <div>{plot}</div>;
  }
}

export default Bubbleplot;

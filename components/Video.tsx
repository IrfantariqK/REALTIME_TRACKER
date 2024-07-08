import React, { Component } from "react";

export class Video extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <video autoPlay muted loop>
          <source src="/locationtracking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

export default Video;

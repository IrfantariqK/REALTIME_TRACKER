import React, { Component } from 'react'
import Homemap from './Homemap'
import Head from 'next/head';

export class home extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Realtime Tracker Home</title>
        </Head>
        <Homemap />
      </div>
    );
  }
}

export default home

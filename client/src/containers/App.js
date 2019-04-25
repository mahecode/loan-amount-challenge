import React, { Component } from 'react';


import Navbar from '../components/Navbar';
import Slider from '../components/Slider';

class App extends Component {
  render(){
    return (
      <div >
        <Navbar />
        <Slider />
      </div>
    );
  }
}

export default App;

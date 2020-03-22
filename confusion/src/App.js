import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './shared/dishes';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render(){
	return (
	<BrowserRouter>
      <div className="App">
        <Main />
      </div>
	</BrowserRouter>  
    );
  }
}

  
export default App;

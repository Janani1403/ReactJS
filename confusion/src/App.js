import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/MenuComponent';
<Menu />
import { Navbar, NavbarBrand } from 'reactstrap';
import { DISHES } from './shared/dishes';

. . .

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

. . .

<Menu dishes={this.state.dishes} />
  
export default App;

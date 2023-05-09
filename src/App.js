import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state={
      monsters:[],
      searchField: ''
    }
    console.log('constructor')
  }

  componentDidMount(){
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users)=> this.setState(() =>{
        return {monsters: users}
      },
      ()=>{
        console.log(this.state)
      }))
  }

  onSearchChange = (event) =>{
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return {searchField}
    });
  }

  getFilteredMonsters(monsters, searchString) {
    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchString)
    })
  
    return filteredMonsters
  }

  render(){
    console.log('render')

    const{monsters, searchField} = this.state;
    const{onSearchChange, getFilteredMonsters} = this;
    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='Search Monsters' 
          className='monsters search-box'/>
      <CardList monsters={getFilteredMonsters(monsters,searchField)}/>
      </div>
    );
  }
}

 
export default App;

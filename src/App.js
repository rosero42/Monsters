import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state={
      allMonsters:[],
      monsters:[],
    }
    console.log('constructor')
  }

  componentDidMount(){
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users)=> this.setState(() =>{
        return {allMonsters: users, monsters: users}
      },
      ()=>{
        console.log(this.state)
      }))
  }

  render(){
    console.log('render')
    return (
      <div className="App">
        <input className='search-box' type='search' placeholder='search monsters' onChange={(event)=>{
          console.log(event.target.value)
          const searchString = event.target.value.toLowerCase()
          const filteredMonsters = this.state.allMonsters.filter((monster)=>{
              return monster.name.toLowerCase().includes(searchString)
          })

          this.setState(()=>{
            return {monsters: filteredMonsters}
          })
        }}/>
       {
          this.state.monsters.map((monster)=>{
            return <h1 key={monster.id}>{monster.name}</h1>
          })
       }
      </div>
    );
  }

}

export default App;

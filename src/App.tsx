import { useState } from 'react'
const outcome_categories: string[] = ['housing','connectivity', 'bills', 'food', 'health','transport','clothing', 'entertainment', 'subscriptions'] 
const income_categories: string[] = ['salary','bonus', 'freelance', 'scholarship', 'rental','Dividends','Selling'] 

function App() {
  return (
    <div className='app'>
      <h1>My budget</h1>
      <Balance/>
      <List/>
      <List/>
    </div>
  )
}

function Balance(){
  return(
    <div className='container'>
      <h3 className='balance-head'> Balance</h3>
      <p className='balance-sum'>800$</p>
      <div className='balance-buttons'>
        <button>Income</button>
        <button>Outcome</button>
      </div>
      <Form/>
    </div>
  )
}

function Form(){
  return(
    <>
      <h3>Add new item</h3>
      <p>{'\u2716'}</p>
      <form className='form'action="">
        <input type="date" value={''} required />
        <input type='number' value={''} required/>
        <input type="text" value={''} required/>
        <ul>
          <li className='category'>
            <label htmlFor="food"><span className='calegory-img'><img src="" alt="1" /><span>name</span></span></label>
          </li>
        </ul>
        <input type="button" />
      </form>
    </>
  )
}

function ListItem(){
  return(
    <li className='list-item'>
      <img className="category" src="" alt="category" />
      <div>
        <h6 className="description">Description</h6>
        <p className='date'>Date</p>
      </div>
      <div className='list-item-buttons'>
        <button>{"\u29c9"}</button>
        <button>{'\u2716'}</button>
      </div>
    </li>
  )
}
function List(){
  return(
    <div className='container'>
      <h2>Incomes/Outcomes</h2>
      <div className='sort-controls'>
        <button>By date</button>
        <button>By category</button>
      </div>
      <ul className='list-items'>
        <ListItem/>
        <ListItem/>
        <ListItem/>
      </ul>
      <div className='diagramm'>Diagramm</div>
    </div>
    
  )
}


export default App

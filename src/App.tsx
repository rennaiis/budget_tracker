import { useState } from 'react'
const outcome_categories: string[] = ['housing','connectivity', 'bills', 'food', 'health','transport','clothing', 'entertainment', 'subscriptions'] 
const income_categories: string[] = ['salary','bonus', 'freelance', 'scholarship', 'rental','Dividends','Selling'] 

function App() {
  return (
    <>
      <h1>My budget</h1>
      <Balance/>
      <List/>
      <List/>
    </>
  )
}

function Balance(){
  return(
    <div className='container'>
      <div className='sides'>
        <h3 className='balance-head'> Balance</h3>
        <p className='balance-sum'>800$</p>
      </div>
      <div className='inline'>
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
    <div className='form-header'>
      <h4>Add new item</h4>
      <p>{'\u2716'}</p>
    </div>
      
      <form className='form' action="">
        <div className='sides'>
          <label htmlFor='form-date'>Date:</label>
          <input type="date" value={''} id='form-date' required />
        </div>
        <div className='sides'>
          <label htmlFor='form-sum'>Summ:</label>
          <input type='number' value={''} id='form-sum' required/>
        </div>
        <div>
          <label htmlFor='form-descr'>Description:</label>
          <input type="text" id='form-descr' value={''} required/>
        </div>
        <ul className='sides'>
          <li className='category'>
            <input type="radio" id='c1' name='category'/>
            <label htmlFor="c1"><span className='calegory-img'><img src="" alt="1" /><span>name</span></span></label>
          </li>
           <li className='category'>
            <input type="radio" id='c2' name='category'/>
            <label htmlFor="c2"><span className='calegory-img'><img src="" alt="1" /><span>name</span></span></label>
          </li>
        </ul>
        <button>Add</button>
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
      <h3>Incomes/Outcomes</h3>
      <div className='inline'>
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

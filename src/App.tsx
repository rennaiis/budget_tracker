import { useState } from 'react'

type priority = 'essentional'|'lifestyle'|'extra'|'income'
interface Category{
  image: string;
  priority: priority;
  name: string
}
interface IformStatus {
  openIncomeForm: boolean;
  openOutcomeForm: boolean;
}
interface CategoryProps{
  catObj: Category
}
interface FormManagementProps{
  formStatus: IformStatus;
  setFormStatus: (val: IformStatus)=>void
}
const outcomeCategories: Category[] = [
  { image: 'bills.png',
    priority: 'essentional',
    name: 'bills'
  },
  { image: 'grocery.png',
    priority: 'essentional',
    name: 'grocery'
  },
  { image: 'health.png',
    priority: 'essentional',
    name: 'health'
  },
  { image: 'housing.png',
    priority: 'essentional',
    name: 'housing'
  },
  { image: 'transport.png',
    priority: 'essentional',
    name: 'transport'
  },
  { image: 'self-care.png',
    priority: 'lifestyle',
    name: 'self-care'
  },
  { image: 'shopping.png',
    priority: 'lifestyle',
    name: 'shopping'
  },
  { image: 'going-out.png',
    priority: 'lifestyle',
    name: 'going-out'
  },
  { image: 'travel.png',
    priority: 'lifestyle',
    name: 'travel'
  },
  { image: 'entertainment.png',
    priority: 'lifestyle',
    name: 'entertainment'
  },
  { image: 'other.png',
    priority: 'extra',
    name: 'other'
  },
  { image: 'subscriptions.png',
    priority: 'extra',
    name: 'subscriptions'
  },
  { image: 'education.png',
    priority: 'extra',
    name: 'education'
  },
  { image: 'gifts.png',
    priority: 'extra',
    name: 'gifts'
  },
  { image: 'hobby.png',
    priority: 'extra',
    name: 'hobby'
  }
]
const incomeCategories: Category[] = [
  { image: 'salary.png',
    priority: 'income',
    name: 'salary'
  },
  { image: 'freelance.png',
    priority: 'income',
    name: 'freelance'
  },
  { image: 'scholarship.png',
    priority: 'income',
    name: 'scholarship'
  },
  { image: 'business.png',
    priority: 'income',
    name: 'scholarship'
  },
  { image: 'other-i.png',
    priority: 'income',
    name: 'other'
  }
]

function App() {
  const[openForm, setOpenForm] = useState({
    openIncomeForm: false,
    openOutcomeForm: false
  })
  return (
    <>
      <h1>My budget</h1>
      <Balance formStatus={openForm} setFormStatus={setOpenForm}/>
      <List/>
      <List/>
    </>
  )
}

function Balance({formStatus, setFormStatus}: FormManagementProps){
  return(
    <div className='container'>
      <div className='sides'>
        <h3 className='balance-head'> Balance</h3>
        <p className='balance-sum'>800$</p>
      </div>
      <div className='inline'>
        <button onClick={()=>setFormStatus({openIncomeForm: true, openOutcomeForm: false})}>Income</button>
        <button onClick={()=>setFormStatus({openIncomeForm: false, openOutcomeForm: true})}>Outcome</button>
      </div>
      {(formStatus.openIncomeForm || formStatus.openOutcomeForm)&& <Form formStatus={formStatus} setFormStatus={setFormStatus}/>}
    </div>
  )
}

function Form({formStatus, setFormStatus}: FormManagementProps){
  return(
    <>
    <div className='form-header'>
      <h4>Add new item</h4>
      <p onClick={()=>setFormStatus({openIncomeForm: false, openOutcomeForm: false})} className='cross'>{'\u2716'}</p>
    </div>  
      <form className='form' action="">
        <div className='sides'>
          <label htmlFor='form-date'>Date:</label>
          <input type="date" id='form-date' required />
        </div>
        <div className='sides'>
          <label htmlFor='form-sum'>Summ:</label>
          <input type='number' id='form-sum' required/>
        </div>
        <div>
          <label htmlFor='form-descr'>Description:</label>
          <input type="text" id='form-descr' required/>
        </div>
        <ul className='category-list'>
          {(formStatus.openOutcomeForm)? 
            outcomeCategories.map(item => <CategoryButton catObj = {item}/> ):
            <></>}
          {(formStatus.openIncomeForm)? 
            incomeCategories.map(item => <CategoryButton catObj = {item}/> ):
            <></>}
        </ul>
        <button>Add</button>
      </form>
    </>

  )
}
function CategoryButton({catObj}: CategoryProps){
  return(
    <li>
      <input type="radio" id={catObj.name} name='category'/>
      <label htmlFor={catObj.name} className='category-image'>
          <img src={catObj.image} alt="1"/>
          <p>{catObj.name}</p>
      </label>
    </li>
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

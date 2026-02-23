import React, { useState } from 'react'

type priority = 'essentional'|'lifestyle'|'extra'|'income'
type typeOfRecord = 'Incomes' | 'Outcomes'
interface IRecord{
  date: Date;
  sum: number;
  note: string;
  category: ICategory
}
interface ICategory{
  image: string;
  priority: priority;
  name: string
}
interface IformStatus {
  openIncomeForm: boolean;
  openOutcomeForm: boolean;
}
interface CategoryProps{
  catObj: ICategory;
  selectCategory: (category: ICategory)=>void
}
interface FormManagementProps{
  formStatus: IformStatus;
  setFormStatus: (val: IformStatus)=>void;
  addOutcome: (val: IRecord)=>void;
  addIncome: (val: IRecord)=>void;
}
interface BalanceProps{
  balance: number;
  formStatus: IformStatus;
  setFormStatus: (val: IformStatus)=>void;
  addOutcome: (val: IRecord)=>void;
  addIncome: (val: IRecord)=>void;
}
interface ListProps{
  type: typeOfRecord;
  records: IRecord[]
}
interface ListItemProps{
  ListItemObj: IRecord
}
const outcomeCategories: ICategory[] = [
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
const incomeCategories: ICategory[] = [
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
    name: 'business'
  },
  { image: 'other-i.png',
    priority: 'income',
    name: 'other'
  }
]

function App() {
  const[balance, setBalance]=useState(0)
  const [outcomes, setOutcomes] = useState<IRecord[]>([])
  const [incomes, setIncomes] = useState<IRecord[]>([])
  const[openForm, setOpenForm] = useState({
    openIncomeForm: false,
    openOutcomeForm: false
  })
  
  function refreshBalance(){
    const allIncome: number = incomes.reduce((acc, item)=> acc+item.sum, 0)
    const allOutcome: number = outcomes.reduce((acc, item)=>acc+item.sum, 0)
    setBalance(()=>(allIncome - allOutcome))
  }
  function addIncome(record: IRecord){
    setIncomes([...incomes, {...record}]);
    refreshBalance()
    
  }
  function addOutcome(record: IRecord){
    setOutcomes([...outcomes, {...record}]);
    refreshBalance()
  }
  return (
    <>
      <h1>My budget</h1>
      <Balance formStatus={openForm} setFormStatus={setOpenForm} addIncome={addIncome} addOutcome={addOutcome} balance={balance}/>
      <List type='Outcomes' records={outcomes}/>
      <List type='Incomes' records={incomes}/>
    </>
  )
}

function Balance({formStatus, setFormStatus, addIncome, addOutcome, balance}: BalanceProps){
  return(
    <div className='container'>
      <div className='sides'>
        <h3 className='balance-head'> Balance</h3>
        <p className='balance-sum'>{balance}$</p>
      </div>
      <div className='inline'>
        <button onClick={()=>setFormStatus({openIncomeForm: true, openOutcomeForm: false})}>Income</button>
        <button onClick={()=>setFormStatus({openIncomeForm: false, openOutcomeForm: true})}>Outcome</button>
      </div>
      {(formStatus.openIncomeForm || formStatus.openOutcomeForm)&& <Form formStatus={formStatus} setFormStatus={setFormStatus} addIncome={addIncome} addOutcome={addOutcome}/>}
    </div>
  )
}

function Form({formStatus, setFormStatus, addIncome, addOutcome}: FormManagementProps){
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [sum, setSum] = useState(0)
  const[note, setNote] = useState('')
  const initionalCategory: ICategory = {image: '', name: '', priority: 'essentional'}
  const[category, setCategory] = useState(initionalCategory)

  function handleSubmit(e: React.SubmitEvent){
    e.preventDefault();
    const dateObj: Date = new Date(date)
    const rec: IRecord = {date: dateObj, category: category, note: note, sum: sum}
    if (rec.category.priority == 'income'){
      addIncome(rec)
      setNote('')
      setDate(new Date().toISOString().split('T')[0])
      setSum(0)
    }else{
      addOutcome(rec)
    }
  }
  return(
    <>
    <div className='form-header'>
      <h4>Add new item</h4>
      <p onClick={()=>setFormStatus({openIncomeForm: false, openOutcomeForm: false})} className='cross'>{'\u2716'}</p>
    </div>  
      <form className='form' action="" onSubmit = {handleSubmit}>
        <div className='sides'>
          <label htmlFor='form-date'>Date:</label>
          <input type="date" id='form-date' required 
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setDate(e.target.value)
          }/>
        </div>
        <div className='sides'>
          <label htmlFor='form-sum'>Summ:</label>
          <input type='number' id='form-sum' required
          value={sum}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSum(Number(e.target.value))}/>
        </div>
        <div>
          <label htmlFor='form-note'>Note:</label>
          <input type="text" id='form-note' required
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setNote(e.target.value)}/>
        </div>
        <ul className='category-list'>
          {(formStatus.openOutcomeForm)? 
            outcomeCategories.map(item => <CategoryButton catObj = {item} selectCategory={setCategory}/> ):
            <></>}
          {(formStatus.openIncomeForm)? 
            incomeCategories.map(item => <CategoryButton catObj = {item} selectCategory={setCategory}/> ):
            <></>}
        </ul>
        <button>Add</button>
      </form>
    </>

  )
}
function CategoryButton({catObj, selectCategory}: CategoryProps){
  return(
    <li>
      <input type="radio" id={catObj.name} name='category'
        onChange={()=>selectCategory(catObj)}
      />
      <label htmlFor={catObj.name} className='category'>
          <img className='category-image' src={catObj.image} alt="1"/>
          <p>{catObj.name}</p>
      </label>
    </li>
  )
}
function ListItem({ListItemObj}: ListItemProps){
  return(
    <li className='list-item'>
      <img className="category-image" src={ListItemObj.category.image} alt="category" />
      <div>
        <h6 className="note">{ListItemObj.note}</h6>
        <p className='date'>{ListItemObj.date.toISOString().split('T')[0]}</p>
      </div>
      <h3>{ListItemObj.sum}$</h3>
      <div className='list-item-buttons'>
        <span>{"\u29c9"}</span>
        <span>{'\u2716'}</span>
      </div>
    </li>
  )
}
function List({type, records}: ListProps){
  return(
    <div className='container'>
      <h3>{type}</h3>
      <div className='inline'>
        <button>By date</button>
        <button>By category</button>
      </div>
      <ul className='list-items'>
        {records.map(item => <ListItem ListItemObj={item}/>)}
      </ul>
      <div className='diagramm'>Diagramm</div>
    </div>
    
  )
}


export default App

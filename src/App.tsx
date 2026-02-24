import React, { useState } from 'react'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts';

const income_colors = ['rgb(66, 137, 145)', 'rgb(28, 70, 75)', 'rgb(94, 221, 235)', 'rgb(42, 62, 65)', 'rgb(0, 130, 145)']
const outcome_colors = ['rgb(134, 102, 175)', 'rgb(49, 104, 6)','rgb(77, 156, 230)']

type priority = 'essentional'|'lifestyle'|'extra'|'income'
type typeOfRecord = 'Incomes' | 'Outcomes'
interface IRecord{
  date: Date;
  sum: number;
  note: string;
  category: ICategory;
  id: number
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
interface ChartProps{
  records: IRecord[];
  type: typeOfRecord;
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
  records: IRecord[];
  deleteRecord: (id: number, priority: priority)=>void;
  copyRecord: (record: IRecord, priority: priority)=>void;
  toogleSortOrder: (type: string)=>void;
  sortType: string;
  sortOrder: string
}
interface ListItemProps{
  ListItemObj: IRecord;
  deleteRecord:  (id: number, priority: priority)=>void;
  copyRecord: (record: IRecord, priority: priority)=>void
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

function Chart({records, type}: ChartProps){
  let colors: string[] =[];
  let data: {name: string;value: number}[] = []
  if (type==='Incomes'){
    colors = income_colors;
    data = Object.entries(
      records.reduce((acc, record)=>{
        const catName: string = record.category.name;
        acc[catName] = (acc[catName] || 0) + record.sum;
        return acc
      }, {} as Record<string, number>
      )
    ).map(([name, value ])=> ({name, value}))
  }else{
    colors = outcome_colors;
    data = Object.entries(
      records.reduce((acc, record)=>{
        const catName: string = record.category.priority;
        acc[catName] = (acc[catName] || 0) + record.sum;
        return acc
      }, {} as Record<string, number>
      )
    ).map(([name, value ])=> ({name, value}))
  }
  if (data.length === 0) return null;
  return(
    <div className='chart-container'>
      <ResponsiveContainer>
        <PieChart>
          <Pie 
            data = {data}
            cx='50%'
            cy='50%'
            innerRadius={0}
            outerRadius={170}
            paddingAngle={0}
            dataKey='value'>
            {data.map((_, index: number)=> <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>)}
          </Pie>
          <Tooltip contentStyle={{borderRadius: '10px', border: 'none'}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
function App() {

  
  const [outcomes, setOutcomes] = useState<IRecord[]>([])
  const [incomes, setIncomes] = useState<IRecord[]>([])

  const allIncome: number = incomes.reduce((acc, item)=> acc+Number(item.sum), 0)
  const allOutcome: number = outcomes.reduce((acc, item)=>acc+Number(item.sum), 0)
  const balance: number = allIncome - allOutcome

  const [sortType, setSortType] = useState('date') //priority
  const [sortOrder, setSortOrder] = useState('asc') //dsc 

  function toogleSortOrder(type: string){
    if (sortType === type){
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }else{
      setSortType(type)
      setSortOrder('asc')
    }
  }

  function sortRecords(records: IRecord[]){
    return records.slice().sort((a: IRecord, b: IRecord )=>{
      if (sortType === 'priority'){
        const priorityOrder = {essentional: 1, lifestyle: 2, extra: 3, income: 4}
        return sortOrder=='asc' ? 
        priorityOrder[a.category.priority] - priorityOrder[b.category.priority]:
        priorityOrder[b.category.priority] - priorityOrder[a.category.priority]
      }else{
        return sortOrder=='asc'?
        a.id - b.id:
        b.id - a.id
      }
    } )
  }
  const sordedIncomes = sortRecords(incomes)
  const sordedOutcomes = sortRecords(outcomes)

  const[openForm, setOpenForm] = useState({
    openIncomeForm: false,
    openOutcomeForm: false
  })
  function deleteRecord(id: number, priority: priority):void{
    if (priority ==='income'){
      setIncomes(incomes.filter(item => item.id != id))
      
    }else{
      setOutcomes(outcomes.filter(item => item.id != id))
    }    
  }
  function copyRecord(record: IRecord, priority: priority){
    const copied = {...record, id: Date.now()}
    if (priority ==='income'){
      setIncomes([...incomes, copied])
    }else{
      setOutcomes([...outcomes, copied])
    }    
  }
  function addIncome(record: IRecord){
    setIncomes([...incomes, {...record}]);
    
  }
  function addOutcome(record: IRecord){
    setOutcomes([...outcomes, {...record}]);
  }
  return (
    <>
      <h1>My budget</h1>
      <Balance formStatus={openForm} setFormStatus={setOpenForm} addIncome={addIncome} addOutcome={addOutcome} balance={balance}/>
      <List type='Outcomes' records={sordedOutcomes} deleteRecord={deleteRecord} copyRecord={copyRecord} toogleSortOrder={toogleSortOrder} sortOrder={sortOrder} sortType={sortType}/>
      <List type='Incomes' records={sordedIncomes} deleteRecord={deleteRecord} copyRecord={copyRecord} toogleSortOrder={toogleSortOrder} sortOrder={sortOrder} sortType={sortType}/>
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
  const [sum, setSum] = useState('')
  const[note, setNote] = useState('')
  const initionalCategory: ICategory = {image: '', name: '', priority: 'essentional'}
  const[category, setCategory] = useState(initionalCategory)

  function handleSubmit(e: React.SubmitEvent){
    e.preventDefault();
    const dateObj: Date = new Date(date)
    const rec: IRecord = {date: dateObj, category: category, note: note, sum: Number(sum), id: Date.now()}
    if (rec.category.priority == 'income'){
      addIncome(rec)
      setNote('')
      setDate(new Date().toISOString().split('T')[0])
      setSum('')
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSum(String(e.target.value))}/>
        </div>
        <div>
          <label htmlFor='form-note'>Note:</label>
          <input type="text" id='form-note' 
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
function ListItem({ListItemObj, deleteRecord, copyRecord}: ListItemProps){
  return(
    <li className={`list-item ${ListItemObj.category.priority}`}>
      <img className="category-image" src={ListItemObj.category.image} alt="category" />
      <div>
        <h6 className="note">{ListItemObj.note}</h6>
        <p className='date'>{ListItemObj.date.toISOString().split('T')[0]}</p>
      </div>
      <h3>{ListItemObj.sum}$</h3>
      <div className='list-item-buttons'>
        <button onClick={()=>copyRecord(ListItemObj, ListItemObj.category.priority)}>{"\u29c9"}</button>
        <button onClick={()=>deleteRecord(ListItemObj.id, ListItemObj.category.priority)}>{'\u2716'}</button>
      </div>
    </li>
  )
}
function List({type, records, deleteRecord, copyRecord, toogleSortOrder, sortOrder, sortType}: ListProps){
  return(
    <div className='container'>
      <h3>{type}</h3>
      {type === 'Outcomes' ?
        <div className='inline'>
        <button className={sortType === 'date'? 'active':''}  
          onClick={()=>toogleSortOrder('date')}>By date {(sortOrder==='asc')? '\u2191': '\u2193'}</button>
          <button className={sortType === 'priority'? 'active':''} 
          onClick={()=>toogleSortOrder('priority')}>By category {(sortOrder==='asc')? '\u2191': '\u2193'}</button>
        </div>
        : ''}
      <div className='list-and-chart'>
        <ul className='list-items'>
          {records.map(item => <ListItem ListItemObj={item} deleteRecord={deleteRecord} copyRecord={copyRecord}/>)}
        </ul>
        <Chart records={records} type={type}/>
      </div>
      
    </div>
    
  )
}


export default App

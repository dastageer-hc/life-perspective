
import React from 'react';
import './index.css'
function App() {

  const days: number = Math.floor((new Date() as number - new Date('1998-04-18')) / (1000 * 60 * 60 * 24));
const totalDays = new Array(27394).fill('✓')


  return (
    <>
      <div className='bg-slate-300 h-full'>
        <div className='flex flex-wrap'>

       {totalDays?.map((_, index)=>{

         return <>
          <div className={`h-2 w-2 border border-slate-700 ${index<=days ? 'bg-green-600' : ''}`}>
          </div>
  
        </>
       })}
       </div>
        </div>
       
    </>
  )
}

export default App

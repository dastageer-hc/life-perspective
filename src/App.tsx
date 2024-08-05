
import React from 'react';
import './index.css'
function App() {
  const startDate: Date = new Date('1998-04-18');
  const currentDate: Date = new Date();
  const millisecondsInDay: number = 1000 * 60 * 60 * 24;
  
  const days: number = Math.floor((currentDate.getTime() - startDate.getTime()) / millisecondsInDay);
  React
const totalDays = new Array(27394).fill('✓')
// const daysInYearArray = [
//   365, 730, 1095, 1461, 1826, 2191, 2556, 2922, 3287, 3652,
//   4017, 4383, 4748, 5113, 5478, 5844, 6209, 6574, 6939, 7305,
//   7670, 8035, 8400, 8766, 9131, 9496, 9861, 10227, 10592, 10957,
//   11322, 11688, 12053, 12418, 12783, 13149, 13514, 13879, 14244, 14610,
//   14975, 15340, 15705, 16071, 16436, 16801, 17166, 17532, 17897, 18262,
//   18627, 18993, 19358, 19723, 20088, 20454, 20819, 21184, 21549, 21915,
//   22280, 22645, 23010, 23376, 23741, 24106, 24471, 24837, 25202, 25567,
//   25932, 26298, 26663, 27028, 27393
// ];





// const findIndex = (index: number) => {
//   const indexa = daysInYearArray?.findIndex(day => day === index);
//   if (indexa !== -1) {
//     return indexa + 1;
//   }
// }

  return (
    <>
      <div className='bg-slate-300 h-full'>
        <div className='flex flex-wrap'>

       {totalDays?.map((_, index)=>{

         return <>
          <div className={`h-2 w-2 border border-slate-700 ${index<=days ? 'bg-green-600' : ''}`}>
          </div>
         {/* { findIndex(index)} */}
        </>
       })}
       </div>
        </div>
       
    </>
  )
}

export default App

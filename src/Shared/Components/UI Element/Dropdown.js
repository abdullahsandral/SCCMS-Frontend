import React from 'react';

const Dropdown = ({ selectedValue, list, compareName, compareValue}) => {
   return <div className="dropdown bg-white">
   <div style={{ cursor: 'pointer' }}
       className="border p-2 w-100 dropdown-toggle d-flex justify-content-between align-items-center"
       id="dropdownMenu2"
       data-toggle="dropdown"
   >
       <div>{selectedValue}</div>
   </div>
   <div className="dropdown-menu w-100 mt-0 p-0" aria-labelledby="dropdownMenuButton">
       {list?.map((item, index) =>
           <h6 key={index}
               className={`m-0 p-2 item ${item[compareName] === compareValue ? 'active_item' : ''}`}
               // onClick={() => classChangeHandler(cls)}
           >{teacher?.first_name + ' ' + teacher?.last_name}
           </h6>)
       }
   </div>
</div>
}
export default Dropdown

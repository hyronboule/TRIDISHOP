import React, { useState } from 'react'


const Select = ({ name, values }) => {
  const [option, setOption] = useState();
  return (
    <div >
      <select name={name} className='select' onChange={e =>
        setOption(e.target.value)
      }>
        {values &&
          values.map((value, i) => (
            <option key={i} value={value.value}>{value.title}</option>
          ))}
      </select>
    </div >
  )
}

export default Select
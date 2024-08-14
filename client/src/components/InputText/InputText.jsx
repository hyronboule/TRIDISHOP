import React, { useState } from 'react'


const InputText = ({ placeholder,className,icon}) => {
    const [value, setValue] = useState('')

    return (
        <div className='search'>
            <input className={className} id='inputText' type="text" name="search" placeholder={placeholder} onChange={(e)=> setValue(e.target.value)} />
            {icon&& icon}
        </div>
    )
}

export default InputText
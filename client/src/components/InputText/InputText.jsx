import React from 'react'


const InputText = ({ placeholder,className,icon,setValue, value,type}) => {
    
    return (
        <div className='search'>
            <input className={className} id='inputText' type={!type?"text": type} value={value} name="search" placeholder={placeholder} onChange={(e)=> setValue(e.target.value)} />
            {icon&& icon}
        </div>
    )
}

export default InputText
import React from 'react'

const TextInput = ({props}) => {

    const {label,val,setval} = props;

  return (
    <div className='TextInputBaseDiv'>
        <fieldset>
            <legend>{(val.length === 0)?label:""}</legend>
            <input type="text" value={val} onChange={(e)=>setval(e.target.value)}/>
        </fieldset>
    </div>
  )
}

export default TextInput
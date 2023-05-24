import React, { useState, useEffect } from 'react'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'
const Checkbox = ({ label, value, isChecked, handleChange }) => {
  const [checked, setChecked] = useState()

  useEffect(() => {
      setChecked(isChecked)

  }, [isChecked])

  const onCheck = () => {
    handleChange(value)
    setChecked(!checked)
  }
  return (
    <div>
      <label htmlFor=""
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center"
        }}
        onClick={() => onCheck()}
      >
        {checked ? (
          <RiCheckboxBlankCircleFill size={30} color='#9B7DBF' />
        ) : (
          <MdRadioButtonUnchecked size={30} />
        )}
        <div>{label}</div>
      </label>
    </div>
  )
}

export default Checkbox
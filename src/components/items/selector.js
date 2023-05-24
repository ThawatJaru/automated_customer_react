import React, { useState, useEffect } from 'react'
import styles from '../../styles/sass/components/items/selector.module.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
const Selector = ({ options, title, type, onChange, statusSelected, defaultSelected, disable, name }) => {

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState({
    value: "",
    label: ""
  })
  const onSelected = (item) => {
    setSelected(item)
    onChange(item.value)
  }
  useEffect(() => {
    if (statusSelected?.status && type === "TOGGLE" && statusSelected?.name !== name) {
      onSelected({
        value: "",
        label: ""
      })
    }
  }, [statusSelected?.status])

  const onSetDefaultSelected = (value) => {
    const found = options.find((item) => item.value === value)
    if (found) {
      setSelected(found)
    }
  }

  useEffect(() => {
    if (defaultSelected) {
      onSetDefaultSelected(defaultSelected)
    }
  }, [defaultSelected])


  return (
    <div>
      <div className={styles.box} onClick={() => !disable && setOpen(!open)}
        style={{
          border: type === "from"  ? '3px solid #B253ED' : "",
          borderColor:disable ? 'gray':"",
          borderRadius: type === "from" ? '20px' : "",
          padding: type === "from" ? '15px' : "",
        }}
      >
        <div>{selected.value ? selected.label : title}</div>
        <MdKeyboardArrowDown size={25} />
        {open && options ? (
          <div className={styles.box_options}>
            {options.map((item, key) => (
              <div className={styles.option_item} key={key} onClick={() => onSelected(item)}>{item.label}</div>
            ))}
          </div>
        ) : ""}
      </div>

    </div>
  )
}

export default Selector
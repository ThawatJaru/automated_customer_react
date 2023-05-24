import React, { useState, useEffect } from 'react'
import styles from '../../styles/sass/components/items/filterBar.module.scss'
import Selector from './selector'
import { mockDataArrival, mockDataName, mockDataPrice } from '../../constants/mockDataOptions'
import { GrClose } from 'react-icons/gr'


const FilterBar = ({ title, handleChange }) => {
  const [filterSelected, setFilterSelected] = useState({
    name: "",
  })
  console.log('%cMyProject%cline:9%cfilterSelected', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(17, 63, 61);padding:3px;border-radius:2px', filterSelected)
  const [statusSelected, setStatusSelected] = useState({
    status: false,
    name: "",
    
  })
  const { name } = filterSelected

  useEffect(() => {
    if (name) {
      setStatusSelected({
        ...statusSelected,
        status: false
      })
    }
  }, [filterSelected, name])

  
  const onClear = () => {
    setStatusSelected({
      name: null,
      status: true
    })
    setFilterSelected({
      name: "",
    })
  }

  const onChangeFilter = (sortBy, value) => {
    setStatusSelected({
      name: sortBy,
      status: true
    })
    setFilterSelected({
      ...filterSelected,
      name: value
    })
    const res = {
      sortBy,
      sort: value
    }
    handleChange(res)
  }

  return (
    <div className={styles.box}>
      <h2>{title}</h2>
      <div className={styles.box_filter_selector}>
        <div style={{ fontWeight: "bold" }}>Sort By</div>
        <div>
          <Selector
            options={mockDataName}
            title={"Name"}
            onChange={(e) => onChangeFilter("name", e)}
            statusSelected={statusSelected}
            disable={false}
            name={"name"}
            type={"TOGGLE"}
          />
        </div>
        <div>
          <Selector
            options={mockDataPrice}
            title={"Price"}
            onChange={(e) => onChangeFilter("price", e)}
            disable={false}
            statusSelected={statusSelected}
            name={"price"}
            type={"TOGGLE"}
          />
        </div>
        <div>
          <Selector
            options={mockDataArrival}
            title={"Date Arrival"}
            onChange={(e) => onChangeFilter("date", e)}
            disable={false}
            statusSelected={statusSelected}
            name={"date"}
            type={"TOGGLE"}
          />
        </div>
        {statusSelected.name && !statusSelected.status && (
          <div onClick={() => onClear()}>
            <GrClose size={25} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar
import React from 'react'
import PlantTypeCard from './plantTypeCard'

const PlantTypeList = ({ data , onDelete}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "15px",
        maxHeight: '90vh',
        overflowY: "scroll",
        paddingRight: "10px"
      }}
    >
      {data && data.length ? data.map((item, key) => (
        <div key={key}>
          <PlantTypeCard data={item} onDelete={onDelete} />
        </div>
      )) : ""}
    </div>
  )
}

export default PlantTypeList
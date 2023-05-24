import React, { useContext, useState, useEffect } from 'react'
import ProductCard from './productCard'
import { AppContext } from '../../appState/store'
import { deletePlants } from '../../services/api/plants'

const ProductList = ({ data }) => {
  const [productDataList, setProductDataList] = useState([])
  const { machineId } = useContext(AppContext)

  const onDeletePlant = async (id) => {
    await deletePlants(machineId, id)
    const filter = productDataList.filter((item) => item.id !== id)
    if (filter) {
      setProductDataList(filter)
    }
  }

  useEffect(() => {
    if (data) {
      setProductDataList(data)
    }
  }, [data])

  return (
    <div style={{
      display: 'flex',
      gap: "18px",
      overflowX: "scroll",
      paddingBottom: "10px"
    }}>
      {productDataList && productDataList.length && productDataList.map((item, key) => (
        <div key={key}>
          <ProductCard status={true} data={item} onDeletePlant={onDeletePlant} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
import React, { useState, useEffect } from 'react'
import Selector from '../components/items/selector'
import { mockDataName2 } from '../constants/mockDataOptions'
import styles from '../styles/sass/pages/viewPlantType.module.scss'
import PlantTypeList from '../components/cards/plantTypeList'
import { Link } from 'react-router-dom'
import { deletePlantType, getAllPlantType, getPlantTypeFromCat } from '../services/api/plantType'

export const cat_data = [
  {
    id: '47a2cf72-c89f-4ba9-8f0e-3943bd0c5132',
    name: 'indoor',
    description: null
  },
  {
    id: 'c559fc61-6e3a-4f72-9a0e-bd6faeb25d58',
    name: 'outdoor',
    description: null
  }
]
const ViewPlantType = () => {
  const [catSelected, setCatSelected] = useState({
    value: "",
    label: "ALL"
  })
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState({
    name: "name",
    order: "desc"
  })
  const onGetPlantTypes = async () => {
    setLoading(true)
    const res = await getAllPlantType(body.name, body.order)
    if (res) {
      setData(res.data)
      setLoading(false)
    }
  }
  const onGetPlantTypesFromCat = async () => {
    setLoading(true)
    const res = await getPlantTypeFromCat(catSelected.value)
    if (res) {
      setData(res.data)
      setLoading(false)
    }
  }
  const onSortName = (value) => {
    setBody({
      ...body,
      order: value
    })
  }

  const onChangeCat = (value, label) => {
    setCatSelected({
      value,
      label
    })
  }

  const onDelete = async (id) => {
    setLoading(true)
    const res = await deletePlantType(id)
    if(res){
      setLoading(false)
      onGetPlantTypes()

    }
  }
  useEffect(() => {
    onGetPlantTypes()
    if (catSelected.value) {
      onGetPlantTypesFromCat()
    }
  }, [body, catSelected])

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh"
      }}
    >
      <div className={styles.box_header}>
        <div style={{
          gridColumn: 'span 2 / span 2',
        }} >
          <Link to='/home-customer' className="btn_back_edit_location">
            <div>
              <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
            </div>
            <div className="pos_text_back">
              Back
            </div>
          </Link>
        </div>
        <div
          style={{
            gridColumn: 'span 2 / span 2',
            textAlign: 'center'
          }}
        >
          <h2>View Plant Types</h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            gridColumn: 'span 2 / span 2',
            justifyContent: 'end'

          }}
        >
          <strong>Sort By</strong>
          <Selector options={mockDataName2} title={"Name"}
            onChange={(e) => onSortName(e)}
            disable={false}

          />
        </div>
      </div>

      {/* grid */}
      <div className={styles.box_list}>
        <div
          style={{
            gridColumn: 'span 6 / span 6',
          }}
        >
          {data && data.length && !loading ? (
            <PlantTypeList data={data} onDelete={onDelete}/>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {loading ? (
                <>Loading</>
              ) : (
                <h1 style={{
                  color: "red"
                }} >
                  "No Plant types are available to display"
                </h1>
              )}
            </div>
          )}
        </div>
        <div className={styles.box_menu}>
          <div className={styles.box_menu_item} onClick={() => onChangeCat("","ALL")}>
            <div>
              <div>
                <img
                  className={`${catSelected.label === "ALL" ? styles.box_icon_grid : styles.p}`}
                  src='/img/icon/icon_grid.svg'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className={styles.box_menu_item} onClick={() => onChangeCat(cat_data[0].id,"INDOOR")}>
            <div>
              <img
                className={`${catSelected.label === "INDOOR" ? styles.box_icon_grid : styles.p}`}
                src='/img/icon/icon_menu_indoor.svg'
                alt=''
              />
            </div>
          </div>
          <div className={styles.box_menu_item} onClick={() => onChangeCat(cat_data[1].id,"OUTDOOR")}>
            <div>
              <img
                className={`${catSelected.label === "OUTDOOR" ? styles.box_icon_grid : styles.p}`}
                src='/img/icon/icon_menu_outdoor.svg'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <Link to="/add-plant-type">
        <div className='my_but_plus'>
          <img src="img/icon/icon_plus.svg" alt="" width="40" height="40" />
        </div>
      </Link>
    </div>
  )
}

export default ViewPlantType
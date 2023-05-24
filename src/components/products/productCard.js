import React, { useContext } from 'react'
import styles from '../../styles/sass/components/products/productCard.module.scss'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../appState/store'


const ProductCard = ({ status, data, onDeletePlant }) => {
  const navigate = useNavigate();
  const { machineId } = useContext(AppContext)

  return (
    <div className={styles.box}
      style={{
        border: `5px solid ${machineId !== data.location.id  ? "#990000" : "none"}`
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "space-between",
        minHeight: "350px"
      }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {data.plant_type.category.name === "indoor" && (
            <img src="/img/icon/icon_indoor.svg" alt="" width={30} />
          )}
          {data.plant_type.category.name === "outdoor" && (
            <img src="/img/icon/icon_outdoor.svg" alt="" width={40} />
          )}
          <div>
            {machineId !== data.location.id ? (
                <div className={styles.location}>{data.location.name}</div>
            ) : (
              <div className={styles.sku}>{data.slot.slot_code}</div>
            )}
          </div>
        </div>
        <div className={styles.box_image}>
          <img src={`${data.image}`} alt="" width={180} height={180} />
          {/* <div className={styles.icon_delete} onClick={() => onDeletePlant(data.id)}>
            <img src="/img/icon/icon_delete.svg" alt="" width={20} />
          </div> */}
        </div>
        <div className={styles.box_price}>
          <div>
            <div>{data.plant_type.name}</div>
            <div style={{ fontSize: "22px" }}>{data.price} Baht</div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          }}>
            <div>
              <button className={styles.but_green} onClick={() => navigate(`/plant/${data.id}`)}>More Detail</button>
            </div>
            {/* <div>
              <button className={styles.but_edit} onClick={() => navigate(`/edit-plant/${data.id}`)}>Edit</button>
            </div>
            <div>
              <button className={styles.but_black} onClick={() => navigate(`/plant/${data.id}`)}>Manage</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
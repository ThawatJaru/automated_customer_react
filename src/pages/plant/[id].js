import React, { useState, useContext, useEffect } from 'react'
import styles from '../../styles/sass/pages/plantDetail.module.scss'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getPlants, plantCloseDoor, plantOpenDoor, webhookToggleDoor } from '../../services/api/plants'
import { AppContext } from '../../appState/store'
import PlantState from '../../components/items/plantState'
import QRCode from 'react-qr-code'

const PlantDetailPage = () => {
  const { machineId } = useContext(AppContext)
  const param = useParams()
  const navigate = useNavigate();

  const [dataPlant, setDataPlant] = useState()
  const [doorStatus, setDoorStatus] = useState(true)

  const onGetDataPlant = async () => {
    const { data } = await getPlants(machineId, param.id)
    if (data) {
      setDataPlant(data)
    }
  }

  const onToggleDoor = async (open, id, status_code) => {
    setDoorStatus(open)
    if (open) {
      const res = await plantOpenDoor(id)
      if (res) {
        const payload = {
          slot_code: status_code,
          status: "opened"
        }
        webhookToggleDoor(param.id)
      }
    } else {
      const res = await plantCloseDoor(id)
      if (res) {
        const payload = {
          slot_code: status_code,
          status: "closed"
        }
        webhookToggleDoor(param.id)
      }
    }
  }

  useEffect(() => {
    if (machineId && param) {
      onGetDataPlant()
    } else {
      navigate('/home-customer')
    }
  }, [param, machineId])

  return (
    <>
      {dataPlant && (
        <div >
          <Link to='/home-customer' >
            <div className="but_green">
              <div>
                <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
              </div>
              <div className="">
                Back
              </div>
            </div>
          </Link>
          <div>
            <div>
              <div
                style={{
                  position: "relative",
                  marginTop:"20px"
                }}
              >
                <img src={dataPlant.image} alt="" width="300" height="300" />
                <div className={`${styles.box_green}`}>
                  <div>
                    <div className={`${styles.flex}`}>
                      <div className={`${styles.flex}`}>
                        <div>
                          <img src="/img/icon/icon_stop_water.png" alt="" width={"40px"} />
                        </div>
                        <div>
                          <div>Watering</div>
                          <h3>Every {dataPlant.plant_type.watering_period} Days</h3>
                        </div>
                      </div>
                      <div className={`${styles.flex}`}>
                        <div>
                          <img src="/img/icon/icon_flower.png" alt="" width={"50px"} />
                        </div>
                        <div>
                          <div>Intensity</div>
                          <h3>{dataPlant.plant_type.preset.intensity.name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.flex}`}>
                      <div style={{ width: "100%" }} >
                        <div className={`${styles.flex}`}>
                          <div>
                            <img src="/img/icon/icon_sun.png" alt="" width={"50px"} />
                          </div>
                          <div>
                            <div>Light</div>
                            <h3>{dataPlant.plant_type.preset.lighting.name}</h3>
                          </div>
                        </div>
                        <div>
                          <strong>{dataPlant.plant_type.preset.lighting.description}</strong>
                        </div>
                      </div>
                      <div style={{ width: "100%" }} >
                        <QRCode
                          size={256}
                          style={{ height: "auto", width: "150px" }}
                          value={dataPlant.plant_type.document}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2>{dataPlant.plant_type.name}</h2>
              </div>
              <div>
                <h3>Description</h3>
                <p className='text_gray'>{dataPlant.plant_type.description}</p>
              </div>
              <div>
                <div>Type: <span><strong>{dataPlant.plant_type.category.name}</strong></span></div>
              </div>
            </div>

            <div className={`${styles.box_price}`}>
              <div style={{
                textAlign: 'center',
              }}>
                <strong className='text_gray'>Price</strong>
                <h2>{dataPlant.price} Bath</h2>
              </div>
              <div>
                <button className={`${styles.but_green}`} onClick={() => navigate(`/payment/${dataPlant.id}`)}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlantDetailPage
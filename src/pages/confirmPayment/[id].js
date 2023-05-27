import React, { useState, useContext, useEffect } from 'react'
import styles from '../../styles/sass/pages/confirmAddPlant.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { getPlants, plantPickup } from '../../services/api/plants'
import { AppContext } from '../../appState/store'
import QRCode from 'react-qr-code'
import CountDown from '../../components/items/countDown'

const ConfirmPayment = () => {
  const { machineId } = useContext(AppContext)
  const param = useParams()
  const navigate = useNavigate();

  const [dataPlant, setDataPlant] = useState()
  const onGetDataPlant = async () => {
    const { data } = await getPlants(machineId, param.id)
    if (data) {
      setDataPlant(data)
    }
  }
  const onPickup = async () => {
    await plantPickup(param.id)
  }
  useEffect(() => {
    if (machineId && param) {
      onGetDataPlant()
      onPickup()
    } else {
      navigate('/home-customer')
    }
  }, [param, machineId])
  return (
    <>
      {dataPlant && (
        <div
          style={{
            minHeight: '90vh',
            position: 'relative',
          }}
        >
          <div
            style={{
              paddingTop: "50px"
            }}
          >
            <h1 className={`${styles.text_center}`}>Your payment has been completed</h1>
            <div className={`${styles.flex_col}`}>
              <div>
                <ul className={`${styles.list}`}>
                  <li className={``}
                    style={{
                      color: "#C4C4C4",
                    }}
                  >
                    <div className={`${styles.list_item}`}>
                      {/* <img src="/img/icon/TArrowRight.svg" alt="" width={25}
                        style={{
                          position: 'absolute',
                          left: "-35px",
                          top: "6px",
                        }}
                      /> */}
                      <div>
                        Please wait for the door to unlock
                      </div>
                    </div>
                  </li>
                  <li className={`${styles.list_active}`}>
                    <div className={`${styles.list_item}`}>
                      <img src="/img/icon/TArrowRight.svg" alt="" width={25}
                        style={{
                          position: 'absolute',
                          left: "-35px",
                          top: "6px",
                        }}
                      />
                      <div>
                        Please put your plant into slot {dataPlant.slot.slot_code}
                      </div>
                    </div>
                  </li>
                  <li className={`${styles.list_active}`}>
                    <div className={`${styles.list_item}`}>
                      <img src="/img/icon/TArrowRight.svg" alt="" width={25}
                        style={{
                          position: 'absolute',
                          left: "-35px",
                          top: "6px",
                        }}
                      />
                      <div>
                        Please close the door
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <img src={dataPlant.image} alt="" width={190} />
              </div>
            </div>
            <div className={`${styles.bg_purple}`}>
              <div>
                <QRCode
                  size={256}
                  style={{ height: "auto", width: "150px" }}
                  value={dataPlant.plant_type.document}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div>Scan this QR to download Plant Documentation</div>
            </div>


            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px"
              }}
            >
              <div>
                <div
                  style={{ width: "300px", textAlign: "center", fontWeight: "bold", }}
                  className='text_gray italic'
                >Automatically return to Home Page
                  in <span>
                    <CountDown
                      value={180}
                      onEnd={() => navigate('/home-customer')}
                    />
                  </span> seconds</div>
              </div>
              <div>
                <button className={`${styles.but_purple}`}
                  style={{
                    fontSize: "30px"
                  }}
                  onClick={() => navigate('/home-customer')}
                >
                  <strong>Return Home</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmPayment
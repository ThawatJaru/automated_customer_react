import React from 'react'
import styles from '../styles/sass/pages/confirmAddPlant.module.scss'
const ConfirmAddPlant = () => {
  return (
    <div
      style={{
        minHeight: '90vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          paddingTop:"50px"
        }}
      >
        <h1 className={`${styles.text_center}`}>Plant Insertion of Slot ‘A01’</h1>
        <div className={`${styles.flex_col}`}>
          <div>
            <ul className={`${styles.list}`}>
              <li className={`${styles.list_active}`}>
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
              <li>Please put your plant into slot ‘A01’</li>
              <li>Please close the door</li>
            </ul>
          </div>
          <div>
            <img src="/img/mockProduct.png" alt="" width={190} />
          </div>
        </div>
        <div className={`${styles.bg_purple}`}>
          <div>
            <img src="/img/QRCode.png" alt="" width={120} />
          </div>
          <div>Please check the correctness of Plant Documentation</div>
        </div>

        <div>
          <button className={`${styles.but_purple}`}
            style={{
              position: "absolute",
              left: "0",
              bottom: "5px",
              fontSize: "30px"
            }}
          >
            <strong>Go Back</strong>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAddPlant
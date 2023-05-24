import React, { useState, useEffect } from 'react'
import { getPayment } from '../../services/api/comunication'
import { Link, useParams, useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import CountDown from '../../components/items/countDown'
import { webhookPaymentStatus } from '../../services/api/webhook'

const PaymentPage = () => {
  const param = useParams()
  const navigate = useNavigate();

  const [dataPayment, setDataPayment] = useState()
  const onGetData = async (id) => {
    const res = await getPayment(id)
    if (res) {
      setDataPayment(res.data)
    }
  }
  const checkStatusPayment = async (id) => {
    const res = await webhookPaymentStatus(id)
    if(res && res.data.transactionId === dataPayment.transactionId ){
      navigate(`/confirm-payment/${param.id}`)
    }
}

  useEffect(() => {
    if (param) {
      onGetData(param.id)
    }
    if(dataPayment?.transactionId){
      checkStatusPayment(dataPayment.transactionId)
    }
  }, [param])


  return (
    <div>
      {dataPayment ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: "20px",
            textAlign: "center",
            height: "100vh",
            position: 'relative',
            overflow: "scroll"
          }}
        >
          <div>
            <h1>Scan this QR to purchase</h1>
          </div>
          <div
            style={{
              background: "#80D4BA",
              padding: "40px",
              borderRadius: "50px",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", width: "350px" }}
              value={dataPayment.payment_qr}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div>
            <h3 className='text_gray'>Price</h3>
            <h2>{dataPayment.price} Bath</h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              left: "0",
              bottom: "60px",
              gap: "10px"
            }}>
            <div>
              <div className='text_gray'>Time left:
                <span style={{ margin: "0px 2px" }}>
                  <CountDown
                    value={180}
                    onEnd={() => navigate(`/plant/${param.id}`)}
                  />
                </span>
                sec</div>
            </div>
            <Link to={`/plant/${param.id}`}>
              <div className="but_green">
                <div>
                  <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
                </div>
                <div className="">
                  Cancel
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: "10px",
            justifyContent: 'center',
            alignItems:"center",
            minHeight:"100vh"
          }}
        >
          <strong>No data</strong>
          <Link to={`/home-customer`}>
            <div className="but_green">
              <div>
                <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
              </div>
              <div className="">
                Cancel
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PaymentPage
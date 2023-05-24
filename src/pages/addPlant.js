import React, { useState, useContext, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import styles from '../styles//sass/pages/addPlant.module.scss'
import Selector from '../components/items/selector'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../appState/store'
import { createPlant, getAllPlantType, getPlantType } from '../services/api/plantType'
import { getAllSlot } from '../services/api/slot'
const AddPlant = () => {
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64: null
  });
  const { machineId } = useContext(AppContext)
  const [dataPlantType, setDataPlantType] = useState([])
  const [dataSlot, setDataSlot] = useState([])
  const [singlePlantType, setSinglePlantType] = useState()
  const [selectedPlantTypeId, setSelectedPlantTypeId] = useState()
  const [selectedSlotId, setSelectedSlotId] = useState()
  const [price, setPrice] = useState(0)
  const [error, setError] = useState({
    status: false,
    message: ""
  })
  const [loadding, setLoadding] = useState(false)
  const navigate = useNavigate();

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = function (upload) {
      const base64Image = upload.target.result.split(",")[1];
      // ทำสิ่งที่ต้องการกับภาพในรูปแบบ Base64
      setSelectedFile({
        file: event.target.files[0],
        base64: base64Image.toString()
      });
    };

    reader.readAsDataURL(file);
  };

  const onGetDataPlantType = async () => {
    const res = await getAllPlantType()
    if (res) {
      const mapData = res.data.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
      setDataPlantType(mapData)
    }
  }
  const onGetDataSlot = async () => {
    const res = await getAllSlot(machineId)
    if (res) {
      const mapData = res.data.map((item) => {
        return {
          value: item.id,
          label: item.slot_code
        }
      })
      setDataSlot(mapData)
    }
  }

  const onGetPlantType = async () => {
    const res = await getPlantType(selectedPlantTypeId)
    if (res) {
      setSinglePlantType(res.data)
    }
  }
  const onSubmit = async () => {
    if (!selectedPlantTypeId || !selectedSlotId || !selectedFile || !price) {
      setError({
        status: true,
        message: "The form is incomplete"
      })
      setLoadding(false)
      return
    }
    setLoadding(true)
    const payload = {
      plant_type_id: selectedPlantTypeId,
      slot_id: selectedSlotId,
      price: Number(price),
      image_name: selectedFile.file.name,
      image: selectedFile.base64
    }
    try {
      const res = await createPlant(payload, machineId)
      if (res) {
        navigate('/home-customer')
        setLoadding(false)
      }else{
        setLoadding(false)
        setError({
          status: true,
          message: "Something is wrong"
        })
      }
    } catch (error) {
      console.log('error')
    }

  }
  useEffect(() => {
    if (!machineId) {
      navigate('/machine-location')
    }
    if (selectedPlantTypeId) {
      onGetPlantType()
    }
    if (selectedPlantTypeId || selectedSlotId || selectedFile || price) {
      setError({
        status: false,
        message: ""
      })
    }
    onGetDataPlantType()
    onGetDataSlot()
  }, [machineId, selectedPlantTypeId, selectedSlotId, selectedFile, price])

  return (
    <div
      style={{
        minHeight: '90vh',
        position: 'relative',
      }}
    >
      <Link to='/home-customer' className="btn_back_edit_location">
        <div>
          <img src="/img/icon/icon_arrow.svg" alt="" width="100%" height="100%" />
        </div>
        <div className="pos_text_back">
          Back
        </div>
      </Link>
      <div style={{ marginTop: "20px" }}>
        <h2>Insert plant to Slot</h2>
      </div>
      {/* from */}
      <form action="">
        <div className={styles.grid_form}>
          {/* grid1 */}
          <div>
            <label htmlFor="file"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {selectedFile.file ? (
                <div className={styles.box_input_img}>
                  <img
                    src={URL.createObjectURL(selectedFile.file)}
                    alt="Selected"
                    width="230px"
                  />
                </div>
              ) : (
                <div className={styles.box_input_img}>
                  <BiImageAdd size={130} />
                </div>
              )}
              <div className={styles.but_select_img}>Select Image</div>
              <input type="file" id='file' onChange={handleFileSelect} />
            </label>
          </div>
          {/* grid 2 */}
          <div>
            <div className={`${styles.flex_col}`}>
              <div className='asterisk'>Select plant’s type</div>
              <Selector title={"Please Select..."} type={"from"} options={dataPlantType} onChange={(e) => setSelectedPlantTypeId(e)} />
            </div>
            <div className={styles.flex_col} style={{ marginTop: "30px" }}>
              <div className='asterisk'>Price</div>
              <div className={styles.flex}>
                <input type="text"
                  placeholder='price'
                  style={{
                    border: '3px solid #B253ED',
                    borderRadius: '20px',
                    padding: '15px',
                    width: "70px"
                  }}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div>Baht</div>
              </div>
            </div>
          </div>
          {/* grid 3 */}
          <div>
            <div className={styles.flex_col}>

              <div className='asterisk'>Select the slot</div>
              <Selector title={"Please select.."} type={"from"} options={dataSlot} onChange={(e) => setSelectedSlotId(e)} />

            </div>
          </div>
          {singlePlantType && (
            <div
              style={{
                gridColumn: " 2 / span 2",
                gridColumnStart: "1"
              }}
            >
              <div className={styles.box_detail}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div className={`italic`}>Intensity</div>
                    <div className={`mt_10 text_lg`}
                      style={{
                        position: "relative"
                      }}
                    >
                      <strong>{singlePlantType.preset.intensity.name}</strong>
                      <img src='/img/icon/icon_checkbox_active.svg' alt='' width={22} className={`${styles.img_checkbox}`} />
                    </div>
                  </div>
                  <div>
                    <div className={`italic`}>Lighting</div>
                    <div className={`mt_10 text_lg`}>
                      <strong>{singlePlantType.preset.lighting.name}</strong>
                    </div>
                  </div>
                  <div className={`italic`}>
                    <div>Duration (per day)</div>
                    <div className={`mt_10 text_lg`}>{singlePlantType.preset.lighting.description}</div>
                  </div>
                </div>
                <div className={`${styles.flex} mt_10`}>
                  <div className='italic'>Watering :</div>
                  <div>Every</div>
                  <strong className='text_purple'>{singlePlantType.watering_period}</strong>
                  <div>Days</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  fontSize: "20px",
                  marginTop: "20px",
                  paddingLeft: "20px"
                }}
              >
                <div>Category:</div>
                <strong
                  style={{
                    color: "#b253ed"
                  }}
                >{singlePlantType.category.name}</strong>
              </div>
            </div>
          )}
        </div>
      </form>

      <div>
        {error.message && (
          <strong
            style={{
              color: "red",
              position: 'absolute',
              bottom: "90px",
              right: "10px"
            }}
          >
            {error.message}
          </strong>
        )}
        <button className={`${styles.but_next}`} onClick={() => onSubmit()}>
          {loadding ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  )
}

export default AddPlant
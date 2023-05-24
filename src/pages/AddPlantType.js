import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/sass/pages/addPlantType.module.scss'
import Checkbox from '../components/items/checkbox'
import { createPlantType } from '../services/api/plantType'
import { GrFormClose } from 'react-icons/gr'
import { moackFileDocBase64 } from '../constants/mockBase64'
const cat_data = [
  {
    id: '47a2cf72-c89f-4ba9-8f0e-3943bd0c5132',
    name: 'Indoor',
    description: null
  },
  {
    id: 'c559fc61-6e3a-4f72-9a0e-bd6faeb25d58',
    name: 'Outdoor',
    description: null
  }
]

const preset_data = [      // 'Plant Caring' choice selection
  {
    id: '3f7ad8d9-0c56-4132-9b10-5d92524cd400',
    intensity_id: '22927165-ed75-46f7-bb84-a0b898bd8d14',   // Direct
    lighting_id: '4479123b-df0c-4bf8-b5d6-49c2a27978cd',    // Full Sun
    intensity: "Direct",
    lighting: "Full Sun",
    duration: "at least 6 hours",
  },
  {
    id: '50f89657-cc40-44bd-97b8-256e580cf289',
    intensity_id: '22927165-ed75-46f7-bb84-a0b898bd8d14',   // Direct
    lighting_id: '8e9259d6-230d-43ee-8313-180ecbcf3fcd',    // Partial Sun
    intensity: "Direct",
    lighting: "Partial Sun",
    duration: "3 - 6 hours",
  },
  {
    id: '97007e9d-54d3-4a12-91f5-96c7a19daecb',
    intensity_id: 'b42a6afa-dca8-4ee6-bf41-2cf4710e12b2',   // Indirect
    lighting_id: '9adf7269-ff25-4bf6-ad00-aa05ada7e249',    // Partial Shade
    intensity: "Indirect",
    lighting: "Partial Shade",
    duration: "3 - 6 hours",
  },
  {
    id: 'd780544a-ab05-4490-8342-e6badbfbc171',
    intensity_id: 'b42a6afa-dca8-4ee6-bf41-2cf4710e12b2',   // Indirect
    lighting_id: 'f4d11729-d404-4936-8c80-821bcc64e8d8',     // Low Light
    intensity: "Indirect",
    lighting: "Low Light",
    duration: "2 - 3 hours",
  }
];
const AddPlantType = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("")
  const [presetSelected, setPresetSelected] = useState("")
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const [errorForm, setErrorForm] = useState({
    status: false,
    message: ""
  })
  const [dataForm, setDataForm] = useState({
    name: "",
    description: "",
    category_id: "",
    preset_id: "",
    watering_period: null,
    document_name: "",
    document: moackFileDocBase64
  })


  const onChangeType = (value) => {
    if (value) {
      setCategory(value)
      setDataForm({
        ...dataForm,
        category_id: value
      })
    }
  }
  const onChangePreset = (value) => {
    if (value) {
      setPresetSelected(value)
      setDataForm({
        ...dataForm,
        preset_id: value
      })
    }
  }
  const handleChangeFile = (event) => {
    let value = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = () => {
      setDataForm({
        ...dataForm,
        document_name: value?.name,
      })
      setFile(value);
    };
  };

  const onCreate = async (data) => {
    setLoading(true)
    if (!dataForm.name && !dataForm.description && !dataForm.category_id && !dataForm.preset) {
      console.log("error")
      setLoading(false)
      setErrorForm({
        status: true,
        message: "The From is incomplete"
      })
      return
    }
    const res = await createPlantType(data)
    if (res) {
      setLoading(false)
      navigate('/view-plant-type')
    }
  }

  const onChangeForm = (e) => {
    if (e && e.target.name !== "document_name") {
      setErrorForm({
        status: false,
        message: ""
      })
      setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }
  }
  useEffect(() => {

  }, [dataForm])

  return (
    <div
      style={{
        minHeight: '90vh',
        position: 'relative',
      }}
    >
      <Link to='/view-plant-type' className="btn_back_edit_location">
        <div>
          <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
        </div>
        <div className="pos_text_back">
          Back
        </div>
      </Link>

      {/* contents */}
      <form onChange={onChangeForm}>
        <div className={`${styles.grid}`}>
          <div>
            <div>
              <h2>Add Plant’s Type</h2>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: "column",
                gap: "20px",
                marginTop: "50px"
              }}
            >
              <div>
                <div className='asterisk'>Plant’s Type </div>
                <div className={`${styles.outline_input}`}
                  style={{
                    marginTop: "20px"
                  }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className=""
                    value={dataForm.name}
                    name="name"
                    style={{ width: "400px" }}
                  />
                </div>
              </div>
              <div>
                <div className='asterisk'>Category</div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "20px"
                  }}
                >
                  {cat_data.length && cat_data.map((item, key) => (
                    <div key={key}>
                      <Checkbox label={item.name} handleChange={(e) => onChangeType(e)} value={item.id} isChecked={category === item.id ? true : false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2 className='asterisk italic'>Look after your plants</h2>
            </div>

            <div className={`${styles.bg_purple}`}>
              <div
                style={{
                  textAlign: "center"
                }}
              >Intensity</div>
              <div>Lighting</div>
              <div>Duration (per day)</div>

              {preset_data && preset_data.length && preset_data.map((item, key) => (
                <React.Fragment key={key}>
                  <strong>
                    <Checkbox label={item.intensity} handleChange={(e) => onChangePreset(e)} value={item.id} isChecked={presetSelected === item.id ? true : false} />
                  </strong>
                  <strong>{item.lighting}</strong>
                  <strong>{item.duration}</strong>
                </React.Fragment>
              ))}
              <div style={{
                gridColumn: "span 3 / span 3"
              }}>
                <div className='asterisk italic'>Watering</div>
                <div className={`${styles.flex_col}`}>
                  <div className={`${styles.flex_col}`}>
                    <div>Every</div>
                    <div className={`${styles.outline_input}`}
                      style={{
                        width: "40px",
                      }}
                    >
                      <input type="number" placeholder={6} name="watering_period" value={dataForm.watering_period} />
                    </div>
                    <div className='asterisk'>Days</div>
                  </div>
                  {file && file.name ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center"
                      }}
                    >
                      <div className={`${styles.but_gray}`}>
                        <div className='text_ellipsis'>{file.name}</div>
                      </div>
                      <GrFormClose size={25} onClick={() => setFile("")} />
                    </div>
                  ) : (
                    <div className={`${styles.but_purple}`}>
                      <label htmlFor="file" >
                        <div>{"Select Document"}</div>
                        <input type="file" id="file" name="document_name" onChange={handleChangeFile} />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{
            gridColumn: 'span 2 / span 2'
          }}>
            <div>
              <div className='asterisk'>Type Description</div>
              <div>
                <textarea
                  name="description"
                  id=""
                  value={dataForm.description}
                  cols="30"
                  rows="10"
                  className={`${styles.outline_input}`}
                  placeholder='Description..'
                  style={{
                    borderRadius: "50px",
                    paddingLeft: "30px",
                    marginTop: "20px",
                    width: '70%'
                  }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div
        style={{
          position: 'relative'
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "0",
            color: "red"
          }}
        >
          <strong>{errorForm.status && errorForm.message}</strong>
        </div>
        <button className={`${styles.but_purple}`}
          style={{
            position: "absolute",
            right: "0",
            bottom: "5px",
            fontSize: "30px"
          }}
          onClick={() => onCreate(dataForm)}
        >
          <strong>{loading ? "Loading" : "Submit"}</strong>
        </button>
      </div>
    </div>
  )
}

export default AddPlantType
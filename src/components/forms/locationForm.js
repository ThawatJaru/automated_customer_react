import React from 'react'

const LocationForm = ({ onChangeDataForm, mode, dataForm }) => {
  return (
    <>
      <form action="" onChange={onChangeDataForm}>
        <div className="big_container_add_location">
          <div className="container_loc_name_add_location">
            <div className="style_loc_name_add_location">
              Location Name *
            </div>
            <div className="pos_input_loc_add_location">
              <input type="text" placeholder="Name" className="loc_name_add_location" name="name" value={dataForm.name} />
            </div>
          </div>
          <div className="container_cap_add_location">
            <div className="style_loc_name_add_location">
              Capacity *
            </div>
            <div className="pos_input_loc_add_location">
              <input
                style={{
                  borderColor: `${mode === "EDIT" && '#D9D9D9'}`,
                  color: `${mode === "EDIT" && '#D9D9D9'}`
                }}
                type="number"
                placeholder="3"
                className="cap_add_add_location"
                name="capacity"
                value={dataForm.capacity}
                disabled={mode === "EDIT" && true}
              />
              <i className="pos_slots_text_add_location">Slots</i>
            </div>
          </div>
        </div>

        <div className="big_container_add_location">
          <div className="container_loc_name_add_location">
            <div className="style_loc_name_add_location">
              Location Description (Optional)
            </div>
            <div className="pos_input_loc_add_location">
              <textarea id="" cols="30" rows="10" placeholder="Description.." className="loc_description_add_location" name="description" value={dataForm.description} />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default LocationForm
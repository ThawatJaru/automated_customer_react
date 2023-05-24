import React, { useContext } from 'react'
import { deleteMachine } from '../../services/api/machines'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../appState/store';

const LocationItem = ({ data }) => {
  const navigate = useNavigate();
  const { setMachineId } = useContext(AppContext)

  const onDelete = async (id) => {
    await deleteMachine('00000000-0000-4000-8000-000000000000', id)
    window.location.reload()
  }
  const onSelectMachine = async (id) => {
    setMachineId(id)
    navigate('/home-customer')
  }
  return (
    <div className="location_container_all">
      <div className="location_container_items_left">
        <div>
          <img src="img/icon/icon_location.svg" alt="" width="70" height="70" />
        </div>
        <div>
          <div className="location_name">
            {data.name}
          </div>
          <div className="slots_service">
            In Service:
            <span
              style={{
                color: `${data.capacity === 0 && "red"}`
              }}
            >{data.capacity}</span>
            slots
          </div>
        </div>
      </div>
      <div className="location_container_items_right">
        <button className="btn_submit" onClick={() => onSelectMachine(data.id)}>
          Select
        </button>
        <Link to={`/edit-location/${data.id}`}>
          <button className="btn_edit">
            Edit
          </button>
        </Link>
        <button className="btn_remove" onClick={() => onDelete(data.id)}>
          <img src="img/icon/icon_bin.svg" alt="" width="20" height="20" />
        </button>
      </div>
    </div>
  )
}

export default LocationItem
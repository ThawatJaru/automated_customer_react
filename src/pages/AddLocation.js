import React, { useState } from 'react'
import { createMachine } from '../services/api/machines'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import LocationForm from '../components/forms/locationForm';

const AddLocation = () => {
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        name: null,
        description: null,
        capacity: null,
    })
    const [error, setError] = useState({
        status: false,
        massage: ""
    })
    const [loading, setLoading] = useState(false)
    const onCreate = async (data) => {
        setLoading(true)
        if (!dataForm.name || !dataForm.description || !dataForm.capacity) {
            setError({
                status: true,
                massage: "The from is incomplete"
            })
            return
        }
        await createMachine("00000000-0000-4000-8000-000000000000", data)
        setLoading(false)
        navigate("/machine-location")

    }

    const onChangeDataForm = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
        setError({
            status: false,
            massage: ""
        })
    }
    console.log(error)
    return (
        <>
            <Link to='/machine-location' className="btn_back_edit_location">
                <div>
                    <img src="/img/icon/icon_arrow.svg" alt="" width="10" height="10" />
                </div>
                <div className="pos_text_back">
                    Back
                </div>
            </Link>

            <h1 className="add_loc_text_machine">
                Add your machine's location
            </h1>

            <LocationForm
                dataForm={dataForm}
                onChangeDataForm={onChangeDataForm}
                mode={"CREATE"}
            />


            <div className="pos_btn_submit_add_location">
                <div
                    style={{
                        color: "red",
                        width: "200px",
                        textAlign: "right",
                        position: "absolute",
                        bottom: "60px",
                        right: "10px",
                    }}
                >
                    <strong>{error.massage}</strong>
                </div>
                <button className="btn_submit_add_location" onClick={() => onCreate(dataForm)}>
                    {loading ? "Loading" : "Submit"}

                </button>
            </div>
        </>
    )
}

export default AddLocation
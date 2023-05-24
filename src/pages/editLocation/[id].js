import { Link, useParams } from "react-router-dom";
import LocationForm from "../../components/forms/locationForm";
import React, { useState, useEffect, useContext } from 'react'
import { updateMachine, getMachine } from '../../services/api/machines'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../appState/store";

function EditLocation() {
    const navigate = useNavigate();
    const param = useParams()
    const { user } = useContext(AppContext)

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
        await updateMachine(user.id, param.id, data)
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
    const onGetData = async (m_id) => {
        const { data } = await getMachine(user.id, m_id)
        if (data) {
            setDataForm({
                name: data.name,
                description: data.description,
                capacity: data.capacity
            })
        }
    }
    useEffect(() => {
        if (param.id) {
            onGetData(param.id)
        }
    }, [param])

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
                Edit location
            </h1>

            {/* form */}
            <LocationForm
                dataForm={dataForm}
                onChangeDataForm={onChangeDataForm}
                mode={"EDIT"}
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
                    {loading ? "Loading" : "Save"}
                </button>
            </div>
        </>
    );
}

export default EditLocation;

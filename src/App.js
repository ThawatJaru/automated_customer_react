import Login from './pages/Login.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddLocation from './pages/AddLocation.js'
import ViewPlantType from './pages/ViewPlantType.js';
import PlantDetailPage from './pages/plant/[id].js';
import AddPlant from './pages/addPlant.js';
import Location from './pages/Location.js';
import { useEffect, useContext } from 'react'
import { AppContext } from './appState/store.js';
import AddPlantType from './pages/AddPlantType.js';
import ConfirmAddPlant from './pages/ConfirmAddPlant.js';
import EditLocation from './pages/editLocation/[id].js';
import EditPlantType from './pages/editPlantType/[id].js';
import EditPlantPage from './pages/editPlant/[id].js';
import HomeCustomer from './pages/HomeCustomer.js';
import PaymentPage from './pages/payment/[id].js';
import { webhookPaymentStatus } from './services/api/webhook/index.js';
import ConfirmPayment from './pages/confirmPayment/[id].js';

function App() {
    const { user, setUser, setMachineId, machineId} = useContext(AppContext)
    console.log('%cMyProject%cline:21%cmachineId', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(38, 157, 128);padding:3px;border-radius:2px', machineId)
    const navigate = useNavigate();
    const m_id = localStorage.getItem('machineId_plant');
    const reLogin = async () => {
        const data = await localStorage.getItem('user_plant');
        if(data){
          setUser(JSON.parse(data))
        }
      }
    useEffect(() => {
        setMachineId(m_id)
        if (!user?.id) {
            reLogin()
        }
        if (!user) {
            navigate('/')
        }
        
    }, [user])

    return (
        <>
            <Routes>
                <Route path='/' element={<HomeCustomer />} />
                <Route path='/login' element={<Login />} />
                <Route path='/machine-location' element={<Location />} />
                <Route path='/plant/:id' element={<PlantDetailPage />} />
                <Route path='/payment/:id' element={<PaymentPage />} />
                <Route path='/confirm-payment/:id' element={<ConfirmPayment />} />
                <Route path='/home-customer' element={<HomeCustomer />} />
                {/* <Route path='/add-location' element={<AddLocation />} /> */}
                {/* <Route path='/edit-location/:id' element={<EditLocation />} /> */}
                {/* <Route path='/view-plant-type' element={<ViewPlantType />} /> */}
                {/* <Route path='/insert-plant-slot' element={<AddPlant />} /> */}
                {/* <Route path='/edit-plant-type/:id' element={<EditPlantType />} /> */}
                {/* <Route path='/edit-plant/:id' element={<EditPlantPage />} />
                <Route path='/add-plant' element={<AddPlant />} />
                <Route path='/add-plant-type' element={<AddPlantType />} />
                <Route path='/confirm-add-plant-slot' element={<ConfirmAddPlant />} /> */}
            </Routes>
        </>
    )
}

export default App;
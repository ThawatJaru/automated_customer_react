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

function App() {
    const { user } = useContext(AppContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.id) {
            console.log("please login")
            // navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/machine-location' element={<Location />} />
                <Route path='/add-location' element={<AddLocation />} />
                <Route path='/edit-location/:id' element={<EditLocation />} />
                <Route path='/home-customer' element={<HomeCustomer />} />
                <Route path='/view-plant-type' element={<ViewPlantType />} />
                <Route path='/plant/:id' element={<PlantDetailPage />} />
                <Route path='/insert-plant-slot' element={<AddPlant />} />
                <Route path='/edit-plant-type/:id' element={<EditPlantType />} />
                <Route path='/edit-plant/:id' element={<EditPlantPage />} />
                <Route path='/add-plant' element={<AddPlant />} />
                <Route path='/add-plant-type' element={<AddPlantType />} />
                <Route path='/confirm-add-plant-slot' element={<ConfirmAddPlant />} />
            </Routes>
        </>
    )
}

export default App;
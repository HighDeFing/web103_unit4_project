import React, { useState, useEffect } from 'react'
import '../App.css'
import '../css/ViewCars.css'
import { getAllCars, getExterior, getRoof, getWheels, getInterior  } from '../../services/CarsAPI.jsx'

const ViewCars = () => {

    const [cars, setCars] = useState([])
    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carsData = await getAllCars()
                const exteriorData = await getExterior()
                const roofData = await getRoof()
                const wheelsData = await getWheels()
                const interiorData = await getInterior()

                setCars(carsData)
                setExterior(exteriorData)
                setRoof(roofData)
                setWheels(wheelsData)
                setInterior(interiorData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const getExteriorNameById = (id) => {
        const exteriorItem = exterior.find(item => item.id === id)
        return exteriorItem ? exteriorItem.name : 'Unknown'
    }

    const getRoofNameById = (id) => {
        const roofItem = roof.find(item => item.id === id)
        return roofItem ? roofItem.name : 'Unknown'
    }

    const getWheelsNameById = (id) => {
        const wheelsItem = wheels.find(item => item.id === id)
        return wheelsItem ? wheelsItem.name : 'Unknown'
    }

    const getInteriorNameById = (id) => {
        const interiorItem = interior.find(item => item.id === id)
        return interiorItem ? interiorItem.name : 'Unknown'
    }
    
    return (
        <div className="cars-container">

            {cars.length > 0 ? (
                cars.map((car) => (
                    <div key={car.id}>
                        <h3>{car.name}</h3>
                        <p>{getExteriorNameById(car.exterior)}</p>
                        <p>{getRoofNameById(car.roof)}</p>
                        <p>{getWheelsNameById(car.wheels)}</p>
                        <p>{getInteriorNameById(car.interior)}</p>
                    </div>
                ))
            ) : (
                <p>No cars available</p>
            )}

        </div>
    )
}

export default ViewCars
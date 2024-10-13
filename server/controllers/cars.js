import { pool } from '../config/database.js'

const getCars = async (req, res) => { // get all cars
    try {
        const response = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarById = async (req, res) => { // get car by id
    try {
        const id = parseInt(req.params.carId)
        const response = await pool.query(`SELECT * FROM cars WHERE id = $1`, [id])
        res.status(200).json(response.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createCar = async (req, res) => { // create car
    try {
        const { exterior, roof, wheels, interior } = req.body
        const response = await pool.query(`INSERT INTO cars (exterior, roof, wheels, interior) VALUES ($1, $2, $3, $4) RETURNING *`, [exterior, roof, wheels, interior])
        res.status(201).json(response.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateCar = async (req, res) => { // update car
    try {
        const id = parseInt(req.params.carId)
        const { exterior, roof, wheels, interior } = req.body
        const response = await pool.query(`UPDATE cars SET exterior = $1, roof = $2, wheels = $3, interior = $4 WHERE id = $5 RETURNING *`, [exterior, roof, wheels, interior, id])
        res.status(200).json(response.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => { // delete car
    try {
        const id = parseInt(req.params.carId)
        await pool.query(`DELETE FROM cars WHERE id = $1`, [id])
        res.status(200).json({ message: `Car with ID ${id} was deleted` })
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarExterior = async (req, res) => { // get car exterior
    try {
        console.log('Fetching car exteriors...')
        const response = await pool.query('SELECT * FROM exterior ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarRoof = async (req, res) => { // get car roof
    try {
        const response = await pool.query('SELECT * FROM roof ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarsWheels = async (req, res) => { // get car wheels
    try {
        const response = await pool.query('SELECT * FROM wheels ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarInterior = async (req, res) => { // get car interior
    try {
        const response = await pool.query('SELECT * FROM interior ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default { getCars, getCarById, createCar, updateCar, deleteCar, getCarExterior, getCarRoof, getCarsWheels, getCarInterior }
import { pool } from './database.js';
import './dotenv.js';
import { CarsData, ExteriorData, RoofData, WheelsData, InteriorData } from "../data/data.js";

const createCarsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS cars CASCADE;

    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        exterior INTEGER NOT NULL,
        roof INTEGER NOT NULL,
        wheels INTEGER NOT NULL,
        interior INTEGER NOT NULL,
        FOREIGN KEY (exterior) REFERENCES exterior(id),
        FOREIGN KEY (roof) REFERENCES roof(id),
        FOREIGN KEY (wheels) REFERENCES wheels(id),
        FOREIGN KEY (interior) REFERENCES interior(id)
    )`;

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('Error creating cars table', err)
    }
}

const createExteriorTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS exterior CASCADE;

    CREATE TABLE IF NOT EXISTS exterior (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 exterior table created successfully')
    } catch (err) {
        console.error('Error creating exterior table', err)

    }
}

const createRoofTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS roof CASCADE;

    CREATE TABLE IF NOT EXISTS roof (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 roof table created successfully')
    } catch (err) {
        console.error('Error creating roof table', err)

    }
}

const createWheelsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS wheels CASCADE;

    CREATE TABLE IF NOT EXISTS wheels (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 wheels table created successfully')
    } catch (err) {
        console.error('Error creating wheels table', err)

    }
}

const createInteriorTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS interior CASCADE;

    CREATE TABLE IF NOT EXISTS interior (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 interior table created successfully')
    } catch (err) {
        console.error('Error creating interior table', err)

    }
}

const seedCarsTable = async () => {
    await createCarsTable();
    await createExteriorTable();
    await createRoofTable();
    await createWheelsTable();
    await createInteriorTable();

    for (const exterior of ExteriorData) {
        const insertQuery = {
            text: 'INSERT INTO exterior (id, name, image) VALUES ($1, $2, $3)'
        };
        const values = [
            exterior.id,
            exterior.name,
            exterior.image
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Exterior ${exterior.id} added successfully`);
        } catch (err) {
            console.error('⚠️ error inserting exterior', err);
        }
    }

    for (const roof of RoofData) {
        const insertQuery = {
            text: 'INSERT INTO roof (id, name, image) VALUES ($1, $2, $3)'
        };
        const values = [
            roof.id,
            roof.name,
            roof.image
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Roof ${roof.id} added successfully`);
        } catch (err) {
            console.error('⚠️ error inserting roof', err);
        }
    }

    for (const wheels of WheelsData) {
        const insertQuery = {
            text: 'INSERT INTO wheels (id, name, image) VALUES ($1, $2, $3)'
        };
        const values = [
            wheels.id,
            wheels.name,
            wheels.image
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Wheels ${wheels.id} added successfully`);
        } catch (err) {
            console.error('⚠️ error inserting wheels', err);
        }
    }

    for (const interior of InteriorData) {
        const insertQuery = {
            text: 'INSERT INTO interior (id, name, image) VALUES ($1, $2, $3)'
        };
        const values = [
            interior.id,
            interior.name,
            interior.image
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Interior ${interior.id} added successfully`);
        } catch (err) {
            console.error('⚠️ error inserting interior', err);
        }
    }

    for (const car of CarsData) {
        const insertQuery = {
            text: 'INSERT INTO cars (id, name, exterior, roof, wheels, interior) VALUES ($1, $2, $3, $4, $5, $6)'
        };
        const values = [
            car.id,
            car.name,
            car.exterior,
            car.roof,
            car.wheels,
            car.interior
        ];

        try {
            await pool.query(insertQuery, values);
            console.log(`✅ Car ${car.id} added successfully`);
        } catch (err) {
            console.error('⚠️ error inserting car', err);
        }
    }

}

const fixSequentialId = () => {
    try {
        const fixQuery = `SELECT setVal(pg_get_serial_sequence('cars', 'id'), (SELECT MAX(id) FROM cars) + 1)`;
        pool.query(fixQuery)
        console.log('🎉 cars table fixed sequential id successfully')
    } catch (err) {
        console.error('Error fixing sequential id', err)
    }
}

const main = async () => {
    await seedCarsTable();
    fixSequentialId();
};

main();

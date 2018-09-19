// const { Pool, Client } = require( 'pg' );

const express = require( 'express' );

const app = express();
const PORT = process.env.PORT || 5000;

const pg = require( 'pg' );
const Pool = pg.Pool;

const pool = new Pool( {
    database: 'shoe_store', // name of database
    host: 'localhost', // where it is
    port: 5432, // port for your database, 5432 is default for postgres
    max: 10, // how many simultaneous connections
    idleTimeoutMillis: 30000 // timeout time
} )

// pool.on( 'connect', () => {
//     console.log( '### Postgresql connected' );
// } )
// pool.on( 'error', ( error ) => {
//     console.log( '### Error with postgres pool:', error );
// } )

pool.connect( ( err ) => {
    if ( err ) {
        console.log( 'something broke man', err );
    } else {
        console.log( 'up and running!' );
    }
} );



app.get( '/shoes', ( req, res ) => {


    pool.query( `SELECT * FROM "shoes";` )
        .then( ( results ) => {
            console.log( '### Back from db with:' );
            console.log( results.rows );

            res.send( results.rows );

        } ).catch( ( error ) => {
            console.log( '### Error with SQL select for shoes:', error );
        } );

} );

// Spin up the server
app.listen( PORT, () => {
    console.log( '### Server up and listening on', PORT, '. . .' );
} ) // Snd spin up server

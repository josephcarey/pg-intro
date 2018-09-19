// const { Pool, Client } = require( 'pg' );

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

pool.query( `SELECT * FROM "shoes";` )
    .then( ( results ) => {
        console.log( '### Back from db with:' );
        console.log( results.rows );
    } ).catch( ( error ) => {
        console.log( '### Error with SQL select for shoes:', error );
    } );
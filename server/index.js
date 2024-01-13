const server = require("./src/server");
const { conn } = require('./src/db.js');
const syncApiDb = require('./src/controllers/APItoDB/syncApiDb');
const PORT = 3001;


conn.sync({ force: true }).then(

async() => { await syncApiDb();
  
        server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        })

})

.catch(error => console.error(error))


// conn.sync({ force: true }).then(

//   server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
//   })
//   ).catch(error => console.error(error))

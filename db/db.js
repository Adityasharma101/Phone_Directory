const { use } = require("express/lib/application");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  database: "contactdb",
  user: "contactuser",
  password: "contactpass",
});

function getContactDetail() {
  return new Promise(function (resolve, reject) {
    connection.query(
      `SELECT * FROM  contact_data ORDER BY name ASC`,
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

function insertContactDetails(name, phone, email) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `INSERT INTO contact_data(name,phone,email)
            values(?,?,?)`,
      [name, phone, email],
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

function deleteContactDetail(name) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `DELETE FROM contact_db WHERE name="(name)"`,
      [name],
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
  


// function editContactDetail(id){
//     return new Promise(function(resolve,reject){
//         connection.query(
//             `SELECT * FROM contact_data WHERE id =${id}`,
//             function(err,results){
//                 if(err){
//                     reject(err);
//                 }
//                 else{
//                     resolve(results);
//                 }
//             }
//         );
//     });

// }

// function updateContactDetail(name,phone,email,userId){
//   return new Promise(function (resolve, reject) {
//     connection.query(
//       `UPDATE contact_data name="name",phone="phone",email="email" WHERE id=userId 
//         values(?,?,?,?)`,
        
//       [name, phone, email,userId],
//       function (err, results) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       }
//     );
//   });
// }

exports = module.exports = {
  getContactDetail,
  insertContactDetails,
  deleteContactDetail,
 
  
};

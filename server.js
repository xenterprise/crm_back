const firebase = require("firebase-admin");
const serviceAccount = require("./placeholders/dyno-crm-firebase-adminsdk-iz99h-8d838e14cf.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://dyno-crm-default-rtdb.firebaseio.com/",
});

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

function addNewData(store, data) {
  // Fetch the user's email.
  var testRef = firebase.database().ref("/dynoclients/tenco");
  var storesRef = testRef.child(`/${store}`);
  var newChildKey = storesRef.push().getKey();
  storesRef.child(newChildKey).set(data);
  return newChildKey;
}

function addNewLinkages(store, baseKey, childKey) {
  // Fetch the user's email.
  var testRef = firebase.database().ref(`/dynoclients/tenco/${store}`);
  var storesRef = testRef.child(`/${baseKey}`);
  storesRef.child(childKey).set(true);
}

// app.use(cors());
// app.listen(process.env.PORT || 3001, () => {
//   console.log("Server Started");
// });

// var companyKey = addNewData("company", {
//   name: "Bel Energy",
//   license: "4587545",
// });
// var userKey = addNewData("user", {
//   name: "tahir",
//   email: "mobeenyounis@gmail.com",
// });
// var projectKey = addNewData("project", {
//   trackingCode: "546",
//   serviceType: "NTN",
// });

// addNewLinkages("company_user", companyKey, userKey);
// addNewLinkages("company_project", companyKey, projectKey);


// app.get("/test", (req, res, next) => {
//   console.log({ res: "Hello" });
//   res.status(200).json({ res: "Hello" });
// });

app.post("/user", function(req, res) {
  var userKey = addNewData("user", {
    name: req.body.name,
    email: req.body.email,
    // phone: req.body.phone,
    // careof: req.body.careOf,
    // source: req.body.source,
    // cnic: req.body.cnic,
    // city: req.body.city,
    // contactDate: req.body.contactDate,
    // notes: req.body.notes,
    // dob: req.body.dob,
    // isEmp: false,
    // level:1

  });
  res.status(200).send("User Added")
});

app.get("/test", function(req, res) {
  res.status(200).send("Hello test call")
});


app.listen(8080, function(){
  // console.log("server is running on port 3000");
})
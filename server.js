const firebase = require("firebase-admin");
const serviceAccount = require("./placeholders/dyno-crm-firebase-adminsdk-iz99h-8d838e14cf.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://dyno-crm-default-rtdb.firebaseio.com/",
});

const express = require("express");
const cors = require("cors");
const app = express();

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

var companyKey = addNewData("company", {
  name: "Bel Energy",
  license: "4587545",
});
var userKey = addNewData("user", {
  name: "tahir",
  email: "mobeenyounis@gmail.com",
});
var projectKey = addNewData("project", {
  trackingCode: "546",
  serviceType: "NTN",
});

addNewLinkages("company_user", companyKey, userKey);
addNewLinkages("company_project", companyKey, projectKey);
// app.get("/test", (req, res, next) => {
//   console.log({ res: "Hello" });
//   res.status(200).json({ res: "Hello" });
// });

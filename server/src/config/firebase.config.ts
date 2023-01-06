import admin from 'firebase-admin'
import  serviceAccount from "./serviceAccount.json";


admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))
});

export default admin


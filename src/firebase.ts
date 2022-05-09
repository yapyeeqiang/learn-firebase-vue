import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyB1UIAk5UZkmuG_Aa7F5klik5kAeiCk3zw',
    authDomain: 'learn-firebase-vue-358b1.firebaseapp.com',
    projectId: 'learn-firebase-vue-358b1',
    storageBucket: 'learn-firebase-vue-358b1.appspot.com',
    messagingSenderId: '186036335954',
    appId: '1:186036335954:web:b7f0019a58a8ce2864768b',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

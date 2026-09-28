// firebase.js - Juba Stadium - جاهز 100%
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdf_94IqKuAqaJv2yTaHnlabXydICevLo",
  authDomain: "juba-stadium.firebaseapp.com",
  projectId: "juba-stadium",
  storageBucket: "juba-stadium.firebasestorage.app",
  messagingSenderId: "959214976918",
  appId: "1:959214976918:web:08bcefd63d3f5607cf27b7",
  measurementId: "G-E9XLCERYDE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// دالة حجز
export async function bookStadium(team, phone, date){
  await addDoc(collection(db, "bookings"), {
    team: team,
    phone: phone,
    date: date,
    createdAt: serverTimestamp()
  });
}

// دالة عرض الحجوزات لايف
export function listenBookings(callback){
  const q = query(collection(db, "bookings"), orderBy("createdAt","desc"));
  onSnapshot(q, (snap)=>{
    let list = [];
    snap.forEach(doc=> list.push(doc.data()));
    callback(list);
  });
}

console.log("✅ Firebase Connected - Juba Stadium");

import app from 'firebase/app';
import 'firebase/firestore';

export const config = {
    apiKey: "AIzaSyBz86p_Wdi_WBkLpcxhMaph4geiv69bcNc",
    authDomain: "fadderuke-matnat.firebaseapp.com",
    databaseURL: "https://fadderuke-matnat.firebaseio.com",
    projectId: "fadderuke-matnat",
    storageBucket: "fadderuke-matnat.appspot.com",
    messagingSenderId: "909444728352",
    appId: "1:909444728352:web:09ee2da490aafc00"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.firestore();
    } 

    fetchEvents(setEventsCallback) {
        this.db.collection('events').onSnapshot(snapshot => {
            const events = snapshot.docs.map(doc => {
                return doc.data();
            });
            console.log("Events fetched successfully!")
            setEventsCallback(events);
        })
    }

    fetchGroupNames(setGroupNamesCallback) {
        this.db.collection('groups').onSnapshot(snapshot => {
            const groupNames = snapshot.docs.map(doc => {
                return doc.data();
            });
            console.log("Group names fetched successfully!")
            setGroupNamesCallback(groupNames)
        })
    }
}

export default Firebase;
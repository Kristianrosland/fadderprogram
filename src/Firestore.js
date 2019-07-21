import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
        this.auth = app.auth()
    } 

    fetchEvents(setEventsCallback) {
        this.db.collection('events').onSnapshot(snapshot => {
            const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), subEvents: [] }));
            setEventsCallback(events);
            console.log("Events fetched successfully!");
        })
    }

    fetchSubEvents(setSubeventsCallback) {
        this.db.collection('subevents').onSnapshot(subSnapshot => {
            setSubeventsCallback(subSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
            console.log("Sub-events fetched successfully!");
        })
    }

    fetchGroupNames(setGroupNamesCallback) {
        this.db.collection('groups').onSnapshot(snapshot => {
            const groupNames = snapshot.docs.map(doc => {
                return doc.data();
            });
            setGroupNamesCallback(groupNames)
        }, console.log)
    }

    login(email, password, errorCallback) {
        this.auth.signInWithEmailAndPassword(email, password).catch((error) => {
            errorCallback(error);
        });  
    }

    logout() {
        this.auth.signOut();
    }

    registerForAuthUpdates(callback, loadingCallback) {

        this.auth.onAuthStateChanged(user => {
            if (user) {
                callback(user);
                loadingCallback(false);
            } else {
                callback(undefined);
                loadingCallback(false);
            }
        })
    }

    fetchGroupsThatUserAdministrates(userId, callback) {
        this.db.collection('writePermissions').doc(userId).get().then(doc => {
            if (doc.exists) {
                const groups = doc.data().groups;
                if (groups === 'all') { callback(groups); }
                else {
                    callback(groups);    
                }
            }
        })
    }

    addEvent(event, uid) {
        if (event) {
            return this.db.collection('events').add({...event, createdBy: uid });
        }
    }

    removeEvent(event_id) {
        if (event_id) {
            return this.db.collection('events').doc(event_id).delete();
        }
    }

    addSubEvent(event, uid) {
        if (event) {
            return this.db.collection('subevents').add({ ...event, createdBy: uid });
        }
    }

    removeSubEvent(event_id) {
        if (event_id) {
            return this.db.collection('subevents').doc(event_id).delete();
        }
    }

    updateEvent(event) {
        if (event) {
            return this.db.collection('events').doc(event.id).set(event);
        }
    }
}

export default Firebase;
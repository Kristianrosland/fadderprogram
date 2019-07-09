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
            this.db.collection('subevents').onSnapshot(subSnapshot => {
                subSnapshot.docs.map(d => d.data()).forEach(subEvent => {
                    const subId = subEvent.parent_event_id;
                    for (const event of events) {
                        if (event.id === subId) {
                            event.subEvents.push(subEvent);
                        }
                    }
                }, console.log)
                setEventsCallback(events);
            }, console.log)
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

    logout(callback) {
        this.auth.signOut().then(callback(undefined));
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

    addEvent(event) {
        if (event) {
            this.db.collection('events').add(event)
        }
    }
}

export default Firebase;
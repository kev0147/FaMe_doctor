import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, onChildAdded, set, get, child, DatabaseReference } from "firebase/database";
import { Doctor, Message, Notif, Profile } from './models';

const firebaseConfig = {
  apiKey: "AIzaSyAKpFyD-s6lg4Aad9X379Ttd9Zj_4Ex1nc",
  authDomain: "kajy-be921.firebaseapp.com",
  databaseURL: "https://kajy-be921-default-rtdb.firebaseio.com",
  projectId: "kajy-be921",
  storageBucket: "kajy-be921.appspot.com",
  messagingSenderId: "37541453098",
  appId: "1:37541453098:web:2505af80948f4b9cabd253",
  measurementId: "G-4BKL9HJ2TS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  getReference(doctorId: string): DatabaseReference {
    return ref(db, `chat/${doctorId}/`);
  }

  createNotification(notif: Notif) {
    push(ref(db, `notifications/`), { patient: notif.patient, type: 'inscription medecin', date: new Date().toISOString(), dismissed: false });
  }

  createNewChat(doctorId: string) {
    let reference = this.getReference(doctorId);
    set(reference, {});
    push(reference, { receiver: doctorId, sender: 1, message: `Bonjour . Comment allez vous ?` });

    let notification: Notif = {
      patient: doctorId,
      type: 'inscription medecin',
      date: new Date().toISOString(),
      dismissed: false
    }
    this.createNotification(notification);
  }

  sendMessageToAdministration(doctorId: string, message: string) {
    let reference = this.getReference(doctorId);
    let time = this.getTheCurrentDate();
    push(reference, { sender: doctorId, receiver: 1, message: message, time: time });
  }


  getMessagesRealtime(doctorId: string, messages: Message[]): Message[] {
    let reference = this.getReference(doctorId);
    onChildAdded(reference, (snapshot) => {
      let messageObject: Message = snapshot.val();
      messages.push(messageObject);
    })
    return messages;
  }

  getMessagesStatic(doctorId: string, messages: Message[]): Message[] {
    let reference = this.getReference(doctorId);
    get(reference).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        snapshot.forEach((message) => {
          let messageObject: Message = {
            key: message.key,
            sender: message.val().sender,
            receiver: message.val().receiver,
            message: message.val().message
          }
          messages.push(messageObject);
        })
      } else {
        console.log("No data available");
        this.createNewChat(doctorId);
        this.getMessagesStatic(doctorId, messages);
      }
    }).catch((error) => {
      console.error(error);
    });
    return messages;
  }


  /*sendMessageToAny(doctor: Doctor, message: string, profileDestination: Profile) {
    let reference = this.getReference(doctor.id!);
    push(reference, { sender: doctor.profile.id, receiver: profileDestination.id, message: message });
    reference = ref(db, 'messages/' + profileDestination.id);
    push(reference, { sender: patient.profile.id, receiver: profileDestination.id, message: message });
  }*/

  getTheCurrentDate(): string {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let currentDate = `${day}-${month}-${year} ${hour}:${minute}`;
    return currentDate;
  }
}

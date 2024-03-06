import { Component } from '@angular/core';
import { ChatsService } from '../chats.service';

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, onChildAdded, set, DatabaseReference } from "firebase/database";
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../models';

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



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messageText = '';
  
  messages: Message[] = []

  doctorId: string | undefined;

  constructor(private chatsService: ChatsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.queryParams.subscribe(params => this.createChat(params['doctorId']), error => this.onError(error));
  }

  onError(error: any) {
    console.log(error);
    this.router.navigate(['']);
  }

  createChat(doctorId: string) {
    if(doctorId){
      this.doctorId = doctorId;
      this.chatsService.createNewChat(doctorId);
      this.messages = this.chatsService.getMessagesRealtime(doctorId, this.messages);
    }else{
      console.log('pas de patient');
    }
  }

  sendMessage() {
    if (this.doctorId) {
      this.chatsService.sendMessageToAdministration(this.doctorId, this.messageText);
      this.messageText = '';
    }
  }
}
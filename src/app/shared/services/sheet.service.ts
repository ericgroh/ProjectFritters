import { collection, Firestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Sheet } from '../models/sheet';
import { addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  sheetsCollection;

  constructor(
    private userService: UserService,
    private store: Firestore,
  ) {
    this.sheetsCollection = collection(this.store, "sheets");
  }

  createSheet(sheet: Partial<Sheet>) {
    this.userService.getCurrentUser().subscribe(user => {
      console.log(user);
      sheet.owner = user.uid;

      return addDoc(this.sheetsCollection, sheet);
    });

  }
}

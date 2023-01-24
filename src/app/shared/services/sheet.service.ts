import { PropType } from './../models';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sheet } from '../models/sheet';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  sheetsCollection: AngularFirestoreCollection<Sheet>;
  propTypesCollection: AngularFirestoreCollection<PropType>;
  propTypes$: Observable<PropType[]>

  constructor(
    private afs: AngularFirestore,
  ) {
    this.sheetsCollection = this.afs.collection<Sheet>("sheets");
    this.propTypesCollection = this.afs.collection<PropType>("propTypes");

    this.propTypes$ = this.propTypesCollection.valueChanges();
  }

  createSheet(sheet: Sheet) {
    sheet.id = this.afs.createId();;
    this.sheetsCollection.doc(sheet.id).set(sheet);
    return sheet.id
  }

  getSheet(id: string): AngularFirestoreDocument<Sheet> {
    console.log("called", id);
    return this.sheetsCollection.doc(id);
  }

  getPublicSheets(): AngularFirestoreCollection<Sheet> {
    return this.afs.collection<Sheet>("sheets", ref => ref.where(`isPublic`, `==`, true));
  }

  update(sheet: Sheet) {
    return this.sheetsCollection.doc(sheet.id).set(sheet);
  }
}

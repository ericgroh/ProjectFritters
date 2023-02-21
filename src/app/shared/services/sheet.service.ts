import { Key } from './../models/key';
import { Answer, Prop, Status, User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { PropType } from './../models';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sheet, Entry } from '../models';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  sheetsCollection: AngularFirestoreCollection<Sheet>;
  propTypesCollection: AngularFirestoreCollection<PropType>;
  propTypes$: Observable<PropType[]>;

  constructor(
    private afs: AngularFirestore,
    private readonly userService: UserService
  ) {
    this.sheetsCollection = this.afs.collection<Sheet>("sheets");
    this.propTypesCollection = this.afs.collection<PropType>("propTypes");

    this.propTypes$ = this.propTypesCollection.valueChanges();
  }

  createSheet(sheet: Sheet) {
    sheet.id = this.afs.createId();
    this.sheetsCollection.doc(sheet.id).set(sheet);
    return sheet.id
  }

  getSheet(id: string): AngularFirestoreDocument<Sheet> {
    return this.sheetsCollection.doc(id);
  }

  getAvailableSheets(): AngularFirestoreCollection<Sheet> {
    return this.afs.collection<Sheet>("sheets", ref => ref.where(`isPublic`, `==`, true)
      .where(`status`, `==`, Status.Finalized)
      .where(`eventTime`, `>`, new Date().getTime()));
  }

  getCurrentUserSheets(): AngularFirestoreCollection<Sheet> {
    const userId = this.userService.getCurrentUserId();
    return this.afs.collection<Sheet>("sheets", ref => ref.where(`ownerId`, `==`, userId));
  }

  getUserSheets(userId: string) {
    return this.afs.collection<Sheet>("sheets", ref => ref.where(`ownerId`, `==`, userId));
  }

  update(sheet: Sheet) {
    return this.sheetsCollection.doc(sheet.id).update(sheet);
  }

  addProp(sheet: Sheet, prop: Prop) {
    prop.id = this.afs.createId();
    prop.position = 0;
    return this.sheetsCollection.doc(sheet.id).collection<Prop>("props").doc(prop.id).set(prop);
  }

  addTieBreaker(sheet: Sheet, prop: Prop) {
    sheet.tieBreaker = prop;
    return this.sheetsCollection.doc(sheet.id).update(sheet);
  }

  getProps(sheetId: string): AngularFirestoreCollection<Prop> {
    return this.sheetsCollection.doc(sheetId).collection<Prop>("props", ref => ref.orderBy('position'));
  }

  updateSheetProp(sheetId: string, prop: Prop) {
    this.afs.collection<Sheet>("sheets").doc(sheetId).collection<Answer>("props").doc(prop.id).update(prop);
  }


}

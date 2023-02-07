import { Key } from './../models/key';
import { Answer, Prop, Status, User, Choice } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { PropType } from './../models';
import { Observable, pipe, map } from 'rxjs';
import { Injectable, Query } from '@angular/core';
import { Sheet, Entry } from '../models';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { QuerySnapshot } from '@angular/fire/firestore';

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
    return this.afs.collection<Sheet>("sheets", ref => ref.where(`isPublic`, `==`, true).where(`status`, `==`, Status.Finalized));
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
    return this.sheetsCollection.doc(sheet.id).collection<Prop>("props").doc(prop.id).set(prop);
  }

  getProps(sheetId: string): AngularFirestoreCollection<Prop> {
    return this.sheetsCollection.doc(sheetId).collection<Prop>("props");
  }

  updateSheetPropAnswer(sheetId: string, prop: Prop) {
    this.afs.collection<Sheet>("sheets").doc(sheetId).collection<Answer>("props").doc(prop.id).update(prop);
  }

  join(sheet: Sheet) {
    let batch = this.afs.firestore.batch()
    const id = this.afs.createId();
    const userId = this.userService.getCurrentUserId();
    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ ...c.payload.data() }) as User)
    ).subscribe(user => {
      this.sheetsCollection.doc(sheet.id).collection<Prop>("props").snapshotChanges().pipe(
        map(changes => changes.map(c => ({ ...c.payload.doc.data() }) as Prop))).subscribe(props => {

          const entry: Entry = {
            id,
            userId,
            sheetId: sheet.id,
            userName: user.username,
            sheetName: sheet.name,
            sheetOwner: sheet.ownerName,
            eventTime: sheet.eventTime,
            score: 0,
            rank: -1,
            updatedAt: new Date().toISOString()
          };
          batch.set(this.afs.collection("entries").doc(id).ref, entry);

          props.forEach((prop: Prop) => {
            batch.set(this.afs.collection("entries").doc(id).collection<Prop>("props").doc(prop.id).ref, prop);
          });

          sheet.participants = sheet.participants + 1;
          batch.set(this.afs.collection("sheets").doc(sheet.id).ref, sheet);

          batch.commit().then(() => console.log("success")).catch(err => console.log("error", err));
        });
    });



    return id;
  }

  getCurrentUserEntries(): AngularFirestoreCollection<Entry> {
    const userId = this.userService.getCurrentUserId();
    return this.afs.collection<Entry>("entries", ref => ref.where(`userId`, `==`, userId));
  }

  getEntry(entryId: string): AngularFirestoreDocument<Entry> {
    return this.afs.collection<Entry>("entries").doc(entryId);
  }

  getEntryProps(entryId: string): AngularFirestoreCollection<Prop> {
    return this.afs.collection<Entry>("entries").doc(entryId).collection<Prop>("props");
  }

  updateEntry(entry: Entry) {
    entry.updatedAt = new Date().toISOString();
    return this.afs.collection<Entry>("entries").doc(entry.id).update(entry)
  }

  updateEntryAnswer(entryId: string, answer: Answer) {
    return this.afs.collection<Entry>("entries").doc(entryId).collection<Answer>("props").doc(answer.id).update(answer);
  }

  getEntries(sheetId: string): AngularFirestoreCollection<Entry> {
    console.log("querying collection");
    return this.afs.collection<Entry>("entries", ref => ref.where(`sheetId`, `==`, sheetId));
  }

  getKey(id: string) {
    return this.afs.collection<Key>("keys").doc(id);
  }

  updateKey(key: Key) {
    return this.afs.collection<Key>("keys").doc(key.id).update(key)
  }

  updateEntries(sheetId: string, propId: string, answer: Choice) {
    this.afs.collection<Entry>("entries", ref => ref.where(`sheetId`, `==`, sheetId)).ref.get().then(querySnapshot => {
      let entries = querySnapshot.docs;
      entries.map(entrySnapshot => {
        let entry = entrySnapshot.data();
        this.afs.collection<Entry>("entries").doc(entry.id).collection<Prop>("props").doc(propId).ref.get().then(ds => {
          let entryProp = ds.data();
          if (entryProp) {
            if (entryProp.isCorrect) {
              entry.score -= 1;
              entryProp.isCorrect = false;
            }

            if (entryProp.answer == answer) {
              entryProp.isCorrect = true;
              entry.score += 1;
            }
            let batch = this.afs.firestore.batch();
            batch.set(this.afs.collection("entries").doc(entry.id).ref, entry);
            batch.set(this.afs.collection("entries").doc(entry.id).collection("props").doc(entryProp.id).ref, entryProp);
            batch.commit().then(() => console.log("success")).catch(err => console.log("error", err));
          }
        })
      })
    })
  }
}

import { map } from 'rxjs';
import { Entry, Prop, Answer, Choice, Sheet, User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private readonly userService: UserService,
    private afs: AngularFirestore,
  ) { }

  create(sheet: Sheet) {
    let batch = this.afs.firestore.batch()
    const id = this.afs.createId();
    const userId = this.userService.getCurrentUserId();
    this.userService.getCurrentUser().snapshotChanges().pipe(
      map(c => ({ ...c.payload.data() }) as User)
    ).subscribe(user => {
      this.afs.collection<Sheet>('sheets').doc(sheet.id).collection<Prop>("props").snapshotChanges().pipe(
        map(changes => changes.map(c => ({ ...c.payload.doc.data() }) as Prop))).subscribe(props => {

          const entry: Entry = {
            id,
            userId,
            sheetId: sheet.id,
            userName: user.username,
            sheetName: sheet.name,
            sheetOwner: sheet.ownerName,
            eventTime: sheet.eventTime,
            tieBreaker: sheet.tieBreaker,
            tieBreakerScore: 0,
            score: 0,
            rank: -1,
            updatedAt: new Date().getTime()
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
    return this.afs.collection<Entry>("entries").doc(entryId).collection<Prop>("props", ref => ref.orderBy('position'));
  }

  update(entry: Entry) {
    entry.updatedAt = new Date().getTime();
    return this.afs.collection<Entry>("entries").doc(entry.id).update(entry)
  }

  updateEntryAnswer(entryId: string, answer: Answer) {
    return this.afs.collection<Entry>("entries").doc(entryId).collection<Answer>("props").doc(answer.id).update(answer);
  }

  getEntries(sheetId: string): AngularFirestoreCollection<Entry> {
    return this.afs.collection<Entry>("entries", ref => ref.where(`sheetId`, `==`, sheetId));
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

  updateEntriesTieBreaker(sheetId: string, answer: number) {
    this.afs.collection<Entry>("entries", ref => ref.where(`sheetId`, `==`, sheetId)).ref.get().then(querySnapshot => {
      let entries = querySnapshot.docs;
      entries.map(entrySnapshot => {
        let entry: Entry = entrySnapshot.data();
        entry.tieBreakerScore = Math.abs((entry.tieBreaker.answer || 0) - answer);
        this.afs.collection<Entry>("entries").doc(entry.id).update(entry);
      })
    })
  }
}

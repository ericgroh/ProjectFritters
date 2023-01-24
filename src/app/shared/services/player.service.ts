import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Player } from './../models';
import { addDoc, collection, Firestore, writeBatch, doc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playersCollection;
  constructor(
    private store: Firestore,
  ) {
    const ref = doc(store, 'test/1');
    this.playersCollection = collection(this.store, "players");

  }

  createPlayer(data: any) {
    const player: Partial<Player> = {
      firstName: data.firstName,
      lastName: data.lastName,
      score: 0
    }

    return addDoc(this.playersCollection, player); //this.playersCollection.//this.db.collection('players').add(player);
  }

  getAllPlayers(): Observable<Player[]> {
    return collectionData(this.playersCollection, { idField: 'id' }) as Observable<Player[]>;
  }

  updateScores(players: Partial<Player[]>) {
    console.log(players);
    const batch = writeBatch(this.store);

    // let batch = this.db.firestore.batch();
    players.map((player: any) => {
      console.log(player);
      let ref = doc(this.store, 'players', player.id)
      batch.update(ref, { score: player.score })
    });

    batch.commit();
  }
}

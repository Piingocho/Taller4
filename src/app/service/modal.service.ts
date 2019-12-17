import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];

  private currentModalSub: BehaviorSubject<any>;
  public currentModal: Observable<any>;

  constructor() { 
    this.currentModalSub = new BehaviorSubject<any>(null);
    this.currentModal = this.currentModalSub.asObservable();
  }

  add(modal: any) {
    this.modals.push(modal);
    this.currentModalSub.next(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
    this.currentModalSub.next(null);
  }

  open(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
    this.currentModalSub.next(id);
  }

  close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
    this.currentModalSub.next(null);
  }

}

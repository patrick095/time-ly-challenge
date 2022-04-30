import { EventEmitter, Injectable } from '@angular/core';
import { ModalInterface } from '../interfaces/modal.interface';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    public modalData: EventEmitter<ModalInterface>;

    constructor() {
        this.modalData = new EventEmitter();
    }

    public open(data: ModalInterface): void {
        this.modalData.next(data);
    }

    public close(): void {
        this.modalData.next(null);
    }
}

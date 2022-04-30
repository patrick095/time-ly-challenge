import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../interfaces/calendar-events.interface';
import { ModalInterface } from '../../interfaces/modal.interface';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    public data?: ModalInterface;
    public event: CalendarEvent;
    public events: CalendarEvent[];
    public now: Date;

    constructor(private service: ModalService) {
        this.events = [];
        this.event = null;
        this.now = new Date();
    }

    ngOnInit() {
        this.service.modalData.subscribe((data: ModalInterface | null) => {
            this.data = data;
            if (data) {
                if (Array.isArray(data.data)) {
                    this.events = data.data;
                } else {
                    this.event = data.data;
                }
            } else {
                this.close();
            }
        });
    }

    public close(): void {
        this.data = null;
        this.event = null;
        this.events = [];
    }

    public showEvent(event: CalendarEvent): void {
        this.event = event;
    }

    public hideEvent(): void {
        this.event = null;
    }
}

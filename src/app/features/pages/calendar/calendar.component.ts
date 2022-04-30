import { Component, ChangeDetectionStrategy, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from '../../../core/interfaces/calendar-events.interface';
import { ColorInterface } from '../../../core/interfaces/color.interface';
import { basicColors } from '../../../core/config/basic-colors';
import { environment } from '../../../../environments/environment';
import { ModalService } from '../../../core/services/modal.service';
import { TimeLyApiService } from '../../services/time-ly-api.service';
import { CoverterUtil } from '../../../core/utils/converter.util';

@Component({
    selector: 'app-mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./calendar.component.scss'],
    templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
    @ViewChild('searchInput', { static: true }) private searchInput: ElementRef<HTMLInputElement>;

    public view: CalendarView = CalendarView.Month;
    public CalendarView = CalendarView;
    public viewDate: Date = new Date();
    public modalData: {
        action: string;
        event: CalendarEvent;
    };
    public refresh = new Subject<void>();
    public events: CalendarEvent[];
    public activeDayIsOpen = false;
    public isShowSearchInput: boolean;
    public eventFinder: CalendarEvent[];
    private colors: ColorInterface;
    private id: number;
    private urlId: string;

    constructor(private apiService: TimeLyApiService, private modal: ModalService, private converter: CoverterUtil) {
        this.colors = basicColors;
        this.urlId = environment.calendarUrlId;
        this.isShowSearchInput = false;
        this.eventFinder = [];
    }

    ngOnInit() {
        this.apiService.getCalendarInfo(this.urlId).subscribe((info) => {
            this.id = info.data.id;
            this.getEvents();
        });
    }

    public getEvents(): void {
        this.apiService.getCalendarEvents(this.id).subscribe((events) => {
            this.events = events.data.items.map((event) => this.converter.ApiDataToCalendarEvent(event, this.colors)).reverse();
            this.refresh.next();
        });
    }

    public search(value: string) {
        const date = this.converter.stringToDate(value);
        this.eventFinder = this.events.filter((event) => event.title.toLowerCase().includes(value));

        if (value === '') {
            this.clearSearch();
        }

        if (date) {
            this.viewDate = new Date(date);
        }
    }

    public showSearch() {
        this.isShowSearchInput = !this.isShowSearchInput;
        if (this.isShowSearchInput) {
            this.searchInput.nativeElement.focus();
        } else {
            this.clearSearch();
        }
    }

    public clickSearchResult(event: CalendarEvent) {
        this.clearSearch();
        this.openModal({
            date: event.start,
            events: [event],
        });
    }

    public openModal({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        const modalData = {
            title: date,
            data: events,
        };
        this.modal.open(modalData);
    }

    private clearSearch(): void {
        this.searchInput.nativeElement.value = '';
        this.eventFinder = [];
    }
}

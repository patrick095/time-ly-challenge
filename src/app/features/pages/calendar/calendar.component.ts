import { Component, ChangeDetectionStrategy, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarView } from 'angular-calendar';
import { CalendarEvent, CalendarEventTimelyInterface } from '../../../core/interfaces/calendar-events.interface';
import { ColorInterface } from '../../../core/interfaces/color.interface';
import { basicColors } from '../../../core/config/basic-colors';
import { environment } from '../../../../environments/environment';
import { ModalService } from '../../../core/services/modal.service';
import { TimeLyApiService } from '../../services/time-ly-api.service';

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

    constructor(private apiService: TimeLyApiService, private modal: ModalService) {
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
            this.events = events.data.items.map((event) => this.convertApiEventToCalendarEvent(event)).reverse();
            this.refresh.next();
        });
    }

    public console(item: any) {
        // eslint-disable-next-line no-console
        console.log(item);
    }

    public search(value: string) {
        this.eventFinder = this.events.filter((event) => event.title.toLowerCase().includes(value));
        this.console(value);
        if (value === '') {
            this.clearSearch();
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

    private convertApiEventToCalendarEvent(event: CalendarEventTimelyInterface): CalendarEvent {
        return {
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            title: event.title,
            color:
                event.taxonomies && event.taxonomies.taxonomy_category && event.taxonomies.taxonomy_category[0].color
                    ? event.taxonomies.taxonomy_category[0].color
                    : this.colors.blue,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            shortDescription: event.description_short,
            images: event.images,
        };
    }
}

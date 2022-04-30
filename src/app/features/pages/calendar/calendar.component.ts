import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CalendarEventTimelyInterface } from 'src/app/core/interfaces/calendar-events.interface';
import { ColorInterface } from 'src/app/core/interfaces/color.interface';
import { basicColors } from 'src/app/core/config/basic-colors';
import { environment } from 'src/environments/environment';
import { TimeLyApiService } from '../../services/time-ly-api.service';

@Component({
    selector: 'mwl-demo-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./calendar.component.scss'],
    templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
    @ViewChild('modalContent', { static: true }) private modalContent: TemplateRef<any>;

    public view: CalendarView = CalendarView.Month;

    public CalendarView = CalendarView;

    public viewDate: Date = new Date();

    public modalData: {
        action: string;
        event: CalendarEvent;
    };

    public actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    public refresh = new Subject<void>();

    public events: CalendarEvent[];

    public activeDayIsOpen: boolean = false;

    private colors: ColorInterface;
    private id: number;
    private urlId: string;

    constructor(private apiService: TimeLyApiService) {
        this.colors = basicColors;
        this.urlId = environment.calendarUrlId;
    }

    ngOnInit() {
        this.apiService.getCalendarInfo(this.urlId).subscribe((info) => {
            this.id = info.data.id;
            this.getEvents();
        });
    }

    public getEvents(): void {
        this.apiService.getCalendarEvents(this.id).subscribe((events) => {
            this.events = events.data.items.map((event) => this.convertApiEventToCalendarEvent(event));
            this.refresh.next();
            this.console(events.data.items);
        });
    }

    public console(item: any) {
        // eslint-disable-next-line no-console
        console.log(item);
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: this.colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    private convertApiEventToCalendarEvent(event: CalendarEventTimelyInterface): CalendarEvent {
        return {
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            title: event.title,
            color:
                event.taxonomies.taxonomy_category && event.taxonomies.taxonomy_category[0].color
                    ? event.taxonomies.taxonomy_category[0].color
                    : this.colors.blue,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        };
    }
}

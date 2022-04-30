import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEventsInterface } from 'src/app/core/interfaces/calendar-events.interface';
import { CalendarInfoInterface } from 'src/app/core/interfaces/calendar-info.interface';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class TimeLyApiService extends BaseService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getCalendarInfo(urlId: string): Observable<CalendarInfoInterface> {
        return this.get<CalendarInfoInterface>(`/calendars/info?url=${urlId}`);
    }

    public getCalendarEvents(calendarId: number): Observable<CalendarEventsInterface> {
        return this.get<CalendarEventsInterface>(`/calendars/${calendarId}/events`);
    }
}

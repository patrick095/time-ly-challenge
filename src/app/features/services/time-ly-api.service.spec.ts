import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseService } from 'src/app/core/services/base.service';

import { TimeLyApiService } from './time-ly-api.service';

describe('TimeLyApiService', () => {
    let service: TimeLyApiService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimeLyApiService, BaseService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.get(TimeLyApiService);
        http = TestBed.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have all baseService methods', () => {
        expect(service.get).toBeTruthy();
        expect(service.post).toBeTruthy();
        expect(service.put).toBeTruthy();
        expect(service.delete).toBeTruthy();
        expect(service.patch).toBeTruthy();
    });

    it('should have a getCalendarEvents method', () => {
        expect(service.getCalendarEvents).toBeTruthy();
    });

    it('should have a getCalendarInfo method', () => {
        expect(service.getCalendarInfo).toBeTruthy();
    });

    it('should return an Observable<CalendarEventsInterface> when calling getCalendarEvents', () => {
        const calendarId = 1;
        service.getCalendarEvents(calendarId).subscribe((data) => {
            expect(data).toBeTruthy();
            expect(data.constructor.name).toBe('CalendarEventsInterface');
        });
    });

    it('should return an Observable<CalendarInfoInterface> when calling getCalendarInfo', () => {
        const urlId = 'urlId';
        service.getCalendarInfo(urlId).subscribe((data) => {
            expect(data).toBeTruthy();
            expect(data.constructor.name).toBe('CalendarInfoInterface');
        });
    });

    it('should access the correct url when calling getCalendarEvents', () => {
        const calendarId = 1;
        const url = `/calendars/${calendarId}/events`;
        service.getCalendarEvents(calendarId).subscribe((data) => {
            expect(data).toBeTruthy();
            expect(data.constructor.name).toBe('CalendarEventsInterface');
            expect(http.request).toHaveBeenCalledWith('GET', url);
        });
    });

    it('should access the correct url when calling getCalendarInfo', () => {
        const urlId = 'urlId';
        const url = `/calendars/info?url=${urlId}`;
        service.getCalendarInfo(urlId).subscribe((data) => {
            expect(data).toBeTruthy();
            expect(data.constructor.name).toBe('CalendarInfoInterface');
            expect(http.request).toHaveBeenCalledWith('GET', url);
        });
    });
});

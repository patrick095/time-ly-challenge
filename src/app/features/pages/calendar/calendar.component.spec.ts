import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { calendarInfoMocky } from 'src/app/core/mockys/calendar-info.mocky';
import { calendarEventsMocky } from 'src/app/core/mockys/calendar-events.mocky';
import { ModalService } from 'src/app/core/services/modal.service';
import { CoverterUtil } from 'src/app/core/utils/converter.util';
import { ModalModule } from 'src/app/core/components/modal/modal.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarRoutingModule } from './calendar.routing.module';
import { TimeLyApiService } from '../../services/time-ly-api.service';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let httpMock: HttpTestingController;
    let injector: TestBed;
    const baseUrl = 'https://timelyapp.time.ly/api';

    function getCalendarInfo() {
        const req = httpMock.expectOne(`${baseUrl}/calendars/info?url=https://calendar.time.ly/6a37fb6n`);
        expect(req.request.method).toBe('GET');
        req.flush(calendarInfoMocky);
    }

    function getCalendarEvents() {
        const req = httpMock.expectOne(`${baseUrl}/calendars/54705442/events`);
        expect(req.request.method).toBe('GET');
        req.flush(calendarEventsMocky);
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarComponent],
            imports: [
                HttpClientTestingModule,
                CalendarRoutingModule,
                ModalModule,
                FormsModule,
                CalendarModule.forRoot({
                    provide: DateAdapter,
                    useFactory: adapterFactory,
                }),
                MatNativeDateModule,
                MatDatepickerModule,
            ],
            providers: [TimeLyApiService, ModalService, CoverterUtil],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        getCalendarInfo();
        getCalendarEvents();
        expect(component).toBeTruthy();
    });

    it('should get calendar Events', () => {
        getCalendarInfo();
        getCalendarEvents();
        expect(component.events.length > 0).toBe(true);
    });

    it('should render calendar', () => {
        getCalendarInfo();
        getCalendarEvents();
        const calendar = fixture.nativeElement.querySelector('.cal-month-view');
        expect(calendar).toBeTruthy();
    });

    it('should click search button to show and close serach input', () => {
        getCalendarInfo();
        getCalendarEvents();
        const searchButton = fixture.nativeElement.querySelector('.search button');
        searchButton.click();
        fixture.detectChanges();
        expect(component.isShowSearchInput).toBeTruthy();
        searchButton.click();
        fixture.detectChanges();
        expect(component.isShowSearchInput).toBeFalsy();
    });

    it('should search for events', () => {
        const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('.search input');
        getCalendarInfo();
        getCalendarEvents();
        expect(searchInput.classList.contains('hide-input')).toBe(true);
        const searchButton = fixture.nativeElement.querySelector('.search button');
        searchButton.click();
        fixture.detectChanges();
        expect(searchInput.classList.contains('hide-input')).toBe(false);
        searchInput.value = 'a';
        searchInput.dispatchEvent(new Event('input'));
        expect(component.eventFinder.length > 0).toBe(true);
    });

    it('should search with no text', () => {
        getCalendarInfo();
        getCalendarEvents();
        const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('.search input');
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        expect(component.eventFinder.length > 0).toBe(false);
    });

    it('should search with a date', () => {
        getCalendarInfo();
        getCalendarEvents();
        const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('.search input');
        searchInput.value = '1/1/2018';
        searchInput.dispatchEvent(new Event('input'));
        expect(component.eventFinder.length > 0).toBe(false);
        expect(component.viewDate).toEqual(new Date('01-01-2018'));
    });

    it('should search a event and click on first result', () => {
        const spy = spyOn(component, 'openModal');
        getCalendarInfo();
        getCalendarEvents();
        const searchButton = fixture.nativeElement.querySelector('.search button');
        searchButton.click();
        fixture.detectChanges();
        expect(component.isShowSearchInput).toBeTruthy();
        const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('.search input');
        searchInput.value = 'a';
        searchInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.eventFinder.length > 0).toBe(true);
        const firstResult = fixture.nativeElement.querySelector('.datalist span');
        firstResult.click();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should open modal', () => {
        const modalService = injector.get(ModalService);
        const spy = spyOn(modalService, 'open');
        getCalendarInfo();
        getCalendarEvents();
        const event = component.events[0];
        component.openModal({ date: event.start, events: [event] });
        expect(spy).toHaveBeenCalled();
    });

    it('should open modal with no events', () => {
        const modalService = injector.get(ModalService);
        const spy = spyOn(modalService, 'open');
        getCalendarInfo();
        getCalendarEvents();
        const event = component.events[0];
        component.openModal({ date: event.start, events: [] });
        expect(spy).toHaveBeenCalled();
    });

    it('should open modal on select a day', () => {
        const modalService = injector.get(ModalService);
        const spy = spyOn(modalService, 'open');
        getCalendarInfo();
        getCalendarEvents();
        const calendarDays = fixture.nativeElement.querySelectorAll('.cal-cell.cal-day-cell');
        expect(calendarDays.length > 28).toBe(true);
        const calendarDay = fixture.nativeElement.querySelector('.cal-cell.cal-day-cell');
        calendarDay.click();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should render calendar title', () => {
        getCalendarInfo();
        getCalendarEvents();
        const calendarTitle = fixture.nativeElement.querySelector('.calendar-title h3');
        expect(calendarTitle).toBeTruthy();
        const date = new Date();
        const month = date.toLocaleString('en', { month: 'long', year: 'numeric' });
        expect(calendarTitle.innerHTML).toBe(month);
    });

    it('should change to next month', () => {
        getCalendarInfo();
        getCalendarEvents();
        const calendar = fixture.nativeElement.querySelector('.cal-month-view');
        expect(calendar).toBeTruthy();
        const nextButton = fixture.nativeElement.querySelectorAll('.btn-next-prev')[1];
        nextButton.click();
        fixture.detectChanges();
        const calendarTitle = fixture.nativeElement.querySelector('.calendar-title h3');
        expect(calendarTitle).toBeTruthy();
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const month = date.toLocaleString('en', { month: 'long', year: 'numeric' });
        expect(calendarTitle.innerHTML).toBe(month);
    });

    it('should change to previous month', () => {
        getCalendarInfo();
        getCalendarEvents();
        const calendar = fixture.nativeElement.querySelector('.cal-month-view');
        expect(calendar).toBeTruthy();
        const nextButton = fixture.nativeElement.querySelectorAll('.btn-next-prev')[0];
        nextButton.click();
        fixture.detectChanges();
        const calendarTitle = fixture.nativeElement.querySelector('.calendar-title h3');
        expect(calendarTitle).toBeTruthy();
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const month = date.toLocaleString('en', { month: 'long', year: 'numeric' });
        expect(calendarTitle.innerHTML).toBe(month);
    });

    it('should change to next month and return to today', () => {
        getCalendarInfo();
        getCalendarEvents();
        const calendar = fixture.nativeElement.querySelector('.cal-month-view');
        expect(calendar).toBeTruthy();
        const nextButton = fixture.nativeElement.querySelectorAll('.btn-next-prev')[1];
        nextButton.click();
        fixture.detectChanges();
        const calendarTitle = fixture.nativeElement.querySelector('.calendar-title h3');
        expect(calendarTitle).toBeTruthy();
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const month = date.toLocaleString('en', { month: 'long', year: 'numeric' });
        expect(calendarTitle.innerHTML).toBe(month);
        const todayButton = fixture.nativeElement.querySelector('.btn-today');
        todayButton.click();
        fixture.detectChanges();
        expect(calendarTitle.innerHTML).toBe(now.toLocaleString('en', { month: 'long', year: 'numeric' }));
    });
});

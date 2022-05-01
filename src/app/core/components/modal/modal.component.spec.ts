import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { basicColors } from '../../config/basic-colors';
import { calendarEventsMocky } from '../../mockys/calendar-events.mocky';
import { ModalService } from '../../services/modal.service';
import { CoverterUtil } from '../../utils/converter.util';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let injector: TestBed;
    let modalService: ModalService;
    const converter = new CoverterUtil();
    const eventsMocky = calendarEventsMocky.data.items.map((event) => converter.ApiDataToCalendarEvent(event, basicColors));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            providers: [ModalService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        injector = getTestBed();
        modalService = injector.get(ModalService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open modal with no events', () => {
        const title = new Date();
        modalService.open({ title, data: [] });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual([]);
    });

    it('should open modal with events', () => {
        const title = new Date();
        modalService.open({ title, data: eventsMocky });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(eventsMocky);
    });

    it('should close modal', () => {
        const title = new Date();
        const events = eventsMocky;
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(events);
        const closeButton = fixture.nativeElement.querySelector('.btn-close');
        closeButton.click();
        fixture.detectChanges();
        expect(component.data).toBeFalsy();
        expect(component.events).toEqual([]);
    });

    it('should open modal and select event', () => {
        const title = new Date();
        const events = eventsMocky;
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(events);
        const eventElement = fixture.nativeElement.querySelector('.event-item');
        const eventTitle = eventElement.querySelector('.event-title').innerHTML;
        eventElement.click();
        fixture.detectChanges();
        expect(component.event).toEqual(events.find((event) => event.title === eventTitle));
    });

    it('should open modal and select event and close modal', () => {
        const title = new Date();
        const events = eventsMocky;
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(events);
        const eventElement = fixture.nativeElement.querySelector('.event-item');
        const eventTitle = eventElement.querySelector('.event-title').innerHTML;
        eventElement.click();
        fixture.detectChanges();
        expect(component.event).toEqual(events.find((event) => event.title === eventTitle));
        const closeButton = fixture.nativeElement.querySelector('.btn-close');
        closeButton.click();
        fixture.detectChanges();
        expect(component.data).toBeFalsy();
        expect(component.events).toEqual([]);
    });

    it('should open modal and select event and back to all events and close mdoal', () => {
        const title = new Date();
        const events = eventsMocky;
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(events);
        const eventElement = fixture.nativeElement.querySelector('.event-item');
        const eventTitle = eventElement.querySelector('.event-title').innerHTML;
        eventElement.click();
        fixture.detectChanges();
        expect(component.event).toEqual(events.find((event) => event.title === eventTitle));
        const backButton = fixture.nativeElement.querySelector('.btn-back');
        backButton.click();
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.events).toEqual(events);
        expect(component.event).toBeFalsy();
        const closeButton = fixture.nativeElement.querySelector('.btn-close');
        closeButton.click();
        fixture.detectChanges();
        expect(component.data).toBeFalsy();
        expect(component.events).toEqual([]);
    });

    it('should open modal with a single event', () => {
        const title = new Date();
        const events = eventsMocky[0];
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.event).toEqual(events);
    });

    it('should open modal with a single event and close modal by service', () => {
        const title = new Date();
        const events = eventsMocky[0];
        modalService.open({ title, data: events });
        fixture.detectChanges();
        expect(component.data).toBeTruthy();
        expect(component.data.title).toEqual(title);
        expect(component.event).toEqual(events);
        modalService.close();
        fixture.detectChanges();
        expect(component.data).toBeFalsy();
        expect(component.event).toBeFalsy();
    });
});

import { CalendarEvent } from './calendar-events.interface';

export interface ModalInterface {
    title: Date;
    data: CalendarEvent | CalendarEvent[];
}

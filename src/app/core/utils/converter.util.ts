import { parse, isValid } from 'date-fns';
import { CalendarEvent, CalendarEventTimelyInterface } from '../interfaces/calendar-events.interface';
import { ColorInterface } from '../interfaces/color.interface';

export class CoverterUtil {
    public ApiDataToCalendarEvent(event: CalendarEventTimelyInterface, basicColors: ColorInterface): CalendarEvent {
        return {
            start: new Date(event.start_datetime),
            end: new Date(event.end_datetime),
            title: event.title,
            color:
                event.taxonomies && event.taxonomies.taxonomy_category && event.taxonomies.taxonomy_category[0].color
                    ? event.taxonomies.taxonomy_category[0].color
                    : basicColors.blue,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
            shortDescription: event.description_short,
            images: event.images,
            shareLink: event.url,
        };
    }

    public stringToDate(date: string): Date | null {
        const parsedDate = parse(date);
        if (isValid(parsedDate) && parsedDate > new Date('01-01-1970') && date.length >= 8) {
            return parsedDate;
        }
        return null;
    }
}

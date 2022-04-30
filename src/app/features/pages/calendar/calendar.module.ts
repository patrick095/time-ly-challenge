import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar.routing.module';
import { TimeLyApiService } from '../../services/time-ly-api.service';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    exports: [CalendarComponent],
    providers: [TimeLyApiService],
})
export class AppCalendarModule {}

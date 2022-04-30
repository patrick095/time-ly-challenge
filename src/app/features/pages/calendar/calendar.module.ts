import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';

import { CoverterUtil } from '../../../core/utils/converter.util';
import { ModalModule } from '../../../core/components/modal/modal.module';
import { ModalService } from '../../../core/services/modal.service';
import { TimeLyApiService } from '../../services/time-ly-api.service';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar.routing.module';

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        ModalModule,
        FormsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
    ],
    exports: [CalendarComponent],
    providers: [TimeLyApiService, ModalService, CoverterUtil],
})
export class AppCalendarModule {}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserAnimationsModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

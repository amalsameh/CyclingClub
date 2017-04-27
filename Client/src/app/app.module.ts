import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Auth } from './auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { routing,
         appRoutingProviders } from './app.routes';
import { EventDetailComponent } from './Events/event-detail/event-detail.component';
import { EventListComponent } from './Events/event-list/event-list.component';
import { EventNewComponent } from './Events/event-new/event-new.component';
import {EventService} from './Events/event.service';
import {UserService} from './user.service';
import {AuthGuard} from './auth-guard.service';
import {HttpModule} from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EventDetailComponent,
        EventListComponent,
        EventNewComponent
    ],
    providers:    [
        appRoutingProviders,
      EventService,
      Auth,
      AuthGuard,
      UserService
    ],
    imports:      [
        BrowserModule,
        routing,
      ReactiveFormsModule,
      FormsModule,
      HttpModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}

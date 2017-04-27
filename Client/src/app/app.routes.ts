import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { EventDetailComponent } from './Events/event-detail/event-detail.component';
import { EventListComponent } from './Events/event-list/event-list.component';
import { EventNewComponent } from './Events/event-new/event-new.component';
import {AuthGuard} from './auth-guard.service';


const appRoutes: Routes = [
  {path: 'New', canActivate:  [ AuthGuard], component: EventNewComponent},
  {path: 'events', canActivate:  [ AuthGuard], component: EventListComponent},
  {path: 'event/:id', canActivate:  [ AuthGuard], component: EventDetailComponent},
  {path: 'event/track/:event', canActivate:  [ AuthGuard], component: EventDetailComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

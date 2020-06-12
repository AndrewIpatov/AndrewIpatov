import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodosSearch } from '../app/api/todosSearch';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '', component: TodoListComponent },
  { path: ':id', component: TodoItemsComponent, outlet: 'todos' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemsComponent,
    TodosSearch,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ng-test-app'),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

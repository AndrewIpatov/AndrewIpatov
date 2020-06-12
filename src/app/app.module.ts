import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodosSearch } from '../app/api/todosSearch';
import { StandardUrlSerializer } from './api/StandardUrlSerializer';

const appRoutes: Routes = [
  { path: '', component: TodoListComponent },
  {
    path: 'lists',
    children: [{ path: ':id', component: TodoItemsComponent, outlet: 'lists' }],
  },
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
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: StandardUrlSerializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

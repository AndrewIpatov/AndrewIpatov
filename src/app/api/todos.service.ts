import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LocalService } from './localStorage.service';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface TodoList {
  id: number;
  title: string;
  data: Todo[];
}

@Injectable({ providedIn: 'root' })
export class TodosService {
  allData = [];

  constructor(private localService: LocalService) {}

  fetchTodos(): Observable<TodoList[]> {
    //   return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
    return of([
      {
        id: 1,
        title: 'Homeworks',
        data: [
          { id: 1, title: 'To lay the table', completed: false },
          { id: 2, title: 'To dust the shelves', completed: true },
          { id: 3, title: 'To take out garbage', completed: true },
          { id: 4, title: 'To polish shoes', completed: false },
        ],
      },
      {
        id: 2,
        title: 'Shoping',
        data: [
          { id: 1, title: 'Milk', completed: false },
          { id: 2, title: 'Aqua', completed: false },
          { id: 3, title: 'Pasta', completed: false },
          { id: 4, title: 'Tomatoes', completed: false },
          { id: 5, title: 'Rice', completed: false },
          { id: 6, title: 'Apple', completed: true },
          { id: 7, title: 'Coca-cola', completed: false },
        ],
      },
      {
        id: 3,
        title: 'Others',
        data: [
          { id: 1, title: 'Become a programmer', completed: true },
          { id: 2, title: 'Learn React', completed: false },
          { id: 3, title: 'Learn Angular', completed: false },
          { id: 4, title: 'Learn JavaScript', completed: false },
          { id: 5, title: 'Learn TypeScript', completed: false },
        ],
      },
    ]).pipe(map(allData => {
      const savedData = this.localService.load()
      if (savedData) {
       return savedData;
      }
      this.localService.save(allData)
      return allData
      }),tap((todos) => (this.allData = todos)))
    // .pipe(map(allData => {
    //   const savedData = this.localService.load()
    //   if (savedData) {
    //    return savedData;
    //   }
    //   this.localService.save(allData)
    //   return allData
    //   }));
  }
}

import { Injectable } from '@angular/core';
import { TodoList } from './todos.service';

@Injectable({ providedIn: 'root' })
export class LocalService{
data:[]


    save(data: TodoList[]) {
        localStorage.setItem('lists', JSON.stringify(data));
        }
    load() {
        const dataStr = localStorage.getItem('lists');
        try {
        return JSON.parse(dataStr)
        } catch {
        return null
        }
        }
}
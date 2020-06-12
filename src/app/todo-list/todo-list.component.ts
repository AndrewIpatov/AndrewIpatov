import { Component, OnInit } from '@angular/core';
import { TodosService, TodoList } from '../api/todos.service';
import { LocalService } from '../api/localStorage.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  allData: TodoList[] = [];
  textTodos: string = '';

  constructor(public todosService: TodosService,public localService: LocalService) {}

  addTodolist() {
    const todos = {
      title: this.textTodos,
      id: Date.now(),
      data: [],
    };
    this.allData.push(todos), this.localService.save(this.allData), (this.textTodos = '');
  }

  deleteList(id) {
    this.allData = this.allData.filter((list) => list.id !== id);
    this.localService.save(this.allData)
  }

  getLength(item: TodoList) {
    const totalLength = item.data.length;
    const doneLength = item.data.filter((el) => el.completed).length;
    return `${doneLength}/${totalLength}`;
  }

  ngOnInit(): void {
    this.todosService.fetchTodos().subscribe((allData) => {
      this.allData = allData;
    });
  }
}

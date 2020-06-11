import { Component, OnInit } from '@angular/core';
import { TodosService, Todo } from '../api/todos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.sass'],
})
export class TodoItemsComponent implements OnInit {
  todos: Todo[] = [];
  todosFilter: Todo[] = [];
  currentListId: number;
  title: string = '';
  searchString: string = '';
  radioTodos = 'todosAll';

  constructor(
    public todosService: TodosService,
    private route: ActivatedRoute
  ) {}

  addTodo() {
    if (this.title === '') {
      console.log('Form invalid');
    } else {
      const todo: Todo = {
        title: this.title,
        id: Date.now(),
        completed: false,
      };
      this.todosFilter.push(todo);
      this.title = '';
    }
  }

  deleteTodo(id: number) {
    this.todosFilter = this.todosFilter.filter((todo) => todo.id !== id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  onChange(id: number) {
    const index = this.todosFilter.findIndex((todo) => todo.id === id);
    this.todosFilter[index].completed = !this.todosFilter[index].completed;
  }
  onInputChangeYes() {
    this.todosFilter = [...this.todos];
  }
  onInputChangeNo() {
    this.todosFilter = this.todos.filter((todo) => !todo.completed);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentListId = +params['id'];
      const currentList = this.todosService.allData.find(
        (el) => el.id === this.currentListId
      );
      if (currentList) {
        this.todos = currentList.data;
        this.todosFilter = currentList.data;
      } else {
        console.log('error');
      }
    });
  }
}

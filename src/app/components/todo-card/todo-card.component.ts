import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoSignalsService } from '../../services/todo-signals.service';
import { TodoKeyLocalStorage } from '../../models/enum/TodoKeyLocalStorage';
import { Todo } from '../../models/model/Todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatTooltipModule],
  templateUrl: './todo-card.component.html'
})
export class TodoCardComponent implements OnInit{

  private todoSignalsService = inject(TodoSignalsService);

  private todoSignal = this.todoSignalsService.todosState;

  public todoList = computed(() => this.todoSignal());

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;

    todosDatas && (this.todoSignal.set(JSON.parse(todosDatas)));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {

      this.todoSignal.update((todos) => todos.map(
        todo => (todo.id === todoId) ? { ...todo, done: true } : todo
      ));

      // salvar os dados atuais das todos em local storage
      this.saveTodosInLocalStorage();
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todoList().indexOf(todo);

      if (index !== -1) {
        this.todoSignal.update((todos) => {

          // cria uma cópia nova do array (imutável)
          const updatedTodos = [...todos];
          updatedTodos.splice(index, 1);
          return updatedTodos;
        });

        // salvar os dados atuais das todos em local storage
        this.saveTodosInLocalStorage();
      }
    }
  }

  public handleReturnTodo(todoId: number): void {
    if (todoId) {

      this.todoSignal.update((todos) => todos.map(
        todo => (todo.id === todoId) ? { ...todo, done: false } : todo
      ));

      // salvar os dados atuais das todos em local storage
      this.saveTodosInLocalStorage();
    }
  }

}

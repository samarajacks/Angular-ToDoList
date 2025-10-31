import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule  } from '@angular/material/slide-toggle'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  private dialogService = inject(MatDialog);

  isLightMode = false; // controla o estado visual do toggle

  constructor(private renderer: Renderer2){}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      this.isLightMode = true;
      this.renderer.addClass(document.body, 'light-theme');
    }
    else {
      this.isLightMode = false;
      this.renderer.removeClass(document.body, 'light-theme');
    }
  }

  toggleTheme(isLightMode: boolean) {
    this.isLightMode = isLightMode;

    if (isLightMode) {
      this.renderer.addClass(document.body, 'light-theme');
      localStorage.setItem('theme', 'light');
    }
    else {
      this.renderer.removeClass(document.body, 'light-theme');
      localStorage.setItem('theme', 'dark');
    }
  }

  handleOpenModal(): void {
    this.dialogService.open(TodoFormComponent, {
      width: '50vw',
      maxHeight: '80vh'
    });
  }

}
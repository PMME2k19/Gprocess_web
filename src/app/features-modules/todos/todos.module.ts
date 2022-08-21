import { NgModule } from '@angular/core';
import { TodoListComponent } from './components/containers/todo-list/todo-list.component';
import { TodoComponent } from './components/presentationals/todo/todo.component';
import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoAddFormComponent } from './components/presentationals/todo-add-form/todo-add-form.component';
import { SEARCH_CONFIG_TODO } from './models/search-config-todo.model';
import { TodosFacade } from './todos.facade';
import { SearchConfigModule } from '../../shared/search-config/search-config.module';
import { TodoSearchFormComponent } from './components/presentationals/todo-search-form/todo-search-form.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
    TodoAddFormComponent,
    TodoSearchFormComponent
  ],
  imports: [
    SharedModule,
    SearchConfigModule.forRoot(SEARCH_CONFIG_TODO),
    ReactiveFormsModule,
    TodosRoutingModule,
  ],
  providers: [
    TodosFacade
  ]
})
export class TodosModule { }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FizzbuzzFormComponent } from './fizzbuzz/fizzbuzz-form/fizzbuzz-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FizzbuzzFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fizzbuzz-challenge';
}

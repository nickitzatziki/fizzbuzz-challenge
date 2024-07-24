import { Component, OnDestroy, OnInit } from '@angular/core';
import { FizzBuzzService } from '../services/fizzbuzz.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fizzbuzz-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './fizzbuzz-form.component.html',
  styleUrl: './fizzbuzz-form.component.scss',
})
export class FizzbuzzFormComponent implements OnDestroy {
  private inputValue: string = '';
  public stopEnabled: boolean = false;
  public isRunning: boolean = false;
  public numbers: string[] = [];

  constructor(private fizzBuzzService: FizzBuzzService) {}

  public ngOnDestroy(): void {
    this.fizzBuzzService.stopIteration();
  }

  public onInputChange(event: any): void {
    this.inputValue = event.target.value;
    this.stopEnabled = this.inputValue.toLowerCase() === 'stop';
  }

  public onStartClick(event: any): void {
    // prevent default behaviour of form to not rerender the component
    event.preventDefault();
    this.startFizzBuzz();
  }

  public onStopClick(event: any): void {
    // prevent default behaviour of form to not rerender the component
    event.preventDefault();
    this.stopFizzBuzz();
  }

  private startFizzBuzz(): void {
    if (this.numbers.length > 0) {
      this.numbers = [];
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.fizzBuzzService.startIteration((num) => {
        this.numbers.push(num);
      });
    }
  }

  private stopFizzBuzz(): void {
    this.isRunning = false;
    this.fizzBuzzService.stopIteration();
  }
}

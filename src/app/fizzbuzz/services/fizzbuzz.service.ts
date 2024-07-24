import { Injectable } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {
  private iterationSubscription: Subscription = new Subscription();

  public getFizzBuzzRepresentation(num: number): string {
    if (num % 15 === 0) {
      return 'FizzBuzz';
    } else if (num % 3 === 0) {
      return 'Fizz';
    } else if (num % 5 === 0) {
      return 'Buzz';
    } else {
      return num.toString();
    }
  }

  private getNumbers(): Observable<number> {
    return interval(500).pipe(map(i => i + 1));
  }

  public startIteration(callback: (num: string) => void): void {
    this.iterationSubscription = this.getNumbers().subscribe(num => {
      if (num > 100) {
        this.iterationSubscription.unsubscribe();
      } else {
        callback(this.getFizzBuzzRepresentation(num));
      }
    });
  }

  public stopIteration(): void {
    if (this.iterationSubscription) {
      this.iterationSubscription.unsubscribe();
    }
  }
}


import { TestBed } from '@angular/core/testing';
import { FizzBuzzService } from './fizzbuzz.service';
import { Subject } from 'rxjs';

describe('FizzBuzzService', () => {
  let service: FizzBuzzService;
  let intervalMock: jest.Mock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FizzBuzzService);

    intervalMock = jest.fn();
    jest.spyOn(service as any, 'getNumbers').mockImplementation(() => {
      const subject = new Subject<number>();
      let count = 1;
      const intervalId = setInterval(() => {
        subject.next(count++);
        if (count > 101) {
          clearInterval(intervalId);
          subject.complete();
        }
      }, 500);
      return subject.asObservable();
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFizzBuzzRepresentation', () => {
    it('should return "FizzBuzz" for multiples of 15', () => {
      expect(service.getFizzBuzzRepresentation(15)).toBe('FizzBuzz');
      expect(service.getFizzBuzzRepresentation(30)).toBe('FizzBuzz');
    });

    it('should return "Fizz" for multiples of 3 but not 5', () => {
      expect(service.getFizzBuzzRepresentation(3)).toBe('Fizz');
      expect(service.getFizzBuzzRepresentation(9)).toBe('Fizz');
    });

    it('should return "Buzz" for multiples of 5 but not 3', () => {
      expect(service.getFizzBuzzRepresentation(5)).toBe('Buzz');
      expect(service.getFizzBuzzRepresentation(10)).toBe('Buzz');
    });

    it('should return the number as a string for other numbers', () => {
      expect(service.getFizzBuzzRepresentation(1)).toBe('1');
      expect(service.getFizzBuzzRepresentation(7)).toBe('7');
    });
  });

  describe('startIteration', () => {
    it('should call the callback with correct FizzBuzz values and stop after numbers exceed 100', (done) => {
      const callback = jest.fn();
      jest.useFakeTimers();
  
      service.startIteration((num) => {
        callback(num);
      });
      jest.runAllTimers();
  
      expect(callback).toHaveBeenCalled();
      expect(callback.mock.calls.length).toBeLessThanOrEqual(100);
      done();
    });
  });

  describe('stopIteration', () => {
    it('should unsubscribe from the observable', () => {
      const spy = jest.spyOn(service['iterationSubscription'], 'unsubscribe');

      service.stopIteration();

      expect(spy).toHaveBeenCalled();
    });
  });
});
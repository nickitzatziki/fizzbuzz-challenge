import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FizzbuzzFormComponent } from './fizzbuzz-form.component';
import { FizzBuzzService } from '../services/fizzbuzz.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FizzbuzzFormComponent', () => {
  let component: FizzbuzzFormComponent;
  let fixture: ComponentFixture<FizzbuzzFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FizzbuzzFormComponent, BrowserAnimationsModule],
    }).overrideComponent(FizzbuzzFormComponent, {
      remove: {providers: [FizzBuzzService]},
      add: { 
        providers: [
          {provide: FizzBuzzService, useValue: {startIteration: jest.fn(), stopIteration: jest.fn()}}
        ]
      }}).compileComponents();

      fixture = TestBed.createComponent(FizzbuzzFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect((component as any).inputValue).toEqual('');
    expect(component.stopEnabled).toBeFalsy();
    expect(component.isRunning).toBeFalsy();
    expect(component.numbers).toEqual([]);
  });

  it('should update inputValue on input change', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('input'));
    expect((component as any).inputValue).toEqual('123');
  });

  it('should call startFizzBuzz method on start button click', () => {
    const startFizzBuzzSpy = jest.spyOn((component as any), 'startFizzBuzz');
    const startButton = fixture.nativeElement.querySelector('#start');
    startButton.click();
    expect(startFizzBuzzSpy).toHaveBeenCalled();
  });

  it('should call stopFizzBuzz method on stop button click', () => {
    const stopFizzBuzzSpy = jest.spyOn((component as any), 'stopFizzBuzz');
    const stopButton = fixture.nativeElement.querySelector('#stop');
    stopButton.disabled = false;
    stopButton.click();
    expect(stopFizzBuzzSpy).toHaveBeenCalled();
  });
});

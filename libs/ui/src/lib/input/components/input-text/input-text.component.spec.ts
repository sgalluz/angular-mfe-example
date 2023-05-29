import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { NgControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  
  const ngControlMock = {
    control: {
      dirty: false,
      invalid: false,
      valueChanges: jest.fn,
      errors: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      providers: [{ provide: NgControl, useValue: ngControlMock }],
      schemas: [NO_ERRORS_SCHEMA]
    });
  
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});

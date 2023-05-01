import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  private readonly WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private readonly SUFFIX = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
  private readonly MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  format = (date?: Date) => !date ? undefined :
    ''.concat(this.WEEKDAY[date.getDay()])
      .concat(', the ')
      .concat(`${date.getUTCDate()}`)
      .concat(this.SUFFIX[date.getUTCDate() % 10])
      .concat(' of ')
      .concat(this.MONTH[date.getUTCMonth()]);
}

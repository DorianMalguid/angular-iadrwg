import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutesSeconds',
})
export class HoursMinutesSeconds implements PipeTransform {
  transform(seconds: number): string {
    let minutes: number = Math.floor(seconds / 60);
    let remainingSeconds: number = seconds % 60;
    let hours: number = Math.floor(minutes / 60);
    minutes %= 60;
    return (
      (hours > 0 ? hours + 'h' : '') +
      (minutes > 0 ? minutes + 'm' : '') +
      (remainingSeconds > 0 ? remainingSeconds + 's' : '')
    );
  }
}

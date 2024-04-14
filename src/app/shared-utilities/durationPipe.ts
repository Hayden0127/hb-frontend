import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'durationCustom'
})
export class DurationCustomPipe implements PipeTransform {

  transform(value: string): string {
    // Parse given value to moment duration
    let totalMinutes = moment.duration(value).asMinutes();
    let hours = 0;
    let minutes = 0;
    const dayRem = totalMinutes % 450;

    if (dayRem > 0) {
      hours = Math.floor(dayRem / 60);
      minutes = Math.floor(dayRem % 60);
    }

    return `${hours}h ${minutes}m`;
  }

}
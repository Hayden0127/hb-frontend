import {Pipe, PipeTransform} from '@angular/core'

@Pipe({ name: 'decimalTimeFormatter'})

export class DecimalTimeFormatterPipe implements PipeTransform{
    transform(value: any) : string {
        var timeString = "";
        var intNumber = Math.trunc(value);
        var floatNumber = Number((value - intNumber));

        if(intNumber == 0){ 
            timeString = Math.ceil((floatNumber * 60)).toString() + "m";
        }
        else{
            timeString = intNumber.toString() + "h " + Math.ceil((floatNumber * 60)).toString() + "m";
        }

        return timeString
    }
}
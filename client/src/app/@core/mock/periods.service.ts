import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      '2010', '2011', '2012',
      '2013', '2014', '2015',
      '2016', '2017', '2018',
    ];
  }

  getMonths() {
    return [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ];
  }

  sortWeekDays(days: string[]) {
    let sortedDays: string[] = [];
    let today = new Date().getDay();
    //Sonntag -> letzte Tag der Woche
    if (today == 0) { today = 7; }
    //Überschuss
    let i = 1;

    //Ab Heute bis Wochenanfang
    for (let index = today; index > 0; index--) {
      sortedDays.push(days[index - 1]);
      i++;
    }

    //Überschuss
    for (let index = days.length; index > (days.length - (days.length - i + 1)); index--) {
      sortedDays.push(days[index - 1]);
    }

    //Letzten 7 Tage
    return sortedDays.reverse();
  }

  sortMonths(months: string[]) {
    let sortedMonths: string[] = [];
    let today = new Date().getMonth();
    //Überschuss
    let i = 1;

    //Ab diesem Monat bis Jahresanfang
    for (let index = today; index >= 0; index--) {
      sortedMonths.push(months[index]);
      i++;
    }

    //Überschuss
    for (let index = months.length; index > (months.length - (months.length - i+1)); index--) {
      sortedMonths.push(months[index - 1]);
    }


    console.log("sorted:"+ sortedMonths);

    //Letzten 7 Tage
    return sortedMonths.reverse();
  }

  /*
   let sortedDays: string[] = [];
      let today = new Date().getDay();
      //Sonntag -> letzte Tag der Woche
      if (today == 0) { today = 7; }
      //Überschuss
      let i = 1;

      //Ab Heute bis Wochenende
      for (let index = today; index <= days.length; index++) {
        sortedDays.push(days[index - 1]);
        i++;
      }


      //Überschuss
      for (let index = 1; index <= (days.length - i + 1); index++) {
        sortedDays.push(days[index - 1]);
      }

      //Letzten 7 Tage
      return sortedDays;
  */


  getWeeks() {
    return [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
  }
}

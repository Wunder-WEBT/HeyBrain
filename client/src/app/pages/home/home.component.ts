import { SimulationcortexService } from '../../@core/mock/simulationcortex.service';
import { CortexService } from '../../@core/mock/cortex.service';
import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  // constructor(private simulationcortexService: SimulationcortexService,
  //   private cortexService: CortexService) { }
  // stream: any;
  // cortexstream: any;

  // ngOnInit() {
  //   this.simulationcortexService
  //     .getStreams()
  //     .subscribe((sendData: string) => {
  //       this.stream = (sendData);
  //       if (this.stream.pow) {
  //         console.log(this.stream.pow[1]);
  //       } else {
  //         console.log("ned pow");
  //       }
  //     });

  //   this.cortexService.getStreams()
  //     .subscribe((outputStream: string) => {
  //       this.cortexstream = (outputStream);
  //     });
  // }


  private alive = true;

  ngOnInit() {
  }

  rollerShadesCard: CardSettings = {
    title: 'Maussteuerung',
    iconClass: 'nb-star',
    type: 'success',
  };


  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.rollerShadesCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
      ],
      dark: this.commonStatusCardsSet,
    };
  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }
}

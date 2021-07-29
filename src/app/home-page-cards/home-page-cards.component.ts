import { Component, OnInit } from '@angular/core';
import { frontpageCards } from 'src/frontpage-cards';
import { CardContent } from 'src/types';

@Component({
  selector: 'app-home-page-cards',
  templateUrl: './home-page-cards.component.html',
  styleUrls: ['./home-page-cards.component.scss']
})
export class HomePageCardsComponent implements OnInit {

  cardLst: CardContent[] = frontpageCards;

  constructor() { }

  ngOnInit(): void {
  }

}

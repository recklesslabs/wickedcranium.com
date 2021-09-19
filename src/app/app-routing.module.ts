import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageCardsComponent } from './home-page-cards/home-page-cards.component';
import { StallionMintingComponent } from './stallion-minting/stallion-minting.component';

const routes: Routes = [
  { path: '', component: HomePageCardsComponent },
  { path: 'mint-loot', component: StallionMintingComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

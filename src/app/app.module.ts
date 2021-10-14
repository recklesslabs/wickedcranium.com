import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularFireModule } from '@angular/fire';
import { ShellComponent } from './shell/shell.component';
import { HomePageCardsComponent } from './home-page-cards/home-page-cards.component';
import { StallionMintingComponent } from './stallion-minting/stallion-minting.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

let firebaseConfig = {
  apiKey: 'AIzaSyBRuNymNlCTkBFj7ipD9iPtjbAHFtWWOQQ',
  authDomain: 'wicked-craniums.firebaseapp.com',
  projectId: 'wicked-craniums',
  storageBucket: 'wicked-craniums.appspot.com',
  messagingSenderId: '269105216749',
  appId: '1:269105216749:web:e883733e76edf6896ae0e4',
  measurementId: 'G-E5MN0QJENN',
};

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomePageCardsComponent,
    StallionMintingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    FlexLayoutModule,
    MatTabsModule,
    FormsModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

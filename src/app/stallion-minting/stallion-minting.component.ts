import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-stallion-minting',
  templateUrl: './stallion-minting.component.html',
  styleUrls: ['./stallion-minting.component.scss']
})
export class StallionMintingComponent implements OnInit {

  value = 1;
  min = 1;
  max = 25;
  step = 1;
  thumbLabel = true;
  isMetamaskConnected = false;
  metamaskAccount: string = '';
  transaction: any = 'No transaction/transaction incomplete';

  _window(): any {
    // return the global native browser window object
    return window;
  }

  constructor(public contractService: ContractService) {}

  async ngOnInit() {
    // let accounts = await this.contractService.getAccounts();
    // this.isMetamaskConnected = accounts.length > 0;
    // if (this.isMetamaskConnected) {
    //   this.metamaskAccount = shortenAccount(accounts[0]);
    // }
  }

  connectMetamaskMethod(): void {
    // UNCOMMENT
    // this.contractService.connectMetamask().then((resp: any) => {
    //   if (typeof resp === 'string') {
    //     this.isMetamaskConnected = true;
    //     this.metamaskAccount = shortenAccount(resp);
    //   }
    // });
  }
  async signTransaction() {
    // UNCOMMENT
    // this.transaction = await this.contractService.signTransaction(this.value);
  }
}

function shortenAccount(account: string): string {
  let start = account.substring(0, 5);
  let end = account.substring(account.length - 4);
  return `${start}....${end}`;
}

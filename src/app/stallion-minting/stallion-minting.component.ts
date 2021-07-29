import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-stallion-minting',
  templateUrl: './stallion-minting.component.html',
  styleUrls: ['./stallion-minting.component.scss']
})
export class StallionMintingComponent implements OnInit {

  value = Math.floor(Math.random() * (10761 + 1));;
  min = 0;
  max = 10761;
  step = 1;
  thumbLabel = true;
  isMetamaskConnected = false;
  metamaskAccount: string = '';
  tokens: number[] = []
  unclaimedCraniumNumber = '0'
  transaction: any = 'No transaction/transaction incomplete';

  _window(): any {
    // return the global native browser window object
    return window;
  }

  async redeemOne() {
    this.contractService.getTokens().then(tokens => {
      if(tokens.length >= 1) {
        let index = tokens.indexOf(parseInt(this.unclaimedCraniumNumber))
        if(index === -1) {
          this.transaction = "That cranium # is not in your wallet"
        } else {
        this.contractService.signTransaction(index, 1).then(res => {
          this.transaction = res
        })
        }
      } else {
        this.transaction = "Looks like you don't have any Craniums in wallet"
      }
    })
  }

  constructor(public contractService: ContractService) {}

  async ngOnInit() {
    // let accounts = await this.contractService.getAccounts();
    // this.isMetamaskConnected = accounts.length > 0;
    // if (this.isMetamaskConnected) {
    //   this.metamaskAccount = shortenAccount(accounts[0]);
    // }
  }

  async connectMetamaskMethod() {
    this.contractService.connectMetamask().then((resp: any) => {
      if (typeof resp === 'string') {
        this.isMetamaskConnected = true;
        this.metamaskAccount = shortenAccount(resp);
      }
    });
  }
  async signTransaction() {
    this.contractService.getTokens().then(tokens => {
      if(tokens.length >= 1) {
        this.contractService.signTransaction(0, tokens.length).then(res => {
          this.transaction = res
        })
      } else {
        this.transaction = "Looks like you don't have any Craniums in wallet"
      }
      
    })
    
  }

  getTokens() {
    this.contractService.getTokens().then(tokens => {
      alert(`[${tokens.join(", ")}]`)
    })
  }

  async checkRedeemable() {
    const res = await this.contractService.isRedeemable(this.value);
    if(typeof res === "boolean") {
      if(res) {
        this.transaction = "That Cranium has already redeemed a Stallion"
      } else {
        this.transaction = "That Cranium has not redeemed a Stallion yet"
      }
    } else {
      this.transaction = res
    }
  }
}

function shortenAccount(account: string): string {
  let start = account.substring(0, 5);
  let end = account.substring(account.length - 4);
  return `${start}....${end}`;
}

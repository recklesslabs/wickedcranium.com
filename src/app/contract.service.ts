import { Injectable } from '@angular/core';
import {
  cost,
  rinkebyAbi,
  rinkebyContract,
  rinkebyCraniumAbi,
  rinkebyCraniumContract
} from 'src/constants';

declare var Web3: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor() {}

  public signTransaction = async (starting: number, totalToMint: number) => {
    var web3 = new Web3(Web3.givenProvider);
    window.contract = await new web3.eth.Contract(rinkebyAbi, rinkebyContract);
    const transactionParameters = {
      to: rinkebyContract,
      from: (await this.getAccounts())[0],
      // value: (BigInt(cost) * BigInt(totalToMint.toString())).toString(16),
      data: window.contract.methods.mintStallions(starting, totalToMint).encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      return `Check out your transaction on Etherscan: https://etherscan.io/tx/${txHash}`;
    } catch (error) {
      return `Something went wrong: ` + error.message;
    }
  };

  public isRedeemable = async (num: number) => {
    var web3 = new Web3(Web3.givenProvider);
    window.contract = await new web3.eth.Contract(rinkebyAbi, rinkebyContract);
    const transactionParameters = {
      to: rinkebyContract,
      from: (await this.getAccounts())[0],
      data: window.contract.methods.isMinted(num).encodeABI(),
    };
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_call',
        params: [transactionParameters],
      })
      
      return txHash === "0x0000000000000000000000000000000000000000000000000000000000000001" 
    } catch (error) {
      return `Something went wrong: ` + error.message;
    }
  };

  public getTokens = async (): Promise<number[]> => {
    const accounts = await this.getAccounts();
    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      var web3 = new Web3(Web3.givenProvider);
      window.contract = await new web3.eth.Contract(
        rinkebyCraniumAbi,
        rinkebyCraniumContract
      );
      try {
        const res = await window.ethereum.request({
          method: 'eth_call',
          params: [
            {
              to: rinkebyCraniumContract,
              from: walletAddress,
              data: window.contract.methods
                .balanceOf(walletAddress)
                .encodeABI(),
            },
          ],
        });
        const balance = parseInt(res);
        const promises = [];
        for (let i = 0; i < balance; i++) {
          promises.push(
            parseInt(
              await window.ethereum.request({
                method: 'eth_call',
                params: [
                  {
                    to: rinkebyCraniumContract,
                    from: walletAddress,
                    data: window.contract.methods
                      .tokenOfOwnerByIndex(walletAddress, i)
                      .encodeABI(),
                  },
                ],
              })
            )
          );
        }
        const data = await Promise.all(promises);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      console.log('WC: no accounts found');
      return [];
    }
  };



  public getAccounts = async () => {
    try {
      let acc = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return acc;
    } catch (e) {
      return [];
    }
  };

  public connectMetamask = async (): Promise<false | string[]> => {
    if (window.ethereum) {
      try {
        const result = await this.getAccounts();
        if (Array.isArray(result) && result.length > 0) {
          let acc = result[0];
          return acc;
        } else {
          console.log('The wallet has 0 addrs');
          return false;
        }
      } catch (err) {
        console.log('connection req failed');
        return false;
      }
    } else {
      console.log('window.ethereum evals to falsy');
      return false;
    }
  };
}

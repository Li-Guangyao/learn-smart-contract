import algosdk from 'algosdk';

// create client object to connect to sandbox's algod client
const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const algodServer = 'http://localhost';
const algodPort = 4001;
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

console.log(algodClient)

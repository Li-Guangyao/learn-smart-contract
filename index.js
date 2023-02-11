import createAccount, {checkBalance} from "./createAccount.js";
// checkBalance('N2PNIPZNUT5372IQRFDBABOKZT7DEWFCVQTVMDLCUTIDR2EBFSPN2QI2J4')
// checkBalance('HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA')


// const newAccount = createAccount();
// console.log(newAccount)


import mnemonic, { seedFromMnemonic } from 'algosdk'
import algosdk from "algosdk";

const newAccount =  createAccount()
// let account_mnemonic = algosdk.secretKeyToMnemonic(newAccount.sk);

const account_mnemonic = "build crazy govern catch release body lens book current session arrest main arrive impact evil rich surprise eight orchard pretty lazy dumb basket above robust"
console.log("seedFromMnemonic", algosdk.seedFromMnemonic(account_mnemonic))
console.log("mnemonicToSecretKey", algosdk.mnemonicToSecretKey(account_mnemonic))
console.log("mnemonicToMasterDerivationKey", algosdk.mnemonicToMasterDerivationKey(account_mnemonic))
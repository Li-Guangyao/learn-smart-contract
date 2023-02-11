import createAccount from "./createAccount.js";
import algosdk from "algosdk";

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

async function firstTransaction() {
  try {
    // let myAccount = createAccount();
    // console.log("Press any key when the account is funded");
    // await keypress();
    const senderAddr = 'N2PNIPZNUT5372IQRFDBABOKZT7DEWFCVQTVMDLCUTIDR2EBFSPN2QI2J4'
    // Connect your client
    const algodToken =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const algodServer = "http://localhost";
    const algodPort = 4001;
    let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

    // check your balance
    let accountInfo = await algodClient.accountInformation(senderAddr).do();
    console.log("Account balance: %d microAlgos", accountInfo.amount);

    // Construct the transaction
    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;

    const receiver =
      "HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA";
    const enc = new TextEncoder();
    const note = enc.encode("Hello World");
    let amount = 1000000; // equals 1 ALGO
    let sender = senderAddr;
    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver,
      amount: amount,
      note: note,
      suggestedParams: params,
    });

    // Sign the transaction
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);

    // Submit the transaction
    await algodClient.sendRawTransaction(signedTxn).do();

    // Wait for confirmation
    let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    //Get the completed Transaction
    console.log(
      "Transaction " +
        txId +
        " confirmed in round " +
        confirmedTxn["confirmed-round"]
    );
    // let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    // console.log("Transaction information: %o", mytxinfo);
    let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
    console.log("Note field: ", string);
    accountInfo = await algodClient.accountInformation(myAccount.addr).do();
    console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);
    console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
    console.log("Account balance: %d microAlgos", accountInfo.amount);


    console.log('success');

  } catch (err) {
    console.log("err", err);
  }

  process.exit();
}

firstTransaction();

// export default firstTransaction;

import algosdk from "algosdk";

const createAccount = function () {
  try {
    const myaccount = algosdk.generateAccount();
    console.log("Account Address = " + myaccount.addr);
    let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);

    console.log("Account Mnemonic = " + account_mnemonic);
    console.log("Account created. Save off Mnemonic and address");
    console.log("Add funds to account using the TestNet Dispenser: ");
    console.log("https://dispenser.testnet.aws.algodev.network/ ");
    return myaccount;
  } catch (err) {
    console.log("err", err);
  }
};

//Check your balance
const checkBalance = async (address) => {
  const algodToken =
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const algodServer = "http://localhost";
  const algodPort = 4001;
  let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

  let accountInfo = await algodClient
    .accountInformation(address)
    .do();
  console.log("Account balance: %d microAlgos", accountInfo.amount);
};

export default createAccount;
export {checkBalance};

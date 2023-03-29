import { useState, useEffect } from "react";

import { getAccount } from "./utils/wallet";

// Components
import Navbar from "./components/Navbar";
import { acceptWithdrawCounterparty, acceptWithdrawOwner, addBalanceCounterparty, addBalanceOwner, allowRevertFund, claim, claimCounterparty, claimOwner, revertFund } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";


const App = () => {
  // Players holding lottery tickets
  // Players holding lottery tickets
  const [fromOwner, setFromOwner] = useState(50000000);
  const [fromCounterparty, setFromCounterparty] = useState(4000000);
  const [balanceOwner, setBalanceOwner] = useState(0);
  const [balanceCounterparty, setBalanceCounterparty] = useState(0);
  const [hashedSecret, setHashedSecret] = useState();
  const [epoch, setEpoch] = useState();
  const [owner, setOwner] = useState();
  const [counterparty, setCounterparty] = useState();
  const [ownerWithdraw, setOwnerWithdraw] = useState(false);
  const [counterpartyWithdraw, setCounterpartyWithdraw] = useState(false);
  const [allowedRevertFunds, setAllowRevertFunds] = useState(false);
  const [operator, setOperator] = useState();

  //Inputs
  const [inputHashedOwner, setInputHashedOwner] = useState("");
  const [inputHashedCounterparty, setInputHashedCounterparty] = useState("");
  const [inputDepositFromOwner, setInputDepositFromOwner] = useState(0);
  const [inputDepositFromCounterparty, setInputDepositFromCounterparty] = useState(0);

  // Loading
  const [addBalanceOwnerLoading, setAddBalanceOwnerLoading] = useState(false);
  const [addBalanceCounterpartyLoading, setAddBalanceCounterpartyLoading] = useState(false);
  const [claimOwnerLoading, setClaimOwnerLoading] = useState(false);
  const [claimCounterpartyLoading, setClaimCounterpartyLoading] = useState(false);

  //Account
  const [account, setAccount] = useState("");

  const fundReverted = false


  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchStorage()
      setFromOwner(storage.fromOwner);
      setFromCounterparty(storage.fromCounterparty);
      setBalanceOwner(storage.balanceOwner);
      setBalanceCounterparty(storage.balanceCounterparty);
      setHashedSecret(storage.hashedSecret);
      setEpoch(storage.epoch);
      setOwner(storage.owner);
      setCounterparty(storage.counterparty)
      setClaimCounterpartyLoading(storage.claimCounterpartyLoading)
      setOwnerWithdraw(storage.ownerWithdraw)
      setCounterpartyWithdraw(storage.counterpartyWithdraw)
      setAllowRevertFunds(storage.allowRevertFunds)
      setOperator(storage.operator)
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 7.a - Complete onBuyTicket function

  function getOwnerHash(val) {
    setInputHashedOwner(val.target.value)
  }

  function getCounterpartyHash(val) {
    setInputHashedCounterparty(val.target.value)
  }

  function getFromOwnerDeposit(val) {
    setInputDepositFromOwner(val.target.value)
  }

  function getFromCounterpartyDeposit(val) {
    setInputDepositFromCounterparty(val.target.value)
  }

  const onAddBalanceOwner = async () => {
    try {
      setAddBalanceOwnerLoading(true)
      await addBalanceOwner(inputDepositFromCounterparty)
      alert("Transaction successful")
    } catch (err) {
      throw err;
    }
    setAddBalanceOwnerLoading(false)
  };

  const onAddBalanceCounterparty = async () => {
    try {
      setAddBalanceCounterpartyLoading(true)
      await addBalanceCounterparty(inputDepositFromOwner)
      alert("Transaction successful")
    } catch (err) {
      throw err;
    }
    setAddBalanceCounterpartyLoading(false)
  };


  const onClaimCounterparty = async () => {
    try {
      setClaimOwnerLoading(true)
      await claimCounterparty(inputHashedCounterparty)
      alert("Transaction successful")
    } catch (err) {
      throw err;
    }
    setClaimOwnerLoading(false)
  };

  const onClaimOwner = async () => {
    try {
      setClaimOwnerLoading(true)
      claimOwner(inputHashedOwner)
      await claimOwner()
      alert("Transaction successful")
    } catch (err) {
      throw err;
    }
    setClaimOwnerLoading(false)

  };

  const onAllowRevertFund = async () => {
    try {
      await allowRevertFund()
      alert("Transaction successful")
    } catch (err) {
      throw err;
    }
  };

  const onAcceptWithdrawOwner = async () => {
    try {
      await acceptWithdrawOwner()
      alert("Transaction successful")
      const storage = await fetchStorage()
      setOwnerWithdraw(storage.ownerWithdraw)
    } catch (err) {
      throw err;
    }
  };

  const onAcceptWithdrawCounterparty = async () => {
    try {
      await acceptWithdrawCounterparty()
      alert("Transaction successful")
      const storage = await fetchStorage()
      setOwnerWithdraw(storage.counterpartyWithdraw)
    } catch (err) {
      throw err;
    }
  };
  const onRevertFund = async () => {
    try {
      await revertFund()
      alert("Transaction successful")
      const storage = await fetchStorage()
      setAllowRevertFunds(storage.allowRevertFunds)
    } catch (err) {
      throw err;
    }
  };



  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => { };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div class="container mt-md-5">
          <div class="row py-4 mb-xl-5">
            <div class="col-8">
              <div>
                {account == operator ? (
                  <div>
                    {allowedRevertFunds ?
                      (
                        <div>

                          {ownerWithdraw && counterpartyWithdraw ?
                            (<button onClick={onRevertFund} class="btn btn-outline-warning">
                              Revert Fund
                            </button>) : (
                              <button onClick={onAllowRevertFund} class="btn btn-outline-secondary" aria-disabled="true">
                                Allowed Revert Funds
                              </button>
                            )}
                        </div>
                      ) : (
                        <div>
                          {balanceCounterparty > 0 || balanceOwner > 0 ?
                            (<button onClick={onAllowRevertFund} class="btn btn-outline-primary">
                              Allow Revert Funds
                            </button>)
                            : (<div><button onClick={onAllowRevertFund} class="btn btn-secondary" disabled="true">
                              Deposit before reverting funds
                            </button></div>)}
                        </div>
                      )}
                  </div>)
                  : (<div></div>)}

              </div>
            </div>
            <div class="col-4">
              <h2 class="text-center">Total Escrow Fund: {(parseInt(balanceCounterparty) + parseInt(balanceOwner)) / 1000000} tez </h2>
            </div>
          </div>
        </div>

        {/* Form to deposit funds into the escrow account */}
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <h3>Owner</h3>
              <p>Address: {owner}</p>
              <p>Balance: {parseInt(balanceOwner) / 1000000} tez</p>
              {allowedRevertFunds ? (

                <div>
                  {account == owner ? (
                    <div>
                      {ownerWithdraw ? (
                        <button onClick={onAcceptWithdrawOwner} class="btn btn-secondary mt-md-3 px-md-5 py-md-2">
                          Accepted to Withdraw Owner Funds
                        </button>
                      ) : (
                        <button onClick={onAcceptWithdrawOwner} class="btn btn-warning mt-md-3 px-md-5 py-md-2">
                          Accept Withdrawal of Owner Funds
                        </button>
                      )}
                    </div>)
                    : (<div></div>)}
                </div>
              ) : (
                <div>
                  {account == owner ? (
                    <div>
                      {balanceCounterparty == fromCounterparty ?
                        (
                          <div>
                            <h6>Secret Hash:</h6>
                            <input type="text" class="form-control" id="ownerSecretHashInput" onChange={getOwnerHash} aria-describedby="emailHelp" placeholder="Enter Secret Hash"></input>
                            {balanceOwner == fromOwner && balanceCounterparty == fromCounterparty ? (
                              <button onClick={onClaimOwner} class="btn btn-success mt-md-3 px-md-5 py-md-2">
                                {claimOwnerLoading ? "Loading.." : "Claim Owner Fund"}
                              </button>
                            ) : (
                              <button disabled="true" class="btn btn-secondary mt-md-3 px-md-5 py-md-2">
                                Wait for both parties to deposit before claiming total Escrow Fund
                              </button>)
                            }
                          </div>
                        ) : (
                          <div>
                            <h6>Fund to deposit: {parseInt(fromCounterparty) / 1000000} tez</h6>
                            <input type="number" class="form-control" id="inputBalance" onChange={getFromOwnerDeposit} aria-describedby="emailHelp" placeholder="Enter amount in tez"></input>
                            <button onClick={onAddBalanceCounterparty} class="btn btn-primary mt-md-3 px-md-5 py-md-2">
                              {addBalanceCounterpartyLoading ? "Loading.." : "Deposit Fund"}
                            </button>
                          </div>
                        )}
                    </div>)
                    : (<div></div>)}
                </div>
              )}
            </div>
            <div class="col-sm">
              <h3>Counterparty</h3>
              <p>Address: {counterparty}</p>
              <p>Balance: {parseInt(balanceCounterparty) / 1000000} tez</p>
              <div>
                {allowedRevertFunds ? (
                  <div>
                    {account == counterparty ? (
                      <div>
                        {counterpartyWithdraw ? (
                          <button onClick={onAcceptWithdrawCounterparty} class="btn btn-secondary mt-md-3 px-md-5 py-md-2">
                            Accepted to Withdraw Counterparty Funds
                          </button>
                        ) : (
                          <button onClick={onAcceptWithdrawCounterparty} class="btn btn-warning mt-md-3 px-md-5 py-md-2">
                            Accept Withdrawal of Counterparty Funds
                          </button>
                        )}
                      </div>
                    ) : (<div></div>)}
                  </div>

                ) : (
                  <div>
                    {account == counterparty ? (
                      <div>
                        {balanceOwner == fromOwner ?
                          (
                            <div>
                              <h6>Secret Hash:</h6>
                              <input type="text" class="form-control" onChange={getCounterpartyHash} id="counterpartySecretHashInput" aria-describedby="emailHelp" placeholder="Enter Secret Hash"></input>
                              {balanceOwner == fromOwner && balanceCounterparty == fromCounterparty ? (
                                <button onClick={onClaimCounterparty} class="btn btn-success mt-md-3 px-md-5 py-md-2">
                                  {claimCounterpartyLoading ? "Loading.." : "Claim Counterparty Fund"}
                                </button>
                              ) : (
                                <button disabled="true" class="btn btn-secondary mt-md-3 px-md-5 py-md-2">
                                  Wait for both parties to deposit before claiming total Escrow Fund
                                </button>)
                              }
                            </div>
                          ) : (
                            <div>
                              <h6>Fund to deposit: {parseInt(fromOwner) / 1000000} tez</h6>
                              <input type="number" class="form-control" onChange={getFromCounterpartyDeposit} id="inputBalance" aria-describedby="emailHelp" placeholder="Enter amount in tez"></input>
                              <button onClick={onAddBalanceOwner} class="btn btn-primary mt-md-3 px-md-5 py-md-2">

                                {addBalanceOwnerLoading ? "Loading.." : "Deposit Fund"}
                              </button>
                            </div>
                          )}
                      </div>)
                      : (<div></div>)}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>


      </div>
      <div>

      </div>






      {/* List of Players */}
      <div className="mt-2">
        {/* {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))} */}
      </div>
    </div >
  );
};

export default App;

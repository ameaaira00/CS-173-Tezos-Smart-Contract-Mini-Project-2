import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { addBalanceCounterparty, addBalanceOwner, claim, claimCounterparty, claimOwner } from "./utils/operation";

const App = () => {
    // Players holding lottery tickets
    // Players holding lottery tickets
    const [fromOwner, setFromOwner] = useState(fromOwner);
    const [fromCounterparty, setFromCounterparty] = useState(fromCounterparty);
    const [balanceOwner, setBalanceOwner] = useState(0);
    const [balanceCounterparty, setBalanceCounterparty] = useState(0);
    const [hashedSecret, setHashedSecret] = useState(hashedSecret);
    const [epoch, setEpoch] = useState(epoch);
    const [owner, setOwner] = useState(owner);
    const [counterparty, setCounterparty] = useState(counterparty);
    const [loading, setLoading] = useState(false);


    // Set players and tickets remaining
    useEffect(() => {
        // TODO 9 - Fetch players and tickets remaining from storage
        (async () => {
            setFromOwner(fromOwner);
            setFromCounterparty(fromCounterparty);
            setBalanceOwner(0);
            setBalanceCounterparty(0);
            setHashedSecret(hashedSecret);
            setEpoch(epoch);
            setOwner(owner);
            setCounterparty(counterparty);
        })();
    }, []);

    // TODO 7.a - Complete onBuyTicket function
    const onAddBalanceOwner = async () => {
        try {
            setLoading(true)
            await addBalanceOwner()
            alert("Transaction successful")
        } catch (err) {
            throw err;
        }
        setLoading(false)
    };

    const onAddBalanceCounterparty = async () => {
        await addBalanceCounterparty()
    };

    const onClaim = async () => {
        await claim()
    };

    const onClaimCounterparty = async () => {
        await claimCounterparty
    };

    const onClaimOwner = async () => {
        await claimOwner
    };



    // TODO 11.a - Complete onEndGame function
    const onEndGame = async () => { };

    return (
        <div className="h-100">
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                {/* Form to deposit funds into the escrow account */}
                <div class="row">
                    <div class="col-md-7">
                        {/* <label for="exampleInputBa">Deposit</label> */}
                        <input type="number" class="form-control" id="inputBalance" aria-describedby="emailHelp" placeholder="Enter amount in tez"></input>
                        <button onClick={onAddBalanceOwner} class="btn btn-primary">
                            {loading ? "Loading.." : "Deposit Fund"}

                        </button>
                    </div>
                    <div class="col-md-5">
                        {/* Button for claiming funds */}
                        <button class="btn btn-primary">
                            {/* TODO 7.b - Call onBuyTicket on click */}
                            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
                            Claim Funds
                        </button>
                    </div>
                </div>




                {/* List of Players */}
                <div className="mt-2">
                    {/* {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div> */}
          ))}
                </div>
            </div>
        </div>
    );
};

export default App;

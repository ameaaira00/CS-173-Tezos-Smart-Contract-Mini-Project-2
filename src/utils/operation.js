// TODO 6 - Call deposit ticket entrypoint in the Lottery contract by completing buyTicketOperation
import { tezos } from "./tezos";
import { wallet } from "./wallet";


export async function addBalanceOwner(deposit) {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.addBalanceOwner().send({
            amount: deposit, // to do check if 50
            mutez: false,
        })
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export async function addBalanceCounterparty(deposit) {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.addBalanceCounterparty().send({
            amount: deposit, // to do check if 4
            mutez: false,
        })
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}


// TODO 10 - Call claim funs entrypoint in the Lottery contract by completing endGameOperation
export async function claimCounterparty(hashkey) {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.claimCounterparty(hashkey).send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}


export async function claimOwner(hashkey) {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.claimOwner(hashkey).send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

// export const claimOwner = async () => {
//     try {
//         const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
//         const secretHash = "01223344"
//         const op = await contract.methods.claimOwner(secretHash).send();
//         await op.confirmation(1);
//     } catch (err) {
//         throw err;
//     }
// };


export const allowRevertFund = async () => {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.allowRevertFund().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

export const acceptWithdrawOwner = async () => {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.acceptWithdrawOwner().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

export const acceptWithdrawCounterparty = async () => {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.acceptWithdrawCounterparty().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

export const revertFund = async () => {
    try {
        const contract = await tezos.wallet.at("KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG");
        const op = await contract.methods.revertFund().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

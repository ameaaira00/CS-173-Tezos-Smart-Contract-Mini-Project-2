// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get(
        // sp.now > epoch for testing claim owner
        // "https://api.ghostnet.tzkt.io/v1/contracts/KT1G9kRyz5jUNXksfRkRVmw7UjkSWhQgeQtx/storage"


        // sp.now < epoch for testing claim counterparty
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1McssP2KyxZttN8UPGGfH5VNeQgrpNK7EG/storage"
    );

    return res.data;
};

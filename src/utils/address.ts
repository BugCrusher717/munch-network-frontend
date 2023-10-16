const network = process.env.NEXT_PUBLIC_NETWORK;

export const addressShortening = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const getBalance = async (address: string) => {
  try {
    let balance = 0;
    if (network === "testnet") {
      const url = `https://unisat.io/testnet/wallet-api-v4/address/balance?address=${address}`;
      const headers = {
        "X-Client": "UniSat Wallet",
      };
      const res = await fetch(url, { headers });
      const balanceData = await res.json();
      balance = Number(balanceData.result.amount);
    } else {
      const url = `https://mempool.space/api/address/${address}`;
      const response = await fetch(url);
      const data = await response.json();
      balance =
        (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) /
        10 ** 8;
    }
    return balance;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

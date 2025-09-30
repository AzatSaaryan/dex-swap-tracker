import fetch from "node-fetch";
import "dotenv/config";

export async function getSwapsForUser(userAddress, hours = 2000) {
  const now = Math.floor(Date.now() / 1000);
  const cutoff = now - hours * 3600;

  const tokenApiKey = process.env.TOKEN_API_KEY;
  const url = `https://token-api.thegraph.com/swaps/evm?network_id=mainnet&recipient=${userAddress}&startTime=${cutoff}&endTime=9999999999&orderBy=timestamp&orderDirection=desc&limit=10&page=1`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${tokenApiKey}` },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (data?.data) {
      return data.data.map((s) => ({
        tx: s.transaction_id,
        timestamp: s.timestamp,
        pool: s.pool,
        sender: s.sender,
        recipient: s.recipient,
        amount0: s.amount0,
        amount1: s.amount1,
      }));
    }
    return [];
  } catch (err) {
    console.error("Ошибка Token API:", err.message);
    return [];
  }
}

import { getAllOwners } from "./services/nftService.js";
import { getSwapsForUser } from "./services/swapService.js";
import pLimit from "p-limit";
import "dotenv/config";

function bigintReplacer(key, value) {
  return typeof value === "bigint" ? value.toString() : value;
}

(async () => {
  const collectionAddress = process.env.NFT_CONTRACT;
  const owners = await getAllOwners(collectionAddress);
  const limit = pLimit(1);
  const results = [];
  for (const owner of owners) {
    const res = await limit(() => getSwapsForUser(owner));
    results.push({ owner, swaps: res });
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(JSON.stringify(results, bigintReplacer, 2));
})();

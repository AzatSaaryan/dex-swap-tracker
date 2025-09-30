import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import "dotenv/config";

const settings = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export async function getAllOwners(collectionAddress, limit = 10) {
  if (!collectionAddress || !ethers.isAddress(collectionAddress))
    throw new Error("Invalid collectionAddress");

  try {
    const ownersResponse = await alchemy.nft.getOwnersForContract(
      collectionAddress
    );

    const owners = ownersResponse.owners.slice(0, limit);
    return owners;
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

import axios from "axios";

export interface IInscription {
  address: string;
  inscriptionId: string;
  inscriptionNumber: number;
  output: string;
  outputValue: number;
  contentType: string;
}

const network = process.env.NEXT_PUBLIC_NETWORK;

export const getInscriptions = async (
  address: string
): Promise<IInscription[]> => {
  const inscriptions: IInscription[] = [];

  const headers: HeadersInit =
    network === "testnet"
      ? { "X-Client": "UniSat Wallet" }
      : { Accept: "application/json" };

  let cursor = 0;
  const pageSize = 20;

  let done = false;

  while (!done) {
    const url = `${
      network === "testnet"
        ? `https://unisat.io/testnet/wallet-api-v4/address/inscriptions?address=${address}&cursor=${cursor}&size=${pageSize}`
        : `https://api.hiro.so/ordinals/v1/inscriptions?address=${address}&offset=${cursor}&limit=${pageSize}`
    }`;

    const res = await fetch(url, { headers });
    const inscriptionDatas = await res.json();
    if (network === "testnet") {
      inscriptionDatas.result.list.forEach((inscriptionData: any) => {
        inscriptions.push({
          address: inscriptionData.address,
          inscriptionId: inscriptionData.inscriptionId,
          inscriptionNumber: inscriptionData.inscriptionNumber,
          output: inscriptionData.output,
          outputValue: inscriptionData.outputValue,
          contentType: inscriptionData.contentType,
        });
      });
    } else {
      inscriptionDatas.results.forEach((inscriptionData: any) => {
        inscriptions.push({
          address: inscriptionData.address,
          inscriptionId: inscriptionData.id,
          inscriptionNumber: inscriptionData.number,
          output: inscriptionData.output,
          outputValue: inscriptionData.value,
          contentType: inscriptionData.content_type,
        });
      });
    }
    // Check if there are more pages to fetch
    if (network === "testnet") {
      if (inscriptionDatas.result.list.length < pageSize) {
        done = true; // This means we've retrieved all the data
      } else {
        cursor += pageSize; // Move to the cursor forward by the current page size
      }
    } else {
      if (inscriptionDatas.results.length < pageSize) {
        done = true; // This means we've retrieved all the data
      } else {
        cursor += pageSize; // Move to the cursor forward by the current page size
      }
    }
  }

  return inscriptions;
};

export const getInscriptionContentType = async (
  inscriptionId: string
): Promise<any> => {
  const url = `${
    network === "testnet"
      ? "https://unisat.io/testnet/wallet-api-v4/inscription/utxo-detail"
      : `https://api.hiro.so/ordinals/v1/inscriptions?id=${inscriptionId}`
  }`;

  const headers =
    network === "testnet"
      ? { "X-Client": "UniSat Wallet" }
      : { Accept: "application/json" };

  const params = network === "testnet" ? { inscriptionId } : {};

  const results = await axios.get(url, {
    headers,
    params,
  });

  const result =
    network === "testnet"
      ? results.data.result.inscriptions[0]
      : results.data.results[0];

  return result;
};

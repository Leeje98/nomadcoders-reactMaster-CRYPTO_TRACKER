// export async function fetchCoins() {
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     return JSON;
// }

const BASE_URL = `https://api.coinpaprika.com/v1`

// coins list
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

// coin 기본정보
export function fetchCoinInfo(coinId:string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

// coin 기본정보 + 가격 등
export function fetchCoinTickers(coinId:string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// 
export function fetchCoinHistory(coinId:string) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
 
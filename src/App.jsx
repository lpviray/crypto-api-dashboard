import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const MAPPING = {
    BTCUSDT: "Bitcoin",
    ETHUSDT: "Ethereum",
    SOLUSDT: "Solana",
    ADAUSDT: "Cardano",
    DOGEUSDT: "DogeCoin"
  };
  const CRYPTO = Object.keys(MAPPING);
  const [cryptoData, setCryptoData] = useState([]);

  // fetch + promise
  useEffect(() => {
    fetch("https://binance.us/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((cryptocurrency) => {
          if (CRYPTO.includes(cryptocurrency.symbol)) {
            return true;
          }
          return null;
        });
        setCryptoData(filteredData);
      });
  });

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
          onClick={() => window.location.reload()}
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
          </thead>
          {cryptoData && (
            <>
              <tbody>
                {cryptoData.map((crypto, index) => {
                  return (
                    <tr key={cryptoData.symbol}>
                      <td>{index + 1}</td>
                      <td>{MAPPING[crypto.symbol]}</td>
                      <td>{`$${Number(
                        cryptoData[index].lastPrice
                      ).toLocaleString()}`}</td>
                      <td
                        style={{
                          color:
                            Number(cryptoData[index].priceChangePercent) > 0
                              ? "green"
                              : "red"
                        }}
                      >
                        {Number(cryptoData[index].priceChangePercent) > 0
                          ? `▲${Number(
                              cryptoData[index].priceChangePercent
                            ).toFixed(2)}%`
                          : `▼${Number(
                              cryptoData[index].priceChangePercent
                            ).toFixed(2)}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
}

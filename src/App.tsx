import { useState, useEffect } from 'react';
import './styles.css';

interface Coin {
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

const TOP_10_SOLANA_COINS: Coin[] = [
  { rank: 1, name: 'Solana', symbol: 'SOL', price: 178.42, change24h: 3.24, marketCap: 82500000000, volume24h: 2890000000 },
  { rank: 2, name: 'Jupiter', symbol: 'JUP', price: 1.12, change24h: -1.87, marketCap: 1510000000, volume24h: 198000000 },
  { rank: 3, name: 'Raydium', symbol: 'RAY', price: 5.67, change24h: 5.42, marketCap: 1480000000, volume24h: 156000000 },
  { rank: 4, name: 'Jito', symbol: 'JTO', price: 3.89, change24h: 2.15, marketCap: 1120000000, volume24h: 89000000 },
  { rank: 5, name: 'Pyth Network', symbol: 'PYTH', price: 0.42, change24h: -0.34, marketCap: 980000000, volume24h: 67000000 },
  { rank: 6, name: 'Bonk', symbol: 'BONK', price: 0.000028, change24h: 8.92, marketCap: 890000000, volume24h: 245000000 },
  { rank: 7, name: 'Marinade', symbol: 'MNDE', price: 0.18, change24h: 1.23, marketCap: 456000000, volume24h: 34000000 },
  { rank: 8, name: 'Orca', symbol: 'ORCA', price: 4.56, change24h: -2.45, marketCap: 312000000, volume24h: 28000000 },
  { rank: 9, name: 'Helium', symbol: 'HNT', price: 8.34, change24h: 0.87, marketCap: 298000000, volume24h: 21000000 },
  { rank: 10, name: 'Render', symbol: 'RNDR', price: 10.23, change24h: 4.12, marketCap: 285000000, volume24h: 156000000 },
];

function formatPrice(price: number): string {
  if (price < 0.001) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
}

function formatMarketCap(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toFixed(0)}`;
}

function CoinRow({ coin, index }: { coin: Coin; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <tr className={`coin-row ${visible ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.08}s` }}>
      <td className="rank-cell">
        <span className="rank-number">{String(coin.rank).padStart(2, '0')}</span>
      </td>
      <td className="name-cell">
        <div className="coin-identity">
          <span className="coin-symbol">{coin.symbol}</span>
          <span className="coin-name">{coin.name}</span>
        </div>
      </td>
      <td className="price-cell">
        <span className="price-value">{formatPrice(coin.price)}</span>
      </td>
      <td className="change-cell">
        <span className={`change-value ${coin.change24h >= 0 ? 'positive' : 'negative'}`}>
          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
        </span>
      </td>
      <td className="mcap-cell">
        <span className="mcap-value">{formatMarketCap(coin.marketCap)}</span>
      </td>
      <td className="volume-cell">
        <span className="volume-value">{formatMarketCap(coin.volume24h)}</span>
      </td>
    </tr>
  );
}

function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`glitch ${className || ''}`} data-text={text}>
      {text}
    </span>
  );
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const scanTimer = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(scanTimer);
  }, []);

  return (
    <div className="app">
      <div className="scanline" style={{ top: `${scanLine}%` }} />
      <div className="noise" />
      <div className="vignette" />

      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-bracket">[</span>
            <GlitchText text="SOL" className="logo-text" />
            <span className="logo-bracket">]</span>
          </div>
          <span className="tagline">NETWORK_TRACKER_v2.4</span>
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">LIVE</span>
          </div>
          <div className="timestamp">
            <span className="time-label">SYS_TIME:</span>
            <span className="time-value">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="title-section">
          <h1 className="title">
            <GlitchText text="TOP 10 SOLANA" />
            <span className="title-accent"> TOKENS</span>
          </h1>
          <p className="subtitle">// MARKET_DATA_STREAM :: REALTIME_FEED</p>
        </div>

        <div className="table-container">
          <div className="table-header-bar">
            <span className="terminal-prompt">&gt; QUERY_RESULT</span>
            <span className="record-count">[10 RECORDS]</span>
          </div>

          <table className="coins-table">
            <thead>
              <tr>
                <th className="th-rank">#</th>
                <th className="th-name">TOKEN</th>
                <th className="th-price">PRICE</th>
                <th className="th-change">24H</th>
                <th className="th-mcap">MCAP</th>
                <th className="th-volume">VOL</th>
              </tr>
            </thead>
            <tbody>
              {TOP_10_SOLANA_COINS.map((coin, index) => (
                <CoinRow key={coin.symbol} coin={coin} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer-data">
          <span className="data-label">NETWORK:</span>
          <span className="data-value">SOLANA_MAINNET</span>
          <span className="separator">|</span>
          <span className="data-label">TPS:</span>
          <span className="data-value">4,521</span>
          <span className="separator">|</span>
          <span className="data-label">SLOT:</span>
          <span className="data-value">267,841,923</span>
        </div>
      </main>

      <footer className="attribution">
        <span>Requested by @Rynellor · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;

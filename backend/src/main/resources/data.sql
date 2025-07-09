INSERT INTO currencies (symbol, name, logo_url)
SELECT * FROM (
    SELECT 'BTC', 'Bitcoin', 'https://img.cryptorank.io/coins/60x60.bitcoin1524754012028.png'
    UNION
    SELECT 'ETH', 'Ethereum', 'https://img.cryptorank.io/coins/60x60.ethereum1524754015525.png'
    UNION
    SELECT 'USDT', 'Tether', 'https://img.cryptorank.io/coins/60x60.tether1645007690922.png'
    UNION
    SELECT 'XRP', 'XRP', 'https://img.cryptorank.io/coins/60x60.xrp1634717634479.png'
    UNION
    SELECT 'BNB', 'BNB', 'https://img.cryptorank.io/coins/60x60.bnb1732530324407.png'
    UNION
    SELECT 'SOL', 'Solana', 'https://img.cryptorank.io/coins/60x60.solana1606979093056.png'
    UNION
    SELECT 'USDC', 'USDC', 'https://img.cryptorank.io/coins/60x60.usd%20coin1634317395959.png'
    UNION
    SELECT 'TRX', 'TRON', 'https://img.cryptorank.io/coins/60x60.tron1608810047161.png'
    UNION
    SELECT 'DOGE', 'Dogecoin', 'https://img.cryptorank.io/coins/60x60.dogecoin1524754995294.png'
    UNION
    SELECT 'ADA', 'Cardano', 'https://img.cryptorank.io/coins/60x60.cardano1524754132195.png'
    UNION
    SELECT 'HYPE', 'Hyperliquid', 'https://img.cryptorank.io/coins/hyperliquid1699003432264.png'
    UNION
    SELECT 'BCH', 'Bitcoin Cash', 'https://img.cryptorank.io/coins/60x60.bitcoin_cash1688206403591.png'
    UNION
    SELECT 'SUI', 'Sui', 'https://img.cryptorank.io/coins/60x60.sui1750268474192.png'
    UNION
    SELECT 'LINK', 'Chainlink', 'https://img.cryptorank.io/coins/60x60.chainlink1541078222348.png'
    UNION
    SELECT 'LEO', 'UNUS SED LEO', 'https://img.cryptorank.io/coins/60x60.unus_sed_leo1732534033854.png'
    UNION
    SELECT 'XLM', 'Stellar', 'https://img.cryptorank.io/coins/60x60.stellar1645006520371.png'
    UNION
    SELECT 'AVAX', 'Avalanche', 'https://img.cryptorank.io/coins/60x60.avalanche1629705441155.png'
    UNION
    SELECT 'SHIB', 'Shiba Inu', 'https://img.cryptorank.io/coins/60x60.shiba_inu1716276244699.png'
    UNION
    SELECT 'TON', 'Toncoin', 'https://img.cryptorank.io/coins/60x60.toncoin1732533613281.png'
    UNION
    SELECT 'HBAR', 'Hedera', 'https://img.cryptorank.io/coins/60x60.hedera1645006006928.png'
) as default_currencies
where not exists (select 1 from currencies);
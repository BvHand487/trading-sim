# trading-sim
Cryptocurrency trading simulator made with React.js, Sprint Boot and PostgreSQL.
<br/>

## 🚀 Running locally
#### 1. Clone the repository:

```bash
git clone https://github.com/BvHand487/trading-sim.git
cd trading-sim
```

#### 2. Build and start the containers using Docker

```bash
docker-compose up --build
```

#### 3. Access the application
* Frontend - ```http://localhost:5173/```
* Backend API - ```http://localhost:8080/api```
* Database Admin (adminer) - ```http://localhost:8081```


## 📷 Screenshots

<table>
  <tr>
    <td>
      <img src="assets/homepage.png?v=2" width="300" />
    </td>
    <td>
      <strong>Home page</strong><br/>
      Overview of all currencies and wallets.
    </td>
  </tr>
  <tr>
    <td>
      <img src="assets/buysell.png?v=2" width="300" />
    </td>
    <td>
      <strong>Buy/Sell</strong><br/>
      Allows the user to specify from which wallet to buy/sell from and how much currency.
    </td>
  </tr>
  <tr>
    <td>
      <img src="assets/updated.png?v=2" width="300" />
    </td>
    <td>
      <strong>Update after Buy/Sell</strong><br/>
      The wallet balance and holdings have changed. A transaction is added.
    </td>
  </tr>
  <tr>
    <td>
      <img src="assets/login.png?v=2" width="300" />
    </td>
    <td>
      <strong>Log in</strong><br/>
        User authentication with tokens.
    </td>
  </tr>
  <tr>
    <td>
      <img src="assets/landing.png?v=2" width="300" />
    </td>
    <td>
      <strong>Landing page</strong><br/>
        Simple landing page with links to the home page and log in page.
    </td>
  </tr>
</table>

## 🎥 Video
...


## 🔮 Future Improvements
* Price validation for every transaction (right now the websocket is connected to the frontend for visual updates only)
* Dynamic updating of top 20 crytocurrencies (right now there are 20 currencies which are hard-coded into the database)
* Username/password validation (e.g. >8 letters)
* Unit tests
* More thorough error handling and user feedback


## 📄 License
This project is licensed under the MIT License. For more details, please refer to the LICENSE file.

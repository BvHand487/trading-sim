# trading-sim
Cryptocurrency trading simulator made with React.js, Sprint Boot and PostgreSQL.
<br/>

## 🚀 Running localy
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
...

## 🔮 Future Improvements
* Price validation for every transaction (right now the websocket is connected to the frontend for visual updates only)
* Dynamic updating of top 20 crytocurrencies (right now there are 20 currencies which are hard-coded into the database)
* Username/password validation (e.g. >8 letters)
* Unit tests
* More thorough error handling and user feedback


## 📄 License
This project is licensed under the MIT License. For more details, please refer to the LICENSE file.

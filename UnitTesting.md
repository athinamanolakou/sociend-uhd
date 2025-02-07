# Unit Testing with Docker

## Steps for Running Tests

### 1. Build the Images

Build the Docker images for both frontend and backend:

```bash
docker compose build
```

---

### 2. Run Front-End Tests

Start the **frontend** container:

```bash
docker compose up -d frontend
```

Run the tests inside the frontend container:

```bash
docker compose exec frontend npm test
```

Stop the frontend container after tests:

```bash
docker compose down
```

---

### 3. Run Back-End Tests

Start the **backend** container:

```bash
docker compose up -d backend
```

Run the tests inside the backend container:

```bash
docker compose exec backend ./gradlew test
```

Stop the backend container after tests:

```bash
docker compose down
```

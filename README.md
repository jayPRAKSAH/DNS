# Custom DNS Hosting Platform (MERN + Redis + Node DNS Server)

This project is a **custom DNS hosting platform** similar to Cloudflare / Route53, built using **MERN stack**, **Redis**, and a **custom UDP-based DNS server in Node.js**.

Users can:

- Add their own domains
- Manage DNS records (A, CNAME, MX, TXT)
- Point their domain's **NS records** to our DNS servers
- Resolve domains through our infrastructure

---

## 🧠 How DNS Works in This Project

1. User buys a domain from a registrar (GoDaddy, Namecheap, etc.)
2. User updates **NS records** to:
   ```
   ns1.myproject.com
   ns2.myproject.com
   ```
3. All DNS queries for that domain reach our **custom DNS server**
4. DNS server fetches records from **Redis**
5. DNS server responds with IP / CNAME
6. Browser then directly connects to the web server (DNS does NOT handle HTTP)

---

## 🏗️ Architecture

```
User Browser
    |
    | DNS Query
    v
Custom DNS Server (Node.js UDP)
    |
    | Fast Lookup
    v
Redis (DNS Records Cache)
    |
    v
MongoDB (Users, Domains, Records)
    |
    v
Express API (Admin / UI)
    |
    v
React Dashboard
```

---

## 🧰 Tech Stack

### Backend

- Node.js
- Express.js
- dns-packet
- UDP (dgram)
- Redis (ioredis)
- MongoDB (Mongoose)

### Frontend

- React
- Tailwind / CSS
- REST APIs

### Infrastructure

- AWS EC2
- Elastic IP
- Port 53 (UDP)
- Redis (ElastiCache or self-hosted)

---

## 🗄️ Redis DNS Record Format

**Key**

```
dns:example.com
dns:blog.example.com
```

**Value**

```json
{
  "type": "A",
  "data": "1.2.3.4",
  "ttl": 300
}
```

---

## 🧪 Example DNS Records

| Host              | Type  | Value              |
| ----------------- | ----- | ------------------ |
| example.com       | A     | 76.76.21.21        |
| blog.example.com  | CNAME | hashnode.network   |
| learn.example.com | CNAME | cname.teachyst.com |

---

## 🚀 Running the Project

### Start Redis

```bash
redis-server
```

### Start DNS Server (Admin Required)

```bash
sudo node index.js
```

### Start API Server

```bash
npm run server
```

### Start Frontend

```bash
npm run client
```

---

## 🧪 Testing DNS

```bash
nslookup example.com 127.0.0.1
```

**Expected:**

```
Name: example.com
Address: 1.2.3.4
```

---

## 🔐 Security & Scaling (Future Scope)

- DNS caching
- Rate limiting
- Multiple DNS nodes
- Anycast routing
- DNSSEC
- Horizontal scaling

---

## 📌 About This Project

🎓 This project is for **educational and learning purposes**, focusing on **system-level engineering** and **distributed system design**.

### Learning Objectives:

- Understanding how DNS works at the protocol level (UDP, packets, encoding/decoding)
- Implementing low-level network communication
- Designing scalable distributed systems
- Working with caching layers (Redis)
- Building real-time infrastructure components
- System design patterns for high-availability services

⚠️ **Note:** Running a production-grade DNS requires deep networking, security knowledge, and compliance with internet standards. This project demonstrates core concepts but is not production-ready without significant hardening.

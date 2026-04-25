# Products Management API

یک API ساده و سبک برای مدیریت محصولات (CRUD) با استفاده از Node.js (ماژول `http`) و MongoDB.

این پروژه بدون فریم‌ورک‌هایی مثل Express نوشته شده تا منطق مسیردهی، کنترلرها و ارتباط با دیتابیس به‌صورت شفاف و قابل یادگیری باشد.

---

## فهرست مطالب

- معرفی پروژه
- قابلیت‌ها
- تکنولوژی‌ها
- ساختار پروژه
- پیش‌نیازها
- نصب و راه‌اندازی
- اجرای پروژه
- تنظیمات دیتابیس
- مستندات API
- نمونه داده محصول
- کدهای وضعیت و خطاها
- نکات توسعه و بهبود

---

## معرفی پروژه

این پروژه یک REST API برای مدیریت محصولات ارائه می‌دهد و عملیات زیر را پشتیبانی می‌کند:

- دریافت لیست محصولات
- دریافت یک محصول بر اساس شناسه
- ایجاد محصول جدید
- ویرایش محصول
- حذف محصول

آدرس پایه API:

`/api/products`

---

## قابلیت‌ها

- پیاده‌سازی کامل CRUD روی کالکشن محصولات
- ساختار لایه‌ای (`controllers`، `model`، `utils`)
- اتصال به MongoDB با درایور رسمی `mongodb`
- پاسخ‌دهی JSON برای تمام مسیرها
- پشتیبانی از شناسه داینامیک در مسیرها (`/api/products/:id`)

---

## تکنولوژی‌ها

- Node.js
- MongoDB
- JavaScript (CommonJS)
- Nodemon (برای توسعه)

---

## ساختار پروژه

```text
Products-Management/
├── controllers/
│   └── product.controllers.js
├── model/
│   └── product.model.js
├── utils/
│   └── mongo-connection.js
├── index.js
├── package.json
└── README.md
```

توضیح فایل‌ها:

- `index.js`: راه‌اندازی سرور HTTP و مدیریت Routeها
- `controllers/product.controllers.js`: مدیریت درخواست/پاسخ و منطق API
- `model/product.model.js`: عملیات مستقیم روی MongoDB (خواندن/نوشتن)
- `utils/mongo-connection.js`: مدیریت اتصال به دیتابیس

---

## پیش‌نیازها

قبل از اجرا مطمئن شوید موارد زیر نصب هستند:

- Node.js نسخه 18 یا بالاتر (پیشنهادی: 20+)
- MongoDB (لوکال یا ریموت)
- npm

---

## نصب و راه‌اندازی

1) نصب وابستگی‌ها:

```bash
npm install
```

2) اطمینان از فعال بودن MongoDB:

- به‌صورت پیش‌فرض پروژه به این آدرس وصل می‌شود:
  `mongodb://localhost:27017/products-management`

---

## اجرای پروژه

### حالت توسعه (با ری‌استارت خودکار)

```bash
npm run dev
```

### حالت عادی

```bash
npm start
```

پس از اجرا، سرور روی آدرس زیر در دسترس است:

`http://localhost:3000`

---

## تنظیمات دیتابیس

در حال حاضر رشته اتصال در فایل `utils/mongo-connection.js` به‌صورت ثابت قرار دارد:

`mongodb://localhost:27017/products-management`

نام کالکشن محصولات در `model/product.model.js` برابر است با:

`product`

> نکته: برای محیط Production بهتر است Connection String به متغیر محیطی (`.env`) منتقل شود.

---

## مستندات API

Base URL:

`http://localhost:3000/api/products`

### 1) دریافت همه محصولات

- **Method:** `GET`
- **URL:** `/api/products`
- **Response:** آرایه‌ای از محصولات (مرتب‌سازی بر اساس جدیدترین `_id`)

نمونه:

```bash
curl -X GET http://localhost:3000/api/products
```

---

### 2) دریافت محصول با شناسه

- **Method:** `GET`
- **URL:** `/api/products/:id`
- **Response (موفق):** شیء محصول
- **Response (ناموجود):** `404`

نمونه:

```bash
curl -X GET http://localhost:3000/api/products/680b7d7c5f8f1bd3dcf4f123
```

---

### 3) ایجاد محصول جدید

- **Method:** `POST`
- **URL:** `/api/products`
- **Body:** JSON
- **عملکرد:** فیلد `createdAt` به‌صورت خودکار اضافه می‌شود

نمونه:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Laptop\",\"price\":45000000,\"stock\":5}"
```

---

### 4) ویرایش محصول

- **Method:** `PUT`
- **URL:** `/api/products/:id`
- **Body:** JSON (فیلدهای قابل آپدیت)
- **Response (موفق):** نتیجه `updateOne`

نمونه:

```bash
curl -X PUT http://localhost:3000/api/products/680b7d7c5f8f1bd3dcf4f123 \
  -H "Content-Type: application/json" \
  -d "{\"price\":43000000,\"stock\":8}"
```

---

### 5) حذف محصول

- **Method:** `DELETE`
- **URL:** `/api/products/:id`
- **Response (موفق):** نتیجه `deleteOne`

نمونه:

```bash
curl -X DELETE http://localhost:3000/api/products/680b7d7c5f8f1bd3dcf4f123
```

---

## نمونه داده محصول

اسکیما به‌صورت رسمی تعریف نشده، اما یک نمونه رایج:

```json
{
  "title": "Laptop",
  "price": 45000000,
  "stock": 5,
  "createdAt": "2026-04-25T08:30:00.000Z"
}
```

---

## کدهای وضعیت و خطاها

- `200` موفق برای دریافت/ویرایش/حذف
- `201` ایجاد موفق
- `404` مسیر نامعتبر یا نبودن محصول
- `500` خطای داخلی سرور (در برخی مسیرها)

---

## نکات توسعه و بهبود

برای حرفه‌ای‌تر کردن پروژه می‌توان موارد زیر را اضافه کرد:

- اعتبارسنجی ورودی‌ها (مثلا `title` اجباری و `price` عددی)
- مدیریت خطای یکپارچه و پاسخ استاندارد
- استفاده از متغیرهای محیطی برای `PORT` و `MONGODB_URI`
- افزودن لایه Service
- تست API با Jest/Supertest
- مستندسازی خودکار API با Swagger
- افزودن pagination و filter برای لیست محصولات

---

## اسکریپت‌ها

- `npm run dev` اجرای پروژه با nodemon
- `npm start` اجرای پروژه در حالت عادی

---

## لایسنس

این پروژه در حال حاضر با لایسنس `ISC` تنظیم شده است (مطابق `package.json`).

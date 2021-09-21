# Challenge Ch. 6 - Database & ORM

## Instalation

This app is connected to postgres DB on below server (dev mode):

     "database": "ulul_challenge",
     "host": "sql.madecanggih.dev"

You might config the db setup `config/config.json` to your local db.

1. Clone this repository

   `git clone https://github.com/uilmi/Challenge4-ORM.git`

2. Change directory

   `cd Challenge4-ORM`

3. Install dependencies

   `npm install`

4. Run the app

   `npm run dev`

5. Access the app on your browser using this URL

   `http://localhost:3000`

## Features

- Create, View, Update and Remove User
- User Dashboard `/dashboard`
- Fungsi CRUD untuk tabel `user_game` dengan API ExpressJS.
- Menghubungkan API dengan views `ejs`
- Bisa menyimpan ke `user_game_biodata` menggunakan Foreign Key
- Bisa menyimpan ke `user_game_biodata` menggunakan Foreign Key & Associate

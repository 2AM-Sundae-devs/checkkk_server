import express from 'express';

const router = express.Router();

export const homeRouter = router.get('/', (req, res) => {
  res.send(`<html>
              <header><title>Checkkk API Server</title></header>
              <body>
                <main>
                  <h1>Hi!</h1>
                  <h2>Check our WebSite</h2><a href='https://www.checkkk.com/'>https://www.checkkk.com</a>
                </main>
              </body>
   </html>`);
});

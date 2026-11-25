# Voltori Store

Voltori is an online gadget store (chargers, audio, smart-home and desk gear) selling to customers in the USA, using a dropshipping model (suppliers ship directly to the customer).

This repo holds the free storefront website, hosted on **GitHub Pages**.

## Live site
`https://<your-username>.github.io/voltori-store/`

## Files
| File | What it does |
|------|--------------|
| `index.html` | Page layout: header, hero, products, FAQ, contact, cart |
| `style.css` | All the styling |
| `script.js` | Product list, filters and cart. **Edit `PRODUCTS` here to add/change products and prices** |

## How to change products
1. Open `script.js` on GitHub → click the pencil (Edit).
2. Change the `PRODUCTS` list (name, category, price, old price, icon, description).
3. Click **Commit changes**. The live site updates in 1-2 minutes.

## Hosting (free)
Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.

## Next steps
- [ ] Replace `hello@voltori.store` with the real support email
- [ ] Add real product photos and supplier prices
- [ ] Add real checkout (e.g. Stripe Payment Links or Shopify Starter) instead of the email order button
- [ ] Buy a domain (e.g. voltori.store) and connect it in Settings → Pages
- [ ] Add Privacy, Shipping and Refund policy pages before taking payments
- [ ] Never commit API keys or passwords to this repo

## Disclaimer
Products and prices on the site are sample placeholders until real suppliers are confirmed.

# Pasgals Co.

## Overview
https://pasgals.com

Pasgals Co. is a small business based out of the University of Puget Sound in Tacoma, WA. Pasgals Co. sells vinyl stickers (currently only to local students as we don't have a shipping infrastructure, to be expanded soon!)

This repository contains all of the code for the Pasgals Co. website, hosted using Vercel. The site is an E-Commerce site, and largely supports two major features: browsing products and purchasing products. The front end was created primarily using React, along with some Material UI and community made components. The backend is an Express.js application ported to be usable with Vercel, and uses Stripe.js to process payments. 

## Repository Structure
| File/Directory    | Description |
| --------------    | ----------- |
| `api/`    | Textual product data and Vercel/Express backend |
| `public/`         | Product/site images|
| `scripts/` | Currently contains an image preprocessing script |
| `src`     | Mainly comprises of the react components for this project |

## Required Environment Variables
REACT_APP_STRIPE_PRIVATE_KEY (Stripe developer private key)

REACT_APP_STRIPE_PUBLIC_KEY (Stripe developer public key)

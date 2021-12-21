# Pasgals Co.

## Overview
https://pasgals.com
Pasgals Co. is a small business based out of the University of Puget Sound in Tacoma, WA. Pasgals Co. sells vinyl stickers (currently only to local students as we don't have a shipping infrastructure, to be expanded soon!)

This repository contains all of the code for the Pasgals Co. website, hosted using Vercel.

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

# Ramadan Finder

Find masajid, halal restaurants, and halal markets near you this Ramadan.

**Live**: [ramadan.bayanlab.com](https://ramadan.bayanlab.com)

Vibecoded with [BayanLab API](https://bayanlab.com/docs) to demonstrate what you can build with open Muslim community data.

## BayanLab API

This app uses 3 endpoints from the BayanLab API:

- `GET /v1/masajid` — Mosques and Islamic centers
- `GET /v1/halal-eateries` — Halal restaurants and cafes
- `GET /v1/halal-markets` — Halal grocery stores and butchers

Get your own API key: [bayanlab.com/docs](https://bayanlab.com/docs)

## Run Locally

```bash
git clone https://github.com/hududed/bayanlab-ramadan.git
cd bayanlab-ramadan
npm install
cp .env.local.example .env.local
# Add your BayanLab API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- [BayanLab API](https://bayanlab.com/docs) for data
- Deployed on [Vercel](https://vercel.com/)

## License

MIT

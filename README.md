# Influencer Panel (Creator Studio)

React (Vite) app where influencers register, wait for approval, log in, and go live.

## Folder structure
```
src/
├── main.jsx
├── App.jsx                  # routes: /register, /login, /dashboard
├── index.css
├── api/
│   └── axios.js              # axios instance, auto-attaches influencer_token
├── context/
│   └── AuthContext.jsx       # register/login/logout state
├── components/
│   ├── TopBar.jsx
│   ├── ZoomMeetingEmbed.jsx  # embeds Zoom Meeting SDK - no zoom.us branding
│   └── ProtectedRoute.jsx
└── pages/
    ├── Register.jsx
    ├── Login.jsx
    └── Dashboard.jsx          # pending / rejected / live studio views
```

## Setup
```bash
cp .env.example .env
npm install
npm run dev
```
Runs on **http://localhost:3002**.

## Flow
1. Influencer registers at `/register` → status = pending
2. Super Admin accepts them (in the Super Admin Panel)
3. Influencer logs in at `/login`
4. Dashboard shows:
   - **Pending** → waiting message
   - **Rejected** → shows reason
   - **Accepted** → "Go Live" button → creates a Zoom meeting via backend →
     embeds live video directly on this page using `@zoom/meetingsdk`
     (no redirect to zoom.us, no Zoom branding shown)

## Important note on Zoom SDK
`ZoomMeetingEmbed.jsx` uses the `@zoom/meetingsdk/embedded` client. This
requires valid `ZOOM_SDK_KEY` / `ZOOM_SDK_SECRET` set in the **backend** `.env`
(not this frontend) — the backend generates the join signature.

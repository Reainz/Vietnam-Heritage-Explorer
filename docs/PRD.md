# Product Requirements Document (PRD)

## Project Title
Cultural Map Web App – Vietnam Heritage Explorer

---

## Purpose & Vision
To create a simple, impactful, and unique web application that promotes and preserves Vietnam's cultural heritage. The app is designed for rapid prototyping, Gen Z engagement, and hackathon success, focusing on accessibility, education, and community impact.

---

## Target Users
- Gen Z and young adults interested in culture and heritage
- Tourists and locals seeking cultural experiences
- Tour guides and cultural stakeholders

---

## Problem Statement
Vietnam's rich cultural heritage is underrepresented in digital spaces. There is a need for an engaging, easy-to-use platform that helps users discover, learn about, and interact with cultural sites, while empowering local guides and communities.

---

## Solution Overview
A web-based platform that allows users to:
- Explore cultural heritage sites via an interactive map
- View details and stories of famous sites
- Collect virtual mascots as rewards for exploration
- Book tickets for cultural sites
- Connect with local tour guides
- Experience a simple, gamified, and mobile-friendly interface

---

## Core Features (MVP)
- **Landing Page**
  - Project introduction
  - Featured/Famous Sites: Highlight a few famous cultural heritage places and/or stories of the day
  - Clear CTAs: Browse culture places, View Wallet
- **Map & Heritage Explorer**
  - Interactive map (Leaflet.js or Google Maps API)
  - Filter by location/distance
  - List of cultural heritage sites (static data for MVP)
  - Details page: history, location, cost, etc.
- **Ticket Purchase**
  - Simple "Buy Ticket" button (simulated purchase, show discount)
- **Mascot Collection (Gamification)**
  - Users collect mascots by clicking a button on the site details page (skip QR code integration for MVP)
  - Collected mascots/tickets shown on main page or site details
- **Status Bar**
  - Display a simple message: "You have visited X places"
- **Tour Guide Connect**
  - List of available tour guides (static for MVP; skip registration and verification logic)
- **Rewards**
  - Give mascot or ticket after visiting a place (skip quest logic for MVP)
- **Mobile-Friendly UI**
  - Responsive design (Bootstrap)

---

## Features to Avoid (for MVP)
- Complex negotiation logic for tickets
- Real NFT/blockchain integration
- Heavy authentication/authorization
- Real-time chat/messaging
- Social sharing, feedback, and wallet page (unless time allows)

---

## Tech Stack
- **Frontend**: Bootstrap, JavaScript, Leaflet.js (map)
- **Backend**: Node.js, Express.js
- **Database**: SQLite (users, guides, mascots, sites)

---

## MVP Timeline (12 Hours)
- 2h: Project setup, basic UI, static map, site list
- 2h: Mascot logic, ticket purchase, status bar, rewards
- 2h: Tour guide list, polish UI/UX
- 2h: Mobile responsiveness
- 2h: Testing, bug fixes, prepare presentation deck
- 2h: Final review and presentation

---

## Success Criteria
- Users can browse and learn about cultural sites
- Users can collect mascots and see their progress
- Users can book tickets (simulated)
- Tour guides are discoverable
- App is visually appealing, easy to use, and mobile-friendly
- MVP is delivered within the hackathon timeframe

---

## Future Roadmap (Post-Hackathon)
- Add QR code mascot collection
- Enable user registration and authentication
- Add feedback and social sharing features
- Expand database with more sites and guides
- Integrate real ticketing/payment system
- Add loyalty points and advanced gamification

---

## References
- Challenge Statement and Grading Rubrics (see attached file)
- MVP Plan (see attached file)

---

## Notes
This PRD is your complete guide for building, presenting, and iterating on the project. Focus on MVP features and timeline for hackathon success.
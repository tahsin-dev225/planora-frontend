<div align="center">
  <img src="./public/img/planora-logo.png" alt="Planora Logo" width="120" />
  <h1>Planora</h1>
  <p>🚀 <strong>Orchestrate Seamless Events, Anytime, Anywhere.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/v1.0.0-blue.svg?style=for-the-badge" alt="Version" />
    <img src="https://img.shields.io/badge/Powered%20By-Next.js%2015-black.svg?style=for-the-badge&logo=nextdotjs" alt="Powered By Next.js" />
    <img src="https://img.shields.io/badge/UI-Shadcn%2FUI-000000?style=for-the-badge&logo=shadcnui" alt="UI" />
    <img src="https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Styling" />
  </p>
</div>

---

## 🌟 Introduction

**Planora** is a premium, full-stack event management platform designed to streamline the lifecycle of any event—from planning and registration to payment and participation. Built with a focus on high performance and sleek aesthetics, Planora provides a robust suite of tools for both organizers and attendees.

---

## ✨ Key Features

### 🏢 For Administrators & Organizers
-   **Admin Dashboard**: Real-time statistics and analytics using `Recharts`.
-   **User Management**: Full control over user accounts and permissions.
-   **Event Oversight**: Manage free and paid event requests seamlessly.
-   **Dynamic Event Creation**: Advanced forms with validation and image upload support.

### 👥 For Participants
-   **Seamless Booking**: Join events with a single click (Free or Paid).
-   **Secure Payments**: Integrated Stripe redirection for a polished checkout experience.
-   **Personal Dashboard**: Track participated events, reviews, and profile settings.
-   **Interactive Discovery**: Beautiful landing page with featured event carousels and categorization.

### 🛠️ Cutting-Edge UX/UI
-   **Glassmorphism Design**: Modern, semi-transparent aesthetics with tailored HSL colors.
-   **Smooth Scrolling**: Powered by `Lenis` for a premium navigational feel.
-   **Dark Mode First**: Optimized for high-contrast, eye-friendly dark environments.
-   **Responsive Layout**: Fully adaptive for mobile, tablet, and desktop screens.

---

## 🏗️ Technology Stack

| Category           | Technology                           |
| :----------------- | :----------------------------------- |
| **Framework**      | Next.js 15 (App Router)              |
| **Language**       | TypeScript                           |
| **Styling**        | Tailwind CSS v4, Vanilla CSS         |
| **UI Components**  | Shadcn UI, Radix UI                  |
| **State Management**| Redux Toolkit                        |
| **Animations**     | Lucide React, Framer Motion (implied)|
| **Carousel**       | Embla Carousel, Swiper               |
| **Icons**          | Lucide React                         |
| **Runtime**        | Bun (Optimized for performance)      |

---

## 🚀 Getting Started

### Prerequisites
-   [Bun](https://bun.sh/) (Recommended) or [Node.js](https://nodejs.org/)
-   A running backend API (Planora Backend)

### 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/tahsin-dev225/planora-frontend.git
    cd planora-frontend
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    BACKEND_URL=http://localhost:5000/api/v1
    FRONTEND_URL=http://localhost:3000
    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
    ```

4.  **Run for Development**:
    ```bash
    bun dev
    # or
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    bun build
    ```

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Layouts, Pages)
├── components/           # UI Components (Shared, Dashboard, Landing)
│   ├── common/           # Shared & Layout specific components
│   └── dashboard/        # Admin & User dashboard views
├── redux/                # Global state management
│   ├── app/              # Store configuration
│   └── features/         # Logic slices (API, Auth, Event, etc.)
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions & axios config
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">
  <p>Made with ❤️ by Tahsin & The Planora Team</p>
</div>

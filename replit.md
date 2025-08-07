# OncoVista AI - Clinical Decision Support Platform

## Overview
OncoVista AI is a medical-grade oncology platform providing AI-powered clinical decision support, role-based access control, and multi-module healthcare workflows. Its core purpose is to act as a smart assistant for oncologists, offering dynamic guidance, clinical decision support, oncology workflow tools, calculators, and educational resources. This system is strictly for educational and guidance purposes, not for Electronic Health Record (EHR) functionality. It aims to provide evidence-based protocols for a complete spectrum of cancer care, with a vision to be deployed in oncology practice settings for professional-grade clinical decision support.

## User Preferences
- **Communication Style**: Simple, everyday language avoiding technical jargon
- **Focus**: Clinical decision support only - no EHR features
- **Data Policy**: Educational/demo purposes only, no real patient data
- **Module Structure**: Tab-based layouts with modular cards and color-coded alerts
- **Documentation**: Comprehensive PRD created for product strategy and development roadmap

## System Architecture
OncoVista AI is built with a modern web stack: React 18 + TypeScript + Vite for the frontend, utilizing Tailwind CSS and ShadCN UI for a professional medical-grade interface with responsive design. Icons are provided by Lucide React. The backend is powered by Express.js + TypeScript, connected to a PostgreSQL database via Drizzle ORM. State management is handled by Zustand, and data fetching by TanStack React Query.

Core architectural decisions and design patterns include:
- **Modular Design**: The platform is structured into eight core modules: OPD, CDU, Inpatient Oncology, Palliative Care, AI Chat Assistant, Clinical Tools, Notes Export, and Analytics Dashboard. An additional Oncology Education Module provides AI-powered adaptive learning. All SCLC content has been integrated across relevant modules for improved workflow.
- **AI Integration**: OpenAI API is used for clinical recommendations and an AI Teaching Assistant for adaptive learning.
- **Authentication & Authorization**: Session-based authentication with robust role-based access control and an admin approval workflow for user management. This includes comprehensive logging and email notifications.
- **Database Schema**: PostgreSQL houses comprehensive medical workflow tables, clinical protocols, and treatment guidelines. Inputs for decision support are anonymous, and AI interactions are logged with confidence scores and audit trails.
- **UI/UX Decisions**: Emphasizes a clean, tab-based interface with modular cards and color-coded alerts for clarity. Responsive design is a core principle, optimized for mobile and tablet clinical workflows with touch-friendly interfaces.
- **Clinical Decision Support**: Features include AI-powered analysis, evidence-based protocol adherence tracking, real-time guideline compliance monitoring, and comprehensive clinical calculators. The Treatment Plan Selector is a key component, offering dynamic, database-driven, and clinically validated decision support across 75+ NCCN cancer types with comprehensive biomarker integration and smart fallback logic.
- **Security & Compliance**: Implements an auto-logout security feature with configurable timeout and detailed help documentation.
- **Development Tooling**: Includes automated component generation from markdown for content creation.

## External Dependencies
- **OpenAI API**: Used for AI-powered clinical recommendations, interactive guideline queries, and the AI Teaching Assistant.
- **PostgreSQL**: The primary database for storing all clinical workflow data, protocols, guidelines, and user information.
- **Nodemailer**: Utilized for sending email notifications as part of the user registration and admin approval workflow.
- **NCCN, ASCO, ESMO Guidelines**: Authentic clinical guidelines from these organizations are integrated and form the evidence base for clinical decision support and educational content across all modules.
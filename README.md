UMD 4-Year Planner - Updated Project Plan
Project Overview
A no-login-required web application that generates optimized 4-year plans for UMD students using official course data and historical grade information.

Core Technology Stack
Frontend: React + TypeScript + Tailwind CSS + React DnD

Backend: Node.js + Express (minimal API layer)

Database: PostgreSQL (caching merged course data)

Deployment: Vercel (frontend) + Railway (backend/database)

APIs: UMD.io (course data) + PlanetTerp (grade data)

Phase 1: Foundation & MVP (Weeks 1-3)
Week 1: Core Infrastructure
Set up development environment and project structure

Create basic React app with TypeScript and Tailwind

Establish PostgreSQL database on Railway

Build UMD.io API integration service

Create basic course search component

Week 2: Data Layer & Planning Algorithm
Build PlanetTerp API integration for grade data

Create course data merger (UMD.io + PlanetTerp)

Implement caching system for course information

Develop core plan generation algorithm

Build major requirement data structure

Week 3: Basic Planner UI
Create drag-and-drop semester grid component

Implement major selection and start year input

Build completed courses input system

Add basic requirement validation

Create simple PDF export functionality

Phase 2: Smart Features & Optimization (Weeks 4-6)
Week 4: Enhanced Planning Logic
Implement GPA-aware course placement

Add prerequisite validation and enforcement

Build credit balancing (12-17 credits per semester)

Create GENED requirement tracking

Develop transfer credit handling

Week 5: User Experience & Customization
Build course replacement interface with recommendations

Add "what-if" scenario support

Implement real-time requirement checking

Create visual progress indicators

Add semester swapping functionality

Week 6: Polish & Export Features
Enhance PDF export with professional formatting

Add plan sharing via unique URLs

Implement mobile-responsive design

Add error handling and user feedback

Performance optimization and caching

Phase 3: Advanced Features (Weeks 7-8)
Week 7: Intelligence Enhancements
Add professor rating integration

Implement course difficulty balancing

Build "similar students" recommendations

Add summer term planning

Create advanced validation warnings

Week 8: Testing & Launch
Comprehensive testing across majors

User acceptance testing with real students

Performance and load testing

Documentation and deployment

Launch and initial user feedback collection

Data Architecture
Core Data Sources:
UMD.io API (Primary):

Courses, prerequisites, GENED attributes

Departments, majors, course descriptions

Official course requirements

PlanetTerp API (Enhancement):

Average GPAs and grade distributions

Professor ratings and difficulty scores

Course popularity metrics

Database Schema:
courses - Merged course data from both APIs

majors - Major requirements and templates

gened_categories - GENED requirement mapping

base_plans - UMD's template plans per major

user_sessions - Anonymous user plans

Key Features by Phase
MVP Features (Phase 1):
Major selection with start year

Completed courses input

Basic 4-year plan generation

Drag-and-drop course moving

Simple requirement checking

PDF export

Enhanced Features (Phase 2):
GPA-optimized course placement

Smart course recommendations

GENED requirement tracking

Transfer credit handling

Mobile responsiveness

Plan sharing URLs

Advanced Features (Phase 3):
Professor quality integration

Difficulty-balanced semesters

Summer term planning

"What-if" major scenarios

Advanced validation and warnings

API Integration Strategy
Course Data Flow:
Fetch course basics from UMD.io

Enhance with grade data from PlanetTerp

Merge and cache in PostgreSQL

Serve optimized data to frontend

Caching Strategy:
Course data: 24-hour cache

Search results: 1-hour cache

User sessions: 24-hour expiration

Major requirements: Weekly updates

Risk Mitigation
Technical Risks:
API Rate Limiting: Implement aggressive caching

Data Inconsistencies: UMD.io as source of truth, PlanetTerp as enhancement

Performance: Client-side caching + CDN distribution

User Experience Risks:
Complex Planning: Progressive disclosure and smart defaults

Data Loss: Auto-save with session tokens

Confusion: Clear requirement status and warnings

Success Metrics
Plan generation under 3 seconds

90%+ requirement accuracy

Mobile usability score > 80

User return rate > 40%

Future Expansion Possibilities
Transfer student optimization

Graduate school pathway planning

Scholarship requirement tracking

Course schedule conflict detection

Textbook cost estimates

Final Stack & Data Sources
Primary APIs:
UMD.io API - Official course data, prerequisites, GENED info

PlanetTerp API - Average grades, professor ratings, grade distributions

Data Split:
From UMD.io:

Course codes, titles, credits, descriptions

Structured prerequisites

GENED requirements

Departments, majors

Semester availability

From PlanetTerp:

Average GPA per course

Grade distributions (A%, B%, C%, etc.)

Professor ratings and difficulty

Course reviews sentiment

Minimal Stack:
Frontend: React + TypeScript + Tailwind CSS + React DnD

Backend: Node.js + Express (API proxy + data merging)

Database: PostgreSQL (cache merged course data)

Deployment: Vercel + Railway

Data Merging Strategy:
Fetch course basics from UMD.io

Enhance with grade data from PlanetTerp

Cache merged results in PostgreSQL

Use for smart planning algorithm

Why Both Are Essential:
UMD.io: Reliable, official prerequisites and requirements

PlanetTerp: Critical for GPA optimization algorithm
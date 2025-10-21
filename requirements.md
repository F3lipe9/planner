UMD 4-Year Planner - Project Requirements
1. Functional Requirements
1.1 User Onboarding & Setup
FR1.1: User can select major from dropdown list

FR1.2: User can select start year (current year + 5 years future)

FR1.3: User can input completed courses with auto-complete

FR1.4: User can mark GENED requirements as completed via checkbox list

FR1.5: System generates plan immediately after setup completion

1.2 Plan Generation
FR2.1: System generates 4-year plan based on selected major

FR2.2: Plan respects prerequisite chains and course sequences

FR2.3: Plan balances credits (12-17 per semester, 30 annually)

FR2.4: Plan optimizes for course GPA where possible

FR2.5: System uses UMD base plans as starting template

1.3 Plan Customization
FR3.1: User can drag and drop courses between semesters

FR3.2: User can replace courses with recommended alternatives

FR3.3: System validates moves against prerequisites

FR3.4: User can add/remove elective courses

FR3.5: Real-time credit calculation per semester

1.4 Requirement Tracking
FR4.1: System tracks major requirement completion progress

FR4.2: System tracks GENED requirement completion

FR4.3: Visual indicator shows overall requirement status

FR4.4: Hover details show specific missing requirements

FR4.5: System alerts on prerequisite violations

1.5 Export & Sharing
FR5.1: User can export plan as PDF

FR5.2: PDF includes course list and requirement status

FR5.3: System generates shareable URL for plan

FR5.4: Shared plans are read-only

2. Technical Requirements
2.1 Data Management
TR1.1: Integrate with UMD.io API for course data

TR1.2: Integrate with PlanetTerp API for grade data

TR1.3: Cache course data for 24 hours

TR1.4: Merge UMD.io and PlanetTerp data efficiently

TR1.5: Store user sessions anonymously with 24-hour expiry

2.2 Performance
TR2.1: Plan generation completes within 3 seconds

TR2.2: Course search responds within 500ms

TR2.3: Support 100 concurrent users

TR2.4: Mobile load time under 3 seconds

TR2.5: API calls implement rate limiting and retry logic

2.3 User Experience
TR3.1: Fully responsive design (mobile, tablet, desktop)

TR3.2: Accessible per WCAG 2.1 AA standards

TR3.3: No login required for basic functionality

TR3.4: Intuitive drag-and-drop interface

TR3.5: Clear error messages and validation feedback

3. Data Requirements
3.1 External Data Sources
DR1.1: Course information from UMD.io API

DR1.2: Grade distributions from PlanetTerp API

DR1.3: Major requirements from UMD published documents

DR1.4: GENED requirements from UMD official lists

3.2 Data Structures
DR2.1: Course object with merged UMD.io + PlanetTerp data

DR2.2: Major requirement mapping

DR2.3: GENED category and course mapping

DR2.4: User plan session data

DR2.5: Base plan templates per major

4. Non-Functional Requirements
4.1 Reliability
NFR1.1: 99% uptime for core functionality

NFR1.2: Graceful degradation if APIs are unavailable

NFR1.3: Data persistence for 24-hour user sessions

NFR1.4: Error recovery for failed API calls

4.2 Security
NFR2.1: No personal data collection

NFR2.2: CORS properly configured

NFR2.3: Input sanitization on all user inputs

NFR2.4: Rate limiting on API endpoints

4.3 Maintainability
NFR3.1: TypeScript for type safety

NFR3.2: Comprehensive code documentation

NFR3.3: Modular component architecture

NFR3.4: Automated testing for critical paths

5. Compliance Requirements
5.1 Legal
CR1.1: Clear "unofficial tool" disclaimer

CR1.2: Compliance with UMD branding guidelines

CR1.3: Respect API rate limits and terms of service

CR1.4: Proper attribution to data sources

5.2 Privacy
CR2.1: No collection of personal information

CR2.2: Anonymous session storage only

CR2.3: Clear privacy policy explaining data usage

CR2.4: GDPR-compliant analytics (if implemented)

6. Constraints
6.1 Technical Constraints
TC1: Must work without user registration

TC2: Must function within free tier hosting limits initially

TC3: Must support latest 2 versions of major browsers

TC4: Must be mobile-first responsive design

6.2 Business Constraints
BC1: No budget for paid APIs or services initially

BC2: Must be maintainable by a small team

BC3: Must be deployable within 8 weeks

BC4: Must support UMD's academic structure

7. Acceptance Criteria
7.1 Core Functionality
AC1: User can generate a valid 4-year plan in under 5 steps

AC2: Generated plans meet major and GENED requirements

AC3: Plan customization persists during session

AC4: Export functionality produces readable PDFs

AC5: Requirement tracking is accurate and clear

7.2 Performance
AC6: Application loads in under 3 seconds on 3G

AC7: Plan generation completes in under 3 seconds

AC8: Course search returns results in under 1 second

AC9: Drag-and-drop operations are smooth and responsive

7.3 Compatibility
AC10: Works on Chrome, Firefox, Safari, Edge

AC11: Responsive on devices from 320px to 1920px width

AC12: Accessible via keyboard navigation

AC13: Functions without JavaScript errors

8. Out of Scope
8.1 Excluded Features
User accounts and permanent saving

Integration with student information systems

Real-time course availability checking

Professor scheduling conflicts

Classroom location mapping

Textbook price integration

Social features or sharing to social media

Multi-language support

Advanced analytics and reporting

8.2 Future Considerations
Transfer student optimization

Graduate school pathway planning

Scholarship requirement tracking

Course rating and review system

Integration with ULD login (if approved)

Advanced "what-if" scenario modeling

Priority Classification:

P0: Must have for MVP (Weeks 1-3)

P1: Should have for enhanced experience (Weeks 4-6)

P2: Nice to have for advanced features (Weeks 7-8)

P3: Future enhancements (Post-launch)
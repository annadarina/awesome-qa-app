# Awesome Q&A App

- [Challenge](#challenge)
- [Requirements](#requirements)
- [Project Setup](#project-setup)
- [Implementation](#implementation)
- [Final Notes](#final-notes)

You can check live preview [here]().

### Challenge

Based on the provided requirements, build a questions and answers web app using React and TypeScript.

### Requirements

- A user can create, edit and remove question.

- A user can sort all the questions in alphabetical order.

- A user can remove all the questions.

- A user can add/remove question with 5 sec delay.

- Show info message if there's no questions on the page.

- Show tooltip to explain the purpose of each section (show tooltip messages for the main titles).

### Project Setup

Install dependencies

### `npm install`

Run the project

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Build the project

### `npm run build`

Launch the test runner in the interactive watch mode

### `npm test`

### Implementation

**Base Setup**: CRA + TypeScript

**State Management**: Redux Toolkit

**Note**: For the demo purpose only I decided to store all the application state in the `localStorage`. If there's data
in the `localStorage`, it's preloaded to the Redux store.

**Tests**: All components are tested with React Testing Library.

### Final Notes

I've implemented all the functional requirements. Since the page design was up to me, I decided to go with a different
page
mock up. I aimed to focus not only on the core features but also on usability and user experience. In my opinion, I've
succeeded in creating a user-friendly app with a minimalistic design.

The app is almost fully accessible via the keyboard, and a focus trap is implemented for the `Modal` component. I've
also included clear messages for users and confirmation dialogs for removing all questions or a single one.
Additionally,
I've added some CSS styles to ensure the app looks good on smaller devices.

As a bonus I decided to add theme switcher to the project. Since I use plain CSS for styling my components, the approach
is very straightforward. Check `ThemeProvider` for more details.

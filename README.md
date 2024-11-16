# ReadEase: An Assistive Learning Platform for Dyslexia

## Installation instruction

To install necessary software go the project root folders for both the frontend and server folders, and enter: `npm i`

Enter the server folder, and run `npm install -g nodemon`

Enter your OPENAI api key in the corresponding server file.

First run the server with `nodemon index.js` from the server folder.

Then, from a different terminal window, run the frontend with `npm run dev` from the frontend folder.

NOTE: Your editor may show errors when using `react-hook-form` in a couple of the components, such as:
`Module '"react-hook-form"' has no exported member 'useForm'.` This should not prevent the code from running, and can be
ignored.

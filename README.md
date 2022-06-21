# Print-R2

Print-R2 is an application that provides users with 3D Printers with a dashboard and ordering system that will streamline their print-on-demand services.

## Project Scope

- Web application built with react.
- Mobile application will be built with React-Native.
- API built with remaining MERN stack.

## Client Side 

The client side of this application will allow users to make an account, link payment accounts, and set up their ordering services based on their own printing abilites.

## Users

Each user can create an account with email varification and validation. It will allow the user to store their name and other information, to access their orders, and to edit those orders. This information is passed to and stored in the API. 

## Orders

Each Order will contain the user's name, email, order file, and quantity. The order file is referenced in the API and the file itself is stored in Cloudinary. 

## File Uploads

Print-R2 allows STL file uploads. Those files are sent to Cloudinary and referenced in the API. This will also allow drag and drop file uploading.

# ToDo-Project
ToDo Project using react and spring-boot

1.ToDo-Application
  -it is backend project folder.
  -components used:
    1.spring boot - for creating a stand alone project.
    2.spring web - for creating Rest apis.
    3.spring dev tools - for every time save program it automatically runs.
    
  -project structure:

  
    ToDo-Appllication/
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/
    │       │       └── todo/
    │       │           └── ToDo/
    │       │               └── Application/
    │       │                   ├── controller/
    │       │                   ├── model/
    │       │                   ├── repository/
    │       │                   ├── service/
    │       │                   └── security/      <-- JWT-related files
    │       └── resources/
    │           ├── application.properties
    │           └── static/       <-- if needed
    │           └── templates/    <-- if using Thymeleaf
    ├── pom.xml

2.ToDo-FrontEnd
 -it is forntend project folder
 -components used:
   1.React js         - for frontend designing.
   2.Tailwind css     - for styles.
   3.react-router-dom - for page Navigation.

  -project structure:
  
    ToDo-Frontend/
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── assets/           <-- images, icons, etc.
    │   ├── components/       <-- reusable UI pieces
    │   ├── pages/            <-- app pages (e.g., Login, Dashboard)
    │   ├── services/         <-- API calls (axios)
    │   ├── utils/            <-- token helpers, validations, etc.
    │   ├── App.jsx
    │   ├── main.jsx          <-- entry point (Vite or CRA)
    ├── package.json
    ├── vite.config.js        <-- if using Vite


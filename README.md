# Restaurant Project
This repository contains the source code for the frontend of Mascotte Restaurant web application.
## Folder Structure
restaurent/
├── client/
│   ├── src/
│   │   ├── assets/                (Static assets: images, fonts, etc.)
│   │   │   ├── images/            (images)
│   │   │   │    ├── login-icon.ico (image) 
│   │   ├── components/            (Reusable UI)
│   │   │   ├── Copyright.jsx             (Copyright)
│   │   │   ├── AddArticleDialog.jsx      (AddArticleDialog)
│   │   │   ├── AddCategorieDialog.jsx    (AddCategorieDialog)
│   │   │   ├── EditArticleDialog.jsx     (EditArticleDialog)
│   │   │   ├── EditCategorieDialog.jsx   (EditCategorieDialog)
│   │   │   ├── LogoutButton.jsx          (LogoutButton)
│   │   │   ├── Navbar.jsx                (Navbar)
│   │   ├── pages/                 (Page-level components)
│   │   │   ├── Articles.jsx         (Articles)
│   │   │   ├── Categories.jsx       (Copyright)
│   │   ├── context/               (React Context providers)
│   │   ├── hooks/                 (Custom React hooks)
│   │   │   ├── login.jsx           (custom login.jsx)
│   │   ├── services/              (API services, utilities)
│   │   ├── styles/                (Global and SASS styles)
│   │   │   ├── login-styles.scss  (login-styles)
│   │   ├── utils/                 (Utility functions)
│   │   │   ├── firebaseConfig.js  (firebaseConfig)
│   │   │   ├── UploadFirebase.js  (UploadFirebase)
│   │   ├── Routes.js               (all Routes)
│   │   ├── redux/                  (Redux-related files)
│   │   │   ├── actions/            (Redux action creators)
│   │   │   │    ├── authAction.js          (authAction)
│   │   │   │    ├── categoriesActions.js   (categoriesActions)
│   │   │   │    ├── articlesActions.js     (articlesActions)
│   │   │   ├── reducers/                   (Redux reducers)
│   │   │   │    ├── authReducer.js         (authReducer)
│   │   │   │    ├── categoriesReducer.js   (categoriesReducer)
│   │   │   │    ├── articlesReducer.js     (articlesReducer)
│   │   │   │    ├── index.js         (index)
│   │   │   ├── selectors/          (Redux selectors)
│   │   │   ├── store.js            (Redux store configuration)
│   │   │   ├── actionTypes.js      (Redux type action)
│   │   │
│   │   ├── App.js                 (Main app component)
│   │   ├── index.js               (App entry point)
│   │   ├── ...
│   │
│   ├── package.json
│
├── server/
│   ├── package.json 
│   ├── routes
│   │    ├── auth.route.js          (auth.route)
│   │    ├── articles.route.js      (articles.route)
│   │    ├── categories.route.js      (categories.route)
│   ├── controllers
│   │    ├── auth.js                (auth)
│   │    ├── articles.js      (articles)
│   │    ├── categories.js      (categories)
│   ├── config
│   ├── server.js



#gitlab credentials token
user : Mohamed HAZAMI
pass : glpat-zyt932Wg3NNLKYy2fHud


logicom-dev
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
       

#gitlab
#to push repo to gitlab 
git add .
git commit -m "your commit"
sudo git push --set-upstream origin main 

#docker
#to delete all images 
sudo docker images ls -a
sudo docker rmi $(sudo docker images -q)

#remove all cache
sudo docker image prune -a

#remove container
sudo docker ps -a
sudo docker stop $(sudo docker ps -aq)
sudo docker rm -f $(sudo docker ps -aq)
#sudo docker-compose down --remove-orphans

#build whitout cach
sudo docker-compose up --build --force-recreate

#render.com
Docker Command : cd client && npm start & cd server && npm start

#node 
nvm install 18.17.0
nvm use 18.17.0

npm install -g npm

npm install




   "proxy": {
     "production": "%REACT_APP_PROXY_PROD%",
     "development": "%REACT_APP_PROXY_DEV%"
   }

   "proxy": "http://localhost:6000"

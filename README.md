# KarmaFarm

<img width="1508" alt="Screen Shot 2022-06-16 at 11 34 12 AM" src="https://user-images.githubusercontent.com/97040789/174106857-5267ca18-4c3c-4a64-b414-473cb5e82ddf.png">

## An app for small farms and their restaurant clients.

KarmaFarm is built on React/Redux, HTML, and CSS for its frontend, Express and Sequelize for its backend, and a PostgreSQL database.
<div style="display:flex,gap:1rem">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/>
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=40/>
</div>
<div style="display:flex,gap:1rem">
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/>
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/>
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/>
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/>
  <img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>
</div>




# Getting Started
1. Clone this repository <br />

&ensp;&ensp;`git clone https://github.com/da5idf/karmafarm.git`

2. Install dependencies  <br />

&ensp;&ensp;`npm install`

3. Create a .env file in the root direction based on the .env.example given.  <br />

4. Create a user in psql based on your .env DB_USERNAME. <br />

&ensp;&ensp;`psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`

5. Create a database in psql based on your .env DB_DATABASE. <br />

6. Start your shell and migrate and seed the database.   <br />

&ensp;&ensp;`npx dotenv sequelize db:migrate`   <br />

&ensp;&ensp;`npx dotenv sequelize db:seed:all`

7. Change directory into the frontend and backend folders in two shells. Run both servers with: <br />

&ensp;&ensp;`npm start`

## Dashboard
# Restaurant Dashboard
On the Dashboard, Restaurant Users can view their orders, view newly release items and submit feedback on their orders. 
If the Restaurant User is the owner of that Restaurant, this User is an admin user. By being an admin user, an Admin Key
button renders at the top of the dashboard. The admin user can provide this key to staff of the restaurant to enable them
to create their own profiles as a member of the Restaurnat.
<img width="1261" alt="Screen Shot 2022-06-16 at 11 38 31 AM" src="https://user-images.githubusercontent.com/97040789/174108467-d13e64df-5cea-4f8c-a182-520c6904682c.png">


# Farmer Dashboard
Logging in as a Farmer gives the user additional features. 
1. Instead of a feedback form, the Farmer views a list of feedback. <br />
2. All restaurants are rendered as Restaurant Cards <br />
3. The Farmer can select one of the Restaurt Cards to filter the order list and feedback list for only that restaurant. <br />
<img width="1237" alt="Screen Shot 2022-06-16 at 11 44 10 AM" src="https://user-images.githubusercontent.com/97040789/174110864-3c40120b-9f30-46e2-82f4-cea1cd66d3b1.png">

## New Order


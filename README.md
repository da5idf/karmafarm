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

# Dashboards
## Restaurant Dashboard
On the Dashboard, Restaurant Users can view their orders, view newly release items and submit feedback on their orders. 
If the Restaurant User is the owner of that Restaurant, this User is an admin user. By being an admin user, an Admin Key
button renders at the top of the dashboard. The admin user can provide this key to staff of the restaurant to enable them
to create their own profiles as a member of the Restaurnat.
![Screen Shot 2022-06-20 at 10 30 30 AM](https://user-images.githubusercontent.com/97040789/174624461-ec873167-1dde-4509-8162-79a73d20220e.png)

## Farmer Dashboard
Logging in as a Farmer gives the user additional features. 
1. Instead of a feedback form, the Farmer views a list of feedback. <br />
2. All restaurants are rendered as Restaurant Cards <br />
3. The Farmer can select one of the Restaurt Cards to filter the order list and feedback list for only that restaurant. <br />
![Screen Shot 2022-06-20 at 10 31 06 AM](https://user-images.githubusercontent.com/97040789/174624545-a217a60b-b484-4686-9489-9b93fe916f20.png)

# Restaurant Features
## New Order
Clicking "New Order" on the restaurant dashboard takes the restaurant user to a New Order page where they can browsing products. Here, users can add items to their cart by selecting a quantity and pressing "Add to Cart". Users can edit the quantitiy of an item or remove an item from their cart from this page as well.
![Screen Shot 2022-06-20 at 10 33 47 AM](https://user-images.githubusercontent.com/97040789/174625083-eac110f7-adb9-4095-93cd-db329ab88fd6.png)

## Cart
Clicking "View Cart" from the New Order page takes the restaurant user to the cart view of their order. Each item is displayed as a line item on a table, with the order total and order item count conveniently located at the top right of the page. Like on the New Order page, users can edit or remove items from their cart from this page as well. In addition, Users must select a delivery date in order to submit the order.
![Screen Shot 2022-06-20 at 10 36 41 AM](https://user-images.githubusercontent.com/97040789/174625556-dfe4d78e-a1d8-4858-8a5e-b261f1ef877b.png)

## Invoice 
Upon successful submission of an order, users can view an invoice of their order. If the order is not within 24-hours of delivery, they can reopen the order by clicking "Reopen Order" at the top of the page. This will allow users to add or edit products on their order.
![Screen Shot 2022-06-20 at 10 37 57 AM](https://user-images.githubusercontent.com/97040789/174625784-640e2519-1c2a-40a1-94e7-69e08c2d27fb.png)

# Farmer Features
## Add and Edit Products
The Farmer Users can add or edit products from their Product Page.
![Screen Shot 2022-06-20 at 10 39 52 AM](https://user-images.githubusercontent.com/97040789/174626162-3785a19b-e946-4152-b6a4-eb2feee86db1.png)


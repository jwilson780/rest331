import { addNewContact, getContacts } from "../controllers/controller";

const routes = app => {
  //Contact Route
  app
    .route("/contact")
    .get((req, res, next) => {
      //middleware
      console.log(`Request from:${req.originalUrl}`);
      console.log(`Request from:${req.method}`);
      next(); //allows the next function to happen
    }, getContacts)
    .post(addNewContact);

  //Contact ID routes

  app
    .route("/contact/:contactId")
    .put((req, res) => res.send("PUT request successfull"))
    .delete((req, res) => res.send("DELETE request sucessfull"));
};

export default routes;

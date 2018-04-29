const routes = (app) => {

    //Contact Route
    app.route('/contact')
    .get((req,res) => 
        res.send('GET Request sucessfull')
    )
    .post((req,res) => 
        res.send('Post Reqest sucessfull')
    );

    //Contact ID routes

    app.route('/contact/:contactId')
    .put((req,res) =>
        res.send('PUT request successfull')
    )
    .delete((req,res) =>
        res.send('DELETE request sucessfull')
    );
}

export default routes;
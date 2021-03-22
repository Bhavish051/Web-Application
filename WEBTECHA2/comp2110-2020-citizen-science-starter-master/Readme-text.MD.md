Readme-text.MD

This is a file containing details about how this web application works

There is file called index.html that contains the structure of the page and also imports handlebars and the other javascript files as modules. The html file also has the handlebars scripts required to display wide range of data in the page. It contains scripts to view an array of observations, array of users, individual observation, individual user as well as displays the form.

The application is modular in structure with the javascript code required to display different data as well as add it, divided in different files to adapt to the Model View Controller format. Following this the Javascript code is in 4 files in total.
1. Model.js is the code resposible for importing the data into the appication. It achieves that using the fetch function and creating various events in response to the retrival of data. Along with that it also does the job of providing specific data e.g. observations of a single user, also it adds the data into the api by using the POST method.
2. Util.js is a helper javascript file which gives the hash path of the page the user is currently in and returns the location divided in two parts the location and second, the id of the page.
3. View.js is the page that contains the functions to apply the handlebars template to display the observations and the users on the page as well as when the user requests to see the individual user and oberservation details.
4. Main.js basically achieves the fulfills the user requests by calling the required functions whenever the user click the appropriate buttons on the page. The initial loding of the data is done using the event listeners which are called upon successfull retrieval of data from the api.


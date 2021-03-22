import {Model} from './model.js';
import * as views from  './views.js';
import {split_hash} from './util.js';

/*
This eventListerner is called when the data is loaded into the application from the api.
As well as when the data is loaded displays the home page with the users list and the top ten observations
*/
window.addEventListener("modelUpdated", function()
{
    let Users = Model.get_users();
    views.apply_template("User-template","Users",{'Users':Users}, "Users");
    let Recent_Observations = Model.get_recent_observations(10)
    views.apply_template("Observations-template","Observations",{'Observations' :Recent_Observations}, "");
    document.getElementById("form").innerHTML = ''; 
    OnHashChangeFunction();
})
/*
This function is called as soon the window is loaded. It calls the functions in the model to load the users and the
observations also checks if the user has directly requested some other link using the onhashchangefunction.
*/
window.onload = function() {
    Model.update_users();
    Model.update_observations();
     
};
/*
This function is called when the user submits the form to add a new observation
*/

document.getElementById("form").onsubmit = function(event)
{
    let formdata = new FormData(formdata);
    Model.add_observation(formdata);
    return false;
}

/*
This clicked function is called to handle the hash changes on the page. Whenever the user clicks on a link the hash
of the page changes and the function compares the hash to take the user to the required page.
What clicked function does is checks the path of the page and then just displays the required part and 
for the parts that are not required makes the inner HTML of those to be an empty string.
This function uses the util.js to retrieve the current location on the page
*/
function OnHashChangeFunction()
{   
    let code = split_hash(window.location.hash);    // this variable stores the current page location
    if(code.path === 'users')
    {
        document.getElementById("form").innerHTML = '';
        let bool = code.id == null;             // a boolean varible used to track if we are in ./---
        if(bool === true)                       // null indicating we are in ./---
        {
            let Users = Model.get_users();
            views.apply_template("User-template","Users",{'Users':Users}, "All Users");
            document.getElementById("Observations").innerHTML = '';
        }
        else
        {
            let Observations = Model.get_user_observations(code.id)
            let User = Model.get_user(code.id)
            views.apply_template("User-View", "Users", User, "");
            views.apply_template("Observations-template","Observations",{'Observations' :Observations}, "");
        } 
    }
    else if(code.path === 'observations')
    {
        document.getElementById("form").innerHTML = '';             // the form part is kept an empty string when not required
        let bool = code.id == null;
        if(bool === true)
        {
            let Observations = Model.get_observations();
            document.getElementById("Users").innerHTML = '';
            views.apply_template("Observations-template","Observations",{'Observations' :Observations},"");
        }
        else
        {
        let Observation = Model.get_observation(code.id)
        views.apply_template("Observation-View","Observations",Observation,"");
        document.getElementById("Users").innerHTML = '';
        }
    }
    else if(code.path === 'submit')
    {
        views.view_form("form");
        document.getElementById("Users").innerHTML = '';                // the Users and Observations are put to empty strings when the form is displayed
        document.getElementById("Observations").innerHTML = '';
    }
}

window.onhashchange = OnHashChangeFunction;




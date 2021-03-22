export {apply_template ,view_form};
/*
This function apply_template runs the Handlebars scripts and displays various data according to the parameters passed.
*/
function apply_template(templateid, targetid, data, targetheading) 
{
    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    )
    let heading = '<h2>' + targetheading + '</h2>';
    target.innerHTML = heading + template(data);
}

/*
This function viewform runs the handlebars script to display the form when the user presses the 
submit an observation button.
*/
function view_form(targetid)
{
    let target = document.getElementById(targetid);
    let template = Handlebars.compile(
        document.getElementById("Form-template").textContent
    );
    let Content = template()
    let heading = '<h2>' + 'Submit an Observation' + '</h2>'
    target.innerHTML =  heading + Content;
}
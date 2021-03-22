export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: [],
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {

        fetch(this.users_url)

        .then(
            function(response)
            {
                return response.json();
            }
        )
        .then(
            (data) =>
            {
                this.data.users = data;
                let event = new CustomEvent("modelUpdated", {detail: this});
                
                window.dispatchEvent(event);
            }
        )
        
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {

        fetch(this.observations_url)
        .then(
            function(response)
            {
                return response.json();
            }
        )
        .then(
            (data) =>
            {
                this.data.observations = data;
                let event = new CustomEvent("modelUpdated", {detail: this});
                window.dispatchEvent(event);
            }
        );
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
      return this.data.observations
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        let data = this.get_observations();
        for(let i =0 ; i<data.length ; i++)
        {
            if(data[i].id === parseInt(observationid))
            {
                return data[i];
            }
        }
        return null;
    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(formdata) {
     fetch('/api/observations', {
        method: "POST",
        body: formdata
     }) 
     .then((Response) =>
     {
        return Response.json();
     })
     .then((data) => {
        let event = new CustomEvent("observationAdded", {detail : data})
        window.dispatchEvent(event);
        console.log(event.detail);
    }) 
    
    },

    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        let result = [];
        let data = this.get_observations();
        for(let i =0; i< data.length; i++)
        {
            if(data[i].participant === parseInt(userid))
            {
                result.push(data[i]);
            }
        }
        result.sort(function(a,b)           // This function sorts the data passed i.e. array of observations in this case in ascending order of timestamp
        {
            let t1 = new Date(a.timestamp);
            let t2 = new Date(b.timestamp);
            if(t1 < t2) return 1;
            if(t1 > t2) return -1;
            return 0;
        })
        return result;
    },

    // get_recent_observations - return the N most recent
    // observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
        let content = this.data.observations;
        content.sort(function(a,b)          // This function sorts the observation in ascending order of timestamp
        {
            var t1 = a.timestamp;
            var t2 = b.timestamp;
            if(t1 < t2) return 1;
            if(t1 > t2) return -1;
            return 0;
        })   
        let Recent_Observations = content.slice(0,N);       // This function returns the top N elements of the array excluding N
        return Recent_Observations;
    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },

    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
        let Array = this.get_users();
        for(let i =0 ; i< Array.length ; i++)
        {
            if(Array[i].id === parseInt(userid))
            {
                return Array[i];
            }
        }
        return null;
    }

};

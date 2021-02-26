function listEntities() {
    //get the first name 
    var entities  = document.getElementById('entities').value
    //construct the URL and redirect to it
    window.location = '/people/search/' + encodeURI(entities)
}
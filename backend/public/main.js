function create() {
    console.log('hi');

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://121.1.71.52:3000/main')
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send();

    let newData;

    xhr.addEventListener('load', function() {        
        newData = JSON.parse(xhr.response);
        return newData
    })


}
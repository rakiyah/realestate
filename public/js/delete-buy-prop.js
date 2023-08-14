function deleteBuyProp(buyer_id, property_id) {
    const data = {
        buyer_id: buyer_id,
        property_id: property_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-buy-prop', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // reload page
            location.reload() 
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('there was an error with the input')
        }
    }
    xhttp.send(JSON.stringify(data))
}
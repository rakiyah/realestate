function deleteSeller(seller_id) {
    const data = {
        seller_id: seller_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-seller', true)
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


function deleteBuyer(buyer_id) {

    const data = {
        buyer_id: buyer_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-buyer', true)
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

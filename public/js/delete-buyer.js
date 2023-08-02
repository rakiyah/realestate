function deleteBuyer(buyer_id) {

    const data = {
        buyer_id: buyer_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-buyer', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            
            deleteRow(buyer_id)
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('there was an error with the input')
        }
    }
    xhttp.send(JSON.stringify(data))
}

function deleteRow(buyer_id) {
    const table = document.getElementById('buyers-table')
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value')) {
            table.deleteRow(i)
            break
        }
    }
    xhttp.send(JSON.stringify(data))
}
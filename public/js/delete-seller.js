function deleteSeller(seller_id) {
    const data = {
        seller_id: seller_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-sellerf', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(seller_id)
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('there was an error with the input')
        }
    }
    xhttp.send(JSON.stringify(data))
}

function deleteRow(seller_id) {
    const table = document.getElementById('sellers-table')
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value')) {
            table.deleteRow(i)
            break
        }
    }
    xhttp.send(JSON.stringify(data))
}

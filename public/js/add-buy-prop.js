const addBuyPropForm = document.getElementById('add-buy-prop-form')

addBuyPropForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const input_buyer_id = document.getElementById('select-buyer')
    const input_property_id = document.getElementById('select-property')

    const data = {
        buyer_id: input_buyer_id.value,
        property_id: input_property_id.value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/add-buy-prop', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowtoTable(xhttp.response)

            input_buyer_id.value = ''
            input_property_id.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }
    
    xhttp.send(JSON.stringify(data))
})

addRowtoTable = (data) => {
    const current_table = document.getElementById('buy-prop-table')
    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length-1]

    const row = document.createElement('TR')
    let buyer_cell = document.createElement('TD')
    let property_cell = document.createElement('TD')

    buyer_cell.innerHTML = new_row.buyer_id
    property_cell.innerHTML = new_row.property_id


    const delete_cell = document.createElement('button')
    delete_cell.innerHTML = 'DELETE'
    delete_cell.onclick = function() {
        // deleteBuyProp(new_row.)
        console.log(new_row)
    }

    row.appendChild(buyer_cell)
    row.appendChild(property_cell)
    row.appendChild(delete_cell)

    // row.setAttribute('data-value', new_row.)

    current_table.appendChild(row)

    // const select_menu = document.getElementById
}
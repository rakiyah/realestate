// get objects from form
const addPropertyForm = document.getElementById('add-property-form')

// modify the objects
addPropertyForm.addEventListener('submit', function (e) {
    e.preventDefault()

    // get form fields
    const input_address = document.getElementById('input-address')
    const input_lprice = document.getElementById('input-lprice')
    const input_seller_id = document.getElementById('input-sellerid')
    const input_on_market = document.getElementById('input-market')

    const on_market_value = input_on_market.checked ? 1 : 0;

    // put data into javascript object
    const data = {
        address: input_address.value,
        listed_price: input_lprice.value,
        seller_id: input_seller_id.value,
        on_market: on_market_value
    }


    // set up ajax req
    const xhttp = new XMLHttpRequest
    xhttp.open('POST', '/add-property', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // add new data to table
            addRowtoTable(xhttp.response)
            // clear input fields for another transaction
            input_address.value = ''
            input_lprice.value = ''
            input_seller_id.value = ''
            input_on_market.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    // send request and wait for response
    xhttp.send(JSON.stringify(data))
})

const addRowtoTable = (data) => {
    const current_table = document.getElementById('properties-tbody')

    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length - 1]

    const row = document.createElement('TR')
    
    const id_cell = document.createElement('TD')
    id_cell.innerText = new_row.property_id

    const address_cell = document.createElement('TD')
    address_cell.innerText = new_row.address

    const lprice_cell = document.createElement('TD')
    lprice_cell.innerText = new_row.listed_price

    const buyer_id_cell = document.createElement('TD')
    const buyers_agent_id_cell = document.createElement('TD')
    
    const seller_id_cell = document.createElement('TD')
    seller_id_cell.innerText = new_row.seller_id

    const sellers_agent_id_cell = document.createElement('TD')

    const on_market_cell = document.createElement('TD')
    on_market_cell.innerText = new_row.on_market

    const sell_price_cell = document.createElement('TD')
    const sell_date_cell = document.createElement('TD')

    const delete_cell = document.createElement('TD')
    const delete_button = document.createElement('button')
    delete_button.innerHTML = 'DELETE'
    delete_button.onclick = function() {
        // deleteProperty(new_row.property_id)
        console.log('deleting property')
    }

    delete_cell.appendChild(delete_button)


    row.appendChild(id_cell)
    row.appendChild(address_cell)
    row.appendChild(lprice_cell)
    row.appendChild(buyer_id_cell)
    row.appendChild(buyers_agent_id_cell)
    row.appendChild(seller_id_cell)
    row.appendChild(sellers_agent_id_cell)
    row.appendChild(on_market_cell)
    row.appendChild(sell_price_cell)
    row.appendChild(sell_date_cell)
    row.appendChild(delete_cell)

    row.setAttribute('data-value', new_row.property_id)

    current_table.appendChild(row)

    const select_menu = document.getElementById('select-address')
    const option = document.createElement('option')
    option.text = new_row.address
    option.value = new_row.property_id
    select_menu.add(option)
}
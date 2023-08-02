// get objects from form
const addPropertyForm = document.getElementById('add-property-form')

// modify the objects
addPropertyForm.addEventListener('submit', function (e) {
    e.preventDefault()

    // get form fields
    const input_address = document.getElementById('input-address')
    const input_lprice = document.getElementById('input-lprice')
    const input_buyer_id = document.getElementById('input-buyerid')
    const input_buyers_agentid = document.getElementById('input-buyers-agentid')
    const input_seller_id = document.getElementById('input-sellerid')
    const input_sellers_agent_id = document.getElementById('input-sellers-agentid')
    const input_on_market = document.getElementById('input-market')

    // get data from form fields
    const address_value = input_address.value
    const lprice_value = input_lprice.value
    const buyer_id_value = input_buyer_id.value
    const buyers_agent_id_value = input_buyers_agentid.value
    const seller_id_value = input_seller_id.value
    const sellers_agent_id_value = input_sellers_agent_id.value
    const on_market_value = input_on_market.value


    // put data into javascript object
    const data = {
        address: address_value,
        listed_price: lprice_value,
        buyer_id: buyer_id_value,
        buyers_agent_id: buyers_agent_id_value,
        seller_id: seller_id_value,
        sellers_agent_id: sellers_agent_id_value,
        on_market: on_market_value
    }

    // set up ajax req
    var xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/add-property', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // add new data to table
            addRowtoTable(xhttp.response)
            console.log(xhttp.response)
            // clear input fields for another transaction
            input_address.value = ''
            input_lprice.value = ''
            input_buyer_id.value = ''
            input_buyers_agentid.value = ''
            input_seller_id.value = ''
            input_sellers_agent_id.value = ''
            input_on_market.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    // send request and wait for response
    xhttp.send(JSON.stringify(data))
})

const addRowtoTable = (data) => {
    const current_table = document.getElementById('properties-table')

    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length - 1]

    // create a row and 4 cells
    const row = document.createElement('TR')
    const id_cell = document.createElement('TD')
    const address_cell = document.createElement('TD')
    const lprice_cell = document.createElement('TD')
    const buyer_id_cell = document.createElement('TD')
    const buyers_agent_id_cell = document.createElement('TD')
    const seller_id_cell = document.createElement('TD')
    const sellers_agent_id_cell = document.createElement('TD')
    const on_market_cell = document.createElement('TD')

    // fill cells
    id_cell.innerText = new_row.property_id
    address_cell.innerText = new_row.address
    lprice_cell.innerText = new_row.listed_price
    buyer_id_cell.innerText = new_row.buyer_id
    buyers_agent_id_cell.innerText = new_row.buyers_agent_id
    seller_id_cell.innerText = new_row.seller_id
    sellers_agent_id_cell.innerText = new_row.sellers_agent_id
    on_market_cell.innerText = new_row.on_market

    row.appendChild(id_cell)
    row.appendChild(address_cell)
    row.appendChild(lprice_cell)
    row.appendChild(buyer_id_cell)
    row.appendChild(buyers_agent_id_cell)
    row.appendChild(seller_id_cell)
    row.appendChild(sellers_agent_id_cell)
    row.appendChild(on_market_cell)
}
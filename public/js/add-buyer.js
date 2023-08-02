const addBuyerForm = document.getElementById('add-buyer-form')

addBuyerForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const input_email = document.getElementById('input-email')
    const input_phone = document.getElementById('input-phone')
    const input_name = document.getElementById('input-name')
    const input_agent = document.getElementById('input-agentid')

    const email_value = input_email.value
    const phone_value = input_phone.value
    const name_value =  input_name.value
    const agent_value = input_agent.value

    const data = {
        email: email_value,
        phone: phone_value,
        name: name_value,
        agent_id: agent_value
    }

    const xhttp = new XMLHttpRequest
    xhttp.open('POST', '/add-buyer', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowtoTable(xhttp.response)

            input_email.value = ''
            input_phone.value = ''
            input_name.value = ''
            input_agent.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    xhttp.send(JSON.stringify(data))
})

addRowtoTable = (data) => {
    const current_table = document.getElementById('buyers-table')

    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length - 1]

    const row = document.createElement('TR')
    const buyer_id_cell = document.createElement('TD')
    const email_cell = document.createElement('TD')
    const phone_cell = document.createElement('TD')
    const name_cell = document.createElement('TD')
    const agent_cell = document.createElement('TD')

    buyer_id_cell = new_row.buyer_id
    email_cell = new_row.email
    phone_cell = new_row.phone
    name_cell = new_row.name
    agent_cell = new_row.agent_id

    const delete_cell = document.createElement('button')
    delete_cell.innerHTML = 'DELETE'
    delete_cell.onclick = function() {
        deleteBuyer(new_row.buyer_id)
    }

    row.appendChild(buyer_id_cell)
    row.appendChild(email_cell)
    row.appendChild(phone_cell)
    row.appendChild(name_cell)
    row.appendChild(agent_cell)
    row.appendChild(delete_cell)

    row.setAttribute('data-value', new_row.buyer_id)

    current_table.appendChild(row)

    const select_menu = document.getElementById('select-buyer')
    const option = document.createElement('option')
    option.text = new_row.name
    option.value = new_row.buyer_id
    select_menu.add(option)
}
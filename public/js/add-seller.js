addRowtoTable = (data) => {
    console.log(data)
    const current_table = document.getElementById('sellers-table')

    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length - 1]

    const row = document.createElement('TR')
    const seller_id_cell = document.createElement('TD')
    const email_cell = document.createElement('TD')
    const phone_cell = document.createElement('TD')
    const name_cell = document.createElement('TD')
    const agent_cell = document.createElement('TD')

    seller_id_cell = new_row.seller_id
    email_cell = new_row.email
    phone_cell = new_row.phone
    name_cell = new_row.name
    agent_cell = new_row.agent_id

    const delete_cell = document.createElement('button')
    delete_cell.innerHTML = 'DELETE'
    delete_cell.onclick = function() {
        deleteSeller(new_row.seller_id)
    }

    row.appendChild(seller_id_cell)
    row.appendChild(email_cell)
    row.appendChild(phone_cell)
    row.appendChild(name_cell)
    row.appendChild(agent_cell)
    row.appendChild(delete_cell)

    row.setAttribute('data-value', new_row.seller_id)

    current_table.appendChild(row)

    const select_menu = document.getElementById('select-seller')
    const option = document.createElement('option')
    option.text = new_row.name
    option.value = new_row.seller_id
    select_menu.add(option)

}

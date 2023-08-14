// get objects from form
const addAgentForm = document.getElementById('add-agent-form')

addAgentForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const input_email = document.getElementById('input-email')
    const input_phone = document.getElementById('input-phone')
    const input_name = document.getElementById('input-name')

    const email_value = input_email.value
    const phone_value = input_phone.value
    const name_value =  input_name.value

    const data = {
        email: email_value,
        phone: phone_value,
        name: name_value
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/add-agent', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowtoTable(xhttp.response)
            // console.log(xhttp.response)

            input_email.value = ''
            input_phone.value = ''
            input_name.value = ''
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }
    
    xhttp.send(JSON.stringify(data))
})

addRowtoTable = (data) => {
    const current_table = document.getElementById('agents-table')

    const new_row_index = current_table.rows.length

    const parsed_data = JSON.parse(data)
    const new_row = parsed_data[parsed_data.length - 1]

    const row = document.createElement('TR')
    const agent_id_cell = document.createElement('TD')
    const agent_email_cell = document.createElement('TD')
    const agent_phone_cell = document.createElement('TD')
    const agent_name_cell = document.createElement('TD')

    agent_id_cell.innerHTML = new_row.agent_id
    agent_email_cell.innerHTML = new_row.email
    agent_phone_cell.innerHTML = new_row.phone
    agent_name_cell.innerHTML = new_row.name

    const delete_cell = document.createElement('button')
    delete_cell.innerHTML = 'DELETE'
    delete_cell.onclick = function() {
        deleteAgent(new_row.agent_id)
    }

    row.appendChild(agent_id_cell)
    row.appendChild(agent_email_cell)
    row.appendChild(agent_phone_cell)
    row.appendChild(agent_name_cell)
    row.appendChild(delete_cell)

    row.setAttribute('data-value', new_row.agent_id)

    current_table.appendChild(row)
}
const updateAgentForm = document.getElementById('update-agent-form')

updateAgentForm.addEventListener('submit', function (e) {
    e.preventDefault()
    
    const input_name = document.getElementById('select-agent')
    const input_email = document.getElementById('input-email-update')
    const input_phone = document.getElementById('input-phone-update')

    const input_name_value = input_name.value
    const input_email_value = input_email.value
    const input_phone_value = input_phone.value

    const data = {
        name: input_name_value,
        email: input_email_value,
        phone: input_phone_value
    }
    const xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/put-agent', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, input_name_value)
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log('there was an error with the input')
        }
    }

    xhttp.send(JSON.stringify(data))
})

function updateRow(data, agent_id) {
    const parsed_data = JSON.parse(data)

    const table = document.getElementById('agents-table')

    for (let i = 0, row; row=table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value') == agent_id) {
            const update_row_index = table.getElementsByTagName('tr')[i]

            const td = update_row_index.getElementsByTagName('td')[3]
            console.log(td)
            // td.innerHTML = parsed_data[0].name
        }
    }
}
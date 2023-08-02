function deleteAgent(agent_id) {
    
    const data = {
        agent_id: agent_id
    }

    const xhttp = new XMLHttpRequest()
    xhttp.open('DELETE', '/delete-agent', true)
    xhttp.setRequestHeader('Content-type', 'application/json')

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            
            deleteRow(agent_id)
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('there was an error with the input')
        }
    }

    xhttp.send(JSON.stringify(data))
}


function deleteRow(agent_id) {
    const table = document.getElementById('agents-table')
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute('data-value')) {
            table.deleteRow(i)
            break
        }
    }
}
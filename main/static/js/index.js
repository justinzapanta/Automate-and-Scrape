function getCSRFToken() {
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    return csrfMetaTag ? csrfMetaTag.getAttribute('content') : null;
}

//Modal
let project_id
function open_modal(id, project = false){    
    url_input.value = ''
    const modal = document.querySelector(`#${id}`)
    modal.classList.remove('hidden')

    if (id === 'delete_modal' && project){
        project_id = project
    }
}

function close_modal(id){
    const modal = document.querySelector(`#${id}`)
    modal.classList.add('hidden')
}

//Create Modal
const create_modal = document.querySelector('#create_modal')
const url_input = document.querySelector('#url_input')
const type_input = document.querySelector('#type_input')
const card_container = document.querySelector('#card_container')

async function create_project(event, this_){
    event.preventDefault()
    close_modal('create_modal')
    if (url_input.value != ''){
        const csrf_token = getCSRFToken()

        const response = await fetch('/api/project', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken' : csrf_token
            },
            body : JSON.stringify({
                project_url : url_input.value,
                project_type : type_input.value,
                project_owner_email : this_.getAttribute('email')
            })
        })        

        let response_json = await response.json()
        result = response_json.result

        if (result){
            const new_card = document.createElement('div')
            new_card.classList.add('border', 'w-full', 'h-44', 'rounded-2xl', 'shadow-lg', 'flex', 'flex-col', 'font-roboto')
            new_card.id = result.project_id

            new_card.innerHTML = `
                <div class="md:px-10 px-4 flex mt-4">
                    <!--Type-->
                    <div class="flex-1">
                        <h1 class="text-emerald-500">${type_input.value}</h1>
                    </div>
    
                    <div onclick="open_modal('delete_modal', '${result.project_id}')">
                        <i class="fa-solid fa-trash text-red-500 hover:cursor-pointer"></i>
                    </div>
                </div>
    
                <!--URL-->
                <div class="font-roboto mt-4 px-4">
                    <h1 class="text-center text-xl font-bold truncate">${url_input.value}</h1>
                </div>
    
                <div class="w-full flex justify-center mt-4">
                    <a href="/automate/${result.project_id}">
                        <button class="px-10 py-2 bg-slate-950 hover:bg-slate-900 text-white font-roboto font-bold rounded-full ">Open</button>
                    </a>                
                </div>
            `
    
            card_container.appendChild(new_card)
        }
    }
}


//Delete Modal
async function delete_project(){
    const card = document.getElementById(project_id)
    const csrf_token = getCSRFToken()

    close_modal('delete_modal')
    card.remove()

    const response = await fetch(`/api/project/${project_id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrf_token
        },
    })
}
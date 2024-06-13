import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Case from '../components/case';
import Table from '../components/Table';

export default function TrashStuff() {
    const [stuffsTrash, setStuffTrash] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/stuff/trash', {
            headers: {
                'Authoriaztion' : 'Bearer ' + localStorage.getItem('access_token'), 
            }
        })
            .then(res => {
                setStuffTrash(res.data.data);
        })
            .catch(err => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate('/login?message' + encodeURIComponent('Anda Belum Login!!'));
                }
        })
    }, [])

    const headers = [
        "No",
        "Name", 
        "Category"
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanent/{id}",
    }
    
    const inputData = {}

    const title = 'Stuff'

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "name": null,
        "category": null,
    }
    
    return (
        <>
            <Case>
                <Table headers={headers} data={stuffsTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
            </Case>
        </>
    )
}
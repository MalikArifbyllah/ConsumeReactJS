import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Case from '../components/case';
import Table from '../components/Table';

export default function TrashLending() {
    const [LendingsTrash, setLendingTrash] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/lending/trash', {
            headers: {
                'Authoriaztion': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setLendingTrash(res.data.data);
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
        "User_id",
        "Stuff_id"
    ]

    const endpointModal = {
        "restore": "http://localhost:8000/lending/restore/{id}",
        "delete_permanent": "http://localhost:8000/lending/permanent/{id}",
    }

    const inputData = {}

    const title = 'Lending'

    const columnIdentitasDelete = 'name'

    const buttons = [
        "restore",
        "permanentDeletes",
    ]

    const tdColumn = {
        "name": null,
        "user": "username",
        "stuff": "name",
    }

    return (
        <>
            <Case>
                <Table headers={headers} data={LendingsTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn}></Table>
            </Case>
        </>
    )
}
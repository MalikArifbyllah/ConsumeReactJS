import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table';
import Case from '../components/case';

export default function Lending() {

    const [lending, setLending] = useState([]);
    //const [stuffs, setStuffs] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        getLending();
    }, []);

    function getLending() {
        axios.get("http:///localhost:8000/lending", {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("access_token"),
            },
        })
            .then((res) => {
                setLending(res.data.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 401) {
                    navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
                }
            });
    }

    const headers = [
        "no",
        "name",
        "stuff-id",
        "user-id",
        "date",
        "total_stuff",
        "note",
    ]

    // function getStuffs() {
    //   axios
    //     .get("http:///localhost:8000/stuff", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((res) => {
    //       setStuffs(res.data.data);
    //       const stuffNames = stuffs.map((stuff) => stuff.name);
    //       // Memasukkan nama ke dalam tdColumn
    //       tdColumn.name = stuffNames;
    //       console.log("tdColumn dengan nama:", tdColumn);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       if (err.response.status == 401) {
    //         navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
    //       }
    //     });
    // }

    const endpointModal = {
        store: "http://localhost:8000/lending/store",
        delete: "http://localhost:8000/lending/delete/{id}",    
    };

    const inputData = {
        name: {
            tag: "input",
            type: "text",
            option: "null",
        },

        stuff_id: {
            tag: "input",
            type: "number",
            option: "null",
        },

        user_id: {
            tag: "input",
            type: "number",
            option: "null",
        },

        date_time: {
            tag: "input",
            type: "datetime-local",
            option: "null",
        },

        total_stuff: {
            tag: "input",
            type: "number",
            option: "null",
        },

        notes: {
            tag: "input",
            type: "text",
            option: "null",
        },
    };

    const title = "Lending";

    const columnIdentitasDelete = "name";


    const buttons = [
        "create",
        "delete",
    ]

    const tdColumn = {
        "name": null,
        "stuff": "name",
        "user": "username",
        "date_time": null,
        "total_stuff": null,
        "notes": null,
    };


    return (

        <Case>
            <Table headers={headers} data={lending} endpoint={endpointModal} titleModal={title} opsiButton={buttons} columnForTd={tdColumn} identitasColumn={columnIdentitasDelete} inputData={inputData} >
            </Table>
        </Case>

    )
}
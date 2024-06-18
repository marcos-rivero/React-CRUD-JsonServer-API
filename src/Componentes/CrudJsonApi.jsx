import React, {useEffect, useState} from 'react'
import { helpHttp } from './Helpers/HelpHttp';
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from './Loader';
import Message from './Message';

const CrudJsonAPI = () => {
    const [db, setDb] = useState([]);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    let api = helpHttp();
    let url = "http://localhost:5000/users";

    useEffect(()=>{
        setLoading(true)
        api.get(url).then(res => {
            if(!res.err){
                setDb(res)
                setError(null)
            }else{
                setDb([])
                setError(res)
                console.log(res);
            }
            setLoading(false)
        });
    },[])

    
    const createData = (data) => {
      data.id=Date.now();
      let options = {body:data, headers:{"content-type":"application/json"}}
      api.post(url, options).then((res)=>{
        if(!res.err){
            setDb([...db, res])
        }else{
            setError(res);
        }
      })
      
    }
    const updateData = (data) => {
      let endpoint = `${url}/${data.id}`;
      console.log(endpoint);
      let options = {body:data, headers:{"content-type":"application/json"}}
      api.put(endpoint, options).then((res)=>{
        console.log(res);
        if(!res.err){
            let newData = db.map((el)=> el.id === data.id ? data : el)
            setDb(newData)
        }else{
            setError(res);
        }
      })
    }
    const deleteData = (id) => {
      let isDelete = window.confirm(`Estas seguro de eliminar '${id}'?`)
      if(isDelete){      
        let endpoint = `${url}/${id}`;
        let options = {headers:{"content-type":"application/json"}}
        api.del(endpoint, options).then((res)=>{
            if(!res.err){
                let newData = db.filter(el => el.id !== id)  
                setDb(newData)
            }else{
                setError(res);
            }
        })  
      }
    }

    return(
        <div>
            <h2>Crud Json Api</h2>
            <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
            {db && <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>}
            {loading && <Loader />}
            {error && <Message msg={`Error ${error.status}:${error.statusText}`} bgColor="#dc3545"/>}
        </div>
    )
}

export default CrudJsonAPI;
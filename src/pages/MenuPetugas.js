import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/Loading";
import { Container } from "react-bootstrap";


    const MenuPetugas = () => {

        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(false);
        const [postLoading, setPostLoading] = useState(false)


        const getDataFromAirtable = async () => {
            try {
            const config = {
                headers: {
                Authorization: "Bearer key3b2Iv6kflbqQug",
                },
            };

            setLoading(true);
            const response = await axios.get(
                `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbanggota?maxRecords=100&view=Grid%20view`,
                config
            );

            const newData = response.data.records.map((item) => ({
                id: item.id,
                NIP: item.fields.NIP,
                Nama: item.fields.Nama,
                Jabatan: item.fields.Jabatan,
                Dinas: item.fields.Dinas,
            }));

            setData(newData);
                } catch (error) {
                console.log(error);
                } finally {
                setLoading(false);
                }

        };

        useEffect(() => {
            getDataFromAirtable();
        }, []);

        const addData = async (newData) => {
            try {
            const sendData = JSON.stringify({
                records: [
                { fields: newData, }, 
                ],
            });

            const config = {
                headers: {
                Authorization: "Bearer key3b2Iv6kflbqQug",
                "Content-Type": "application/json",
                },
            };

            setPostLoading(true);

            const response = await axios.post(
                `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbanggota`,
                sendData,
                config
            );

            const responseData = response.data.records[0];
            const fixData = {
                id: responseData.id,
                NIP: responseData.NIP,
                Nama: responseData.Nama,
                Jabatan: responseData.Jabatan,
                Dinas: responseData.Dinas,
            };

            setData([...data, fixData]);
            } catch (error) {
            console.log(error);
            } finally {
            setPostLoading(false);
            }
            window.location.reload()
            
        };


        const removeData = async (id) => {
            try {
            const axiosParams = {
                method: "delete",
                url: `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbanggota/${id}`,
                headers: {
                Authorization: "Bearer key3b2Iv6kflbqQug",
                "Content-Type": "application/json",
                },
            };

            setLoading(true);

            await axios(axiosParams);

            const newData = data.filter((item) => item.id !== id);

            setData(newData);
            alert("berhasil deleted data");
            } catch (error) {
            console.log(error);
            } finally {
            setLoading(false);
            }
        };



        const [form, setForm] = useState({
            NIP: "",
            Nama: "",
        });

        const {NIP, Nama, Jabatan, Dinas} = form;

        const onChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };

        const clearForm = () => {
            setForm({
            NIP: "",
            Nama: "",
            Jabatan: "",
            Dinas: "",
            });
        };

        const onSubmit = (e) => {
            e.preventDefault();

            addData({
                NIP,
                Nama,
                Jabatan,
                Dinas,
            });

            clearForm();
        };




  return (
    <div className="container-md d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ minHeight: "100vh", }}>
    <div className="row">


        <div className="container-md bg-transparent col-md-3 py-5">
        <form className="row-cols-md-auto g-3 align-items-center text-white" onSubmit={onSubmit}>

        <div className="form-group mb-1 col-12">
            <label>NIP</label>
            <input name="NIP" className="form-control" value={NIP} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Nama</label>
            <input name="Nama" className="form-control" value={Nama} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Jabatan</label>
            <select name="Jabatan" className="form-control" value={Jabatan} onChange={onChange}>
                <option value="">Pilih</option>
                <option value="Kepala Sudin">Kepala Sudin</option>
                <option value="Kepala Sektor">Kepala Sektor</option>
                <option value="Komandan Pleton">Komandan Pleton</option> 
                <option value="Komandan Regu">Komandan Regu</option>  
                <option value="Anggota">Anggota</option> 
            </select>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Dinas</label>
            <select name="Dinas" className="form-control" value={Dinas} onChange={onChange}>
                <option value="">Pilih</option>
                <option value="Sektor 1">Sektor 1</option>
                <option value="Sektor 2">Sektor 2</option>
                <option value="Sektor 3">Sektor 3</option> 
                <option value="Sektor 4">Sektor 4</option>  
                <option value="Sektor 5">Sektor 5</option> 
                <option value="Sektor 6">Sektor 6</option> 
                <option value="Sektor 7">Sektor 7</option> 
                <option value="Sektor 8">Sektor 8</option> 
            </select>
        </div>


        <div className="form-group mb-1 mt-3">
            <button className="btn btn-primary w-100" >Simpan</button>
        </div>


        </form>
        </div>
        

        <div className="table-responsive container-md bg-transparent col-md-9 py-1 px-2"> 
        
        <table className="table table-bordered align-middle mb-0 bg-white">
  <thead className="bg-primary text-light">
    <tr>
      <th>Nama</th>
      <th>NIP</th>
      <th>Jabatan</th>
      <th>Dinas</th>
      <th>Hapus</th>
    </tr>
  </thead>
  <tbody>{ data.map((post) => (
    <tr key={ post.id }>
    	<td>
          <div className="ms-3">
            <p className="text-start fw-normal mb-1">{post.Nama}</p>
          </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{post.NIP}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{post.Jabatan}</p>
      </td>
      <td>
      	<p className="fw-normal mb-1">{post.Dinas}</p>
      </td>
      <td>
        <FaTrash className="text-danger" size={16} style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => removeData(post.id)} />
      </td>
    </tr>
    ))}
  </tbody>
</table>
		
		
	</div>
	    


    </div>
    </div>
  );
};

export default MenuPetugas;

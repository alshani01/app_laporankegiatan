import axios from "axios";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/Loading";
import UploadWidget from '../utils/UploadWidget';


const BanOp = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [dataAnggota, setDataAnggota] = useState([]);
    const [loadingAnggota, setLoadingAnggota] = useState(false);

    // img
    const [imgPreview, setImgPreview] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

        const getDataAnggota = async () => {
        try {
        const config = {
            headers: {
            Authorization: "Bearer key3b2Iv6kflbqQug",
            },
        };

        setLoadingAnggota(true);
        const response = await axios.get(
            `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbanggota?maxRecords=100&view=Grid%20view`,
            config
        );

        setDataAnggota(response.data.records)
        } catch(error) {
        console.log(error)
        }
        };

        useEffect(()=> {
        getDataAnggota()
        },[])

        console.log(dataAnggota);



        const getDataFromAirtable = async () => {
            try {
            const config = {
                headers: {
                Authorization: "Bearer key3b2Iv6kflbqQug",
                },
            };

            setLoading(true);
            const response = await axios.get(
                `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbbanop?maxRecords=100&view=Grid%20view`,
                config
            );

            const newData = response.data.records.map((item) => ({
                id: item.id,
                Grup_Jaga: item.fields.Grup_Jaga,
                Hari_dan_Tanggal: item.fields.Hari_dan_Tanggal,
                Sumber_Informasi: item.fields.Sumber_Informasi,
                Nama_Pemohon: item.fields.Nama_Pemohon,
                Alamat: item.fields.Alamat,
                Objek: item.fields.Objek,
                Nama_Perwira_Piket: item.fields.Nama_Perwira_Piket,
                Nama_Penanggung_Jawab: item.fields.Nama_Penanggung_Jawab,
                Pengerahan_Unit: item.fields.Pengerahan_Unit,
                Pengerahan_Personil: item.fields.Pengerahan_Personil,
                Jam_Mulai: item.fields.Jam_Mulai,
                Jam_Selesai: item.fields.Jam_Selesai,
                Bantuan_Instansi_Lainnya: item.fields.Bantuan_Instansi_Lainnya,
                Keterangan_Lainnya: item.fields.Keterangan_Lainnya,
                Upload_Dokumentasi: item.fields.Upload_Dokumentasi,
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
                `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbbanop`,
                sendData,
                config
            );

            const responseData = response.data.records[0];
            const fixData = {
                id: responseData.id,
                Grup_Jaga: responseData.fields.Grup_Jaga,
                Hari_dan_Tanggal: responseData.fields.Hari_dan_Tanggal,
                Sumber_Informasi: responseData.fields.Sumber_Informasi,
                Nama_Pemohon: responseData.fields.Nama_Pemohon,
                Alamat: responseData.fields.Alamat,
                Objek: responseData.fields.Objek,
                Nama_Perwira_Piket: responseData.fields.Nama_Perwira_Piket,
                Nama_Penanggung_Jawab: responseData.fields.Nama_Penanggung_Jawab,
                Pengerahan_Unit: responseData.fields.Pengerahan_Unit,
                Pengerahan_Personil: responseData.fields.Pengerahan_Personil,
                Jam_Mulai: responseData.fields.Jam_Mulai,
                Jam_Selesai: responseData.fields.Jam_Selesai,
                Bantuan_Instansi_Lainnya: responseData.fields.Bantuan_Instansi_Lainnya,
                Keterangan_Lainnya: responseData.fields.Keterangan_Lainnya,
                Upload_Dokumentasi: responseData.fields.Upload_Dokumentasi,
            };

            setData([...data, fixData]);
            } catch (error) {
            console.log(error);
            } finally {
            setPostLoading(false);
            clearForm();
            }
            
        };


        const removeData = async (id) => {
            try {
            const axiosParams = {
                method: "delete",
                url: `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbbanop/${id}`,
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
            Hari_dan_Tanggal: "",
            Nama_Pemohon: "",
            Alamat: "",
            Objek: "",
            Identitas_Korban: "",
            Nama_Perwira_Piket: "",
            Nama_Penanggung_Jawab: "",
            Pengerahan_Unit: "",
            Pengerahan_Personil: "",
            Jam_Mulai: "",
            Jam_Selesai: "",
            Bantuan_Instansi_Lainnya: "",
            Keterangan_Lainnya: "",
        });

        const {Grup_Jaga, Hari_dan_Tanggal, Sumber_Informasi, Nama_Pemohon, Alamat, Objek, Nama_Perwira_Piket, Nama_Penanggung_Jawab, Pengerahan_Unit, Pengerahan_Personil, Jam_Mulai, Jam_Selesai, Bantuan_Instansi_Lainnya, Keterangan_Lainnya, Upload_Dokumentasi} = form;

        const onChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };

        const clearForm = () => {
            setForm({
            Grup_Jaga: "",
            Hari_dan_Tanggal: "",
            Sumber_Informasi: "",
            Nama_Pemohon: "",
            Alamat: "",
            Objek: "",
            Nama_Perwira_Piket: "",
            Nama_Penanggung_Jawab: "",
            Pengerahan_Unit: "",
            Pengerahan_Personil: "",
            Jam_Mulai: "",
            Jam_Selesai: "",
            Bantuan_Instansi_Lainnya: "",
            Keterangan_Lainnya: "",
            });

            setImageUrl('');
            setImgPreview([]);
        };

        const onSubmit = (e) => {
            e.preventDefault();

        if (imageUrl !== '') {
            addData({
                Grup_Jaga,
                Hari_dan_Tanggal,
                Sumber_Informasi,
                Nama_Pemohon,
                Alamat,
                Objek,
                Nama_Perwira_Piket,
                Nama_Penanggung_Jawab,
                Pengerahan_Unit,
                Pengerahan_Personil,
                Jam_Mulai,
                Jam_Selesai,
                Bantuan_Instansi_Lainnya,
                Keterangan_Lainnya,
                Upload_Dokumentasi: imageUrl,
            });
            }
        };




  return (
    <div className="container">
    <div className="row">


        <div className="container-md bg-primary col-md-5 py-5" >
        <form className="row-cols-md-auto g-3 align-items-center text-white" onSubmit={onSubmit}>

        <div className="form-group mb-1 col-12">
            <label>Grup Jaga</label>
            <select name="Grup_Jaga" className="form-control" value={Grup_Jaga} onChange={onChange}>
                <option value="">Pilih</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>  
            </select>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Hari dan Tanggal</label>
            <input type="date" name="Hari_dan_Tanggal" className="form-control" value={Hari_dan_Tanggal} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12" >
            <label>Sumber Informasi</label>
            <select name="Sumber_Informasi" className="form-control" value={Sumber_Informasi} onChange={onChange} >
                <option value="">Pilih</option>
                <option value="112">112</option>
                <option value="Masyarakat">Masyarakat</option>
                <option value="Petugas Damkar">Petugas Damkar</option>  
                <option value="Inst. Lain">Inst. Lain</option> 
            </select>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Nama Pemohon</label>
            <input name="Nama_Pemohon" className="form-control" value={Nama_Pemohon} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Alamat</label>
            <textarea name="Alamat" className="form-control" value={Alamat} onChange={onChange}></textarea>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Objek</label>
            <input name="Objek" className="form-control" value={Objek} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Nama Perwira Piket</label>
            <select name="Nama_Perwira_Piket" className="form-control" value={Nama_Perwira_Piket} onChange={onChange}>
		      <option value="">Pilih</option>
		      {dataAnggota?.map((item, index) => {
   			return (
       		<option key={index} value={item.fields.Nama} >{item.fields.Nama}</option>
   			)
			})}
		  </select>
        </div>
            
        <div className="form-group mb-1 col-12">
            <label>Nama Penanggung Jawab</label>
            <select name="Nama_Penanggung_Jawab" className="form-control" value={Nama_Penanggung_Jawab} onChange={onChange}>
		      <option value="">Pilih</option>
		      {dataAnggota?.map((item, index) => {
   			return (
       		<option key={index} value={item.fields.Nama} >{item.fields.Nama}</option>
   			)
			})}
		  </select>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Pengerahan Unit</label>
            <input name="Pengerahan_Unit" className="form-control" value={Pengerahan_Unit} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Pengerahan Personil</label>
            <input name="Pengerahan_Personil" className="form-control" value={Pengerahan_Personil} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Jam Mulai</label>
            <input name="Jam_Mulai" type="time" className="form-control" value={Jam_Mulai} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Jam Selesai</label>
            <input name="Jam_Selesai" type="time" className="form-control" value={Jam_Selesai} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Bantuan Instansi Lainnya</label>
            <input name="Bantuan_Instansi_Lainnya" className="form-control" value={Bantuan_Instansi_Lainnya} onChange={onChange}></input>
        </div>

        <div className="form-group mb-1 col-12">
            <label>Keterangan Lainnya</label>
            <textarea name="Keterangan_Lainnya" className="form-control" value={Keterangan_Lainnya} onChange={onChange}></textarea>
        </div>
        
        <div className="form-group mb-1">
              <label>Upload Dokumentasi</label>
              <UploadWidget
                onImageUrl={setImageUrl}
                onImgPreview={setImgPreview}
              />
        </div>

        {imgPreview.length > 0 &&
              imgPreview?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  height={75}
                  width={75}
                  style={{ borderRadius: 5, marginRight: 5 }}
                  alt="icon upload"
                />
              ))}

            <div className="form-group mb-1 mt-3 col-12">
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Simpan {postLoading && <Loading />}
              </button>
            </div>


        </form>
        </div>

        <div className="container-md bg-danger col-md-5 py-2 px-2">
	    	<ol className="list-group list-group-numbered"> { data.map((post) => (
		  <li className="list-group-item d-flex justify-content-between align-items-start" key={ post.id }>
		    <div className="ms-2 me-auto">
		      <div className="fw-bold text-start">{post.Hari_dan_Tanggal}</div>
		      <div className="text-start">{post.Alamat}</div>
		    </div>
		    <FaTrash className="text-danger" size={16} style={{marginLeft: "10px", cursor: "pointer"}} onClick={() => removeData(post.id)} />
		  </li> ))}
		  
		</ol>
	    </div>


    </div>
    </div>
  );
};

export default BanOp;

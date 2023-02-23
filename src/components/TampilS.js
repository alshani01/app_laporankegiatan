import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import ListS from '../components/ListS';

const TampilS = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataFromAirtable = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer key3b2Iv6kflbqQug',
        },
      };

      setLoading(true);
      const response = await axios.get(
        `https://api.airtable.com/v0/appXAxP37CyOjn5HX/tbsosialisasi?maxRecords=100&view=Grid%20view`,
        config
      );

      const newData = response.data.records.map((item) => ({
        // id: item.id,
        Grup_Jaga: item.fields.Grup_Jaga,
        Hari_dan_Tanggal: item.fields.Hari_dan_Tanggal,
        Kecamatan: item.fields.Kecamatan,
        Kelurahan: item.fields.Kelurahan,
        Alamat: item.fields.Alamat,
        Objek: item.fields.Objek,
        Nama_Perwira_Piket: item.fields.Nama_Perwira_Piket,
        Nama_Penanggung_Jawab: item.fields.Nama_Penanggung_Jawab,
        Pengerahan_Unit: item.fields.Pengerahan_Unit,
        Pengerahan_Personil: item.fields.Pengerahan_Personil,
        Jam_Mulai: item.fields.Jam_Mulai,
        Jam_Selesai: item.fields.Jam_Selesai,
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

  return (
    <div className="container">
      <div className="container-xl bg-danger col-xl-8 py-2 px-2">
        <ol className="list-group list-group-numbered">
          {data.length > 0 &&
            data.map((post, index) => (
              <ListS post={post} key={index} />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default TampilS;

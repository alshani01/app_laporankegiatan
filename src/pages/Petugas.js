import { useEffect, useState } from "react";
import styles from "../styles2.css"

import Kebakaran from "../components/Kebakaran";
import Penyelamatan from "../components/Penyelamatan";
import BanOp from "../components/BanOp";
import Sosialisasi from "../components/Sosialisasi";

export default function Petugas() {
  const [kegiatan, setKegiatan] = useState("selectKegiatan");

  const [kebakaranContentVisible, setKebakaranContentVisible] = useState(false);
  const [penyelamatanContentVisible, setPenyelamatanContentVisible] = useState(false);
  const [banopContentVisible, setBanOpContentVisible] = useState(false);
  const [sosialisasiContentVisible, setSosialisasiContentVisible] = useState(false);

  useEffect(() => {
      kegiatan === "kebakaran" ? setKebakaranContentVisible(true) : setKebakaranContentVisible(false);
      kegiatan === "penyelamatan" ? setPenyelamatanContentVisible(true) : setPenyelamatanContentVisible(false);
      kegiatan === "banop" ? setBanOpContentVisible(true) : setBanOpContentVisible(false);
      kegiatan === "sosialisasi" ? setSosialisasiContentVisible(true) : setSosialisasiContentVisible(false);
  }, [kegiatan]);

  const handleOnChange = (e) => {
    setKegiatan(e.target.value);
  };

  const makeFirstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderResult = () => {
    let result;
    kegiatan === "selectKegiatan"
      ? (result = "Kegiatan")
      : (result = makeFirstLetterCapital(kegiatan));
    return result;
  };

  return (
    <div className="d-flex justify-content-center bg-transparent" style={{ minHeight: "100vh", }}>
      
      <div className="container text-dark">
      <div className="row mb-4">

      <div className="d-flex justify-content-center align-items-center">
          <img src="/LogoDamkar.png" alt="just-gambar" style={{objectFit: "scale-down", width: "10rem", }} />
      </div>

      <h1 className="text-white text-center mb-3"> Laporan {renderResult()}</h1>

      <div className="container mt-3 mb-4">
        <div className="mt-4 mb-4">
          <select className="form-select form-select-lg mb-3" value={kegiatan} onChange={handleOnChange}>
            <option value="selectKegiatan">Pilih Kegiatan</option>
            <option value="kebakaran">Kebakaran</option>
            <option value="penyelamatan">Penyelamatan</option>
            <option value="banop">Bantuan Operasi</option>
            <option value="sosialisasi">Sosialisasi</option>
          </select>
        </div>
        {kebakaranContentVisible && <Kebakaran />}
        {penyelamatanContentVisible && <Penyelamatan />}
        {banopContentVisible && <BanOp />}
        {sosialisasiContentVisible && <Sosialisasi />}
      </div>

      </div>
      </div>

    </div>
  );
}

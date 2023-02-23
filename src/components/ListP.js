import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { BsDownload } from "react-icons/bs";

const doc = new jsPDF()

const ListP = ({post}) => {
  
	function downloadTable(){
		const tableHeader = Object.keys(post)
      		const tableBody = Object.values(post)
      		
      		doc.setFontSize(20)
  		doc.text('Laporan Penyelamatan', 75, 10)
  		doc.setTextColor(10)
      
		autoTable(doc, {
			head: [tableHeader.slice(0, 2)],
			body: [tableBody.slice(0, 2)],
		      })
		      
		autoTable(doc, {
			head: [tableHeader.slice(2, 4)],
			body: [tableBody.slice(2, 4)],
		      })
		      
		      autoTable(doc, {
			head: [tableHeader.slice(4, 5)],
			body: [tableBody.slice(4, 5)],
		      })
		      
		      autoTable(doc, {
			head: [tableHeader.slice(5, 9)],
			body: [tableBody.slice(5, 9)],
		      })
		      
		      autoTable(doc, {
			head: [tableHeader.slice(9, 13)],
			body: [tableBody.slice(9, 13)],
		      })

			  autoTable(doc, {
				head: [tableHeader.slice(13, 15)],
				body: [tableBody.slice(13, 15)],
				  })
		      
		      autoTable(doc, {
			head: [tableHeader.slice(15, 17)],
			body: [tableBody.slice(15, 17)],
		      })
		      
		      autoTable(doc, {
			head: [tableHeader.slice(17, 18)],
			body: [tableBody.slice(17, 18)],
		      })
      
		doc.save('LaporanPenyelamatan.pdf')
		window.location.reload()
	}
	
	return (
		<li className="list-group-item d-flex justify-content-between align-items-start">
		    <div className="ms-2 me-auto">
		      <div className="fw-bold text-start">{post.Hari_dan_Tanggal}</div>
		      <div className="text-start">{post.Alamat_Kejadian}</div>
		    </div>
		    <BsDownload size={16} style={{marginLeft: "10px", cursor: "pointer"}} onClick={downloadTable} />
		  </li>
	)
};

export default ListP;

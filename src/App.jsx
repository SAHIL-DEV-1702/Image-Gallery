
import axios from 'axios'
import { useState, useEffect, } from 'react'
function App() {


  const [data, setData] = useState([])
  const [page, setPage] = useState(1)


  const getData = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=20`)
      console.log("response from url")
      setData(response.data)
    }
    catch (error) {
      console.log("error getting data from url", error)
    }
  }

  useEffect(() => {
    getData()
  }, [page,])

  const pageInc = () => {
    setPage(page + 1)
    console.log("page inc", page)
    setData([])
  }

  const pageDec = () => {
    if (page > 1) {
      setPage(page - 1)
      console.log("page dec", page)
      setData([])

    }
  }
  let printData = <h3 className="text-center text-blue-300 mt-90 text-6xl font-semibold">LOADING...</h3>

  if (data.length > 0) {
    return (
      <>

        <h1 className='h-10 mb-10 font-extrabold font-sans text-3xl text-cyan-300 text-center mt-5'> IMAGE GALLERY </h1>

        <div className="body w-screen h-175 border-2 border-black flex flex-wrap  overflow-y-scroll justify-center">

          {data.map((e, idx) =>
            <a href={e.url} target="_blank" key={idx} >
              <div className="card h-48 w-48 border-2 border-black m-5 rounded-xl overflow-hidden" >
                <img src={e.download_url} alt="not found" className='w-full h-full' />

              </div>
            </a>
          )
          }


        </div>
        <div className=" h-15 flex justify-center items-center mt-5 mb-5 space-x-5">
          {page === 1 ?
            <button className='h-10 w-15 border-2 bg-gray-100 rounded-lg font-bold' onClick={pageDec} disabled >prev</button>
            :
            <button className='h-10 w-15 border-2 bg-amber-200 active:scale-95 rounded-lg font-bold' onClick={pageDec} >prev</button>
          }
          <h4 className='font-bold'>Page {page}</h4>
          <button className='h-10 w-15 border-2 bg-amber-200 active:scale-95 rounded-lg font-bold ' onClick={pageInc}>next</button>

        </div>
      </>

    )
  }
  else {
    return printData
  }
}

export default App
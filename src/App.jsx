
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
  }, [page])

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
        <button className='h-10 w-10 border-2 active:bg-gray-300' onClick={pageDec}>prev</button>
        <button className='h-10 w-10 border-2 active:bg-gray-300' onClick={pageInc}>next</button>

      </div>
    </>

  )
}

export default App
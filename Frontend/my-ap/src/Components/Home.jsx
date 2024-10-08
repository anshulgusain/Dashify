
import axios from "axios"
import { useEffect, useState } from "react"
import "../Styles/Home.css"
import {useNavigate} from "react-router-dom"




function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate=useNavigate()


  // const handleEdit=()=>{

  // }

  const config = {
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(() => {
    
    const search = async () => {
      try {
     
        const response = await axios.get("http://localhost:8080/blog")
        
        setData(response.data.data)
        setLoading(false)
      } catch (err) {
        setError(true)
        console.log(err)
      }

    }
    search()
  },[])

  const deleteBlog=(async(id)=>{
    console.log(id)
    const response=await  axios.delete(`http://localhost:8080/blog/${id}`,config)
    console.log(response)
    if(response.data.msg=="Not Authorised"){
      alert("Not Authorized")
    }
    else{
    alert("Blog Deleted Successfully")
    // window.location.reload()
    }
   })
   



  if(loading) return <div>Loading ........</div>
  if(error) return <div className="error"><h1>Please Login First</h1></div>

  return (
    <div className="blogparent">
    
               {
      data.map((ele)=>(
         <div className="blogcontainer" key={ele._id}> 
           <div className="blogimage">
           <img src={ele.image} alt="blog" />
         </div>
         <div className="blogtitle">
           {ele.title}
         </div>
         <div className="blogblog">
           {ele.blog}
         </div>
         <div className="blogauthor">
              -By {ele.author}
         </div>

         <div className="buttons">
        <button onClick={(()=>{
         navigate("/edit", { state: { _id: ele.userid,
         author:ele.author,title:ele.title,image:ele.image,blog:ele.blog
         } });
          

        })}>Edit</button>
        <button onClick={()=>{
          // console.log(ele)
          deleteBlog(ele._id)
        }
        }>Delete</button>
      </div>
         
       </div>
      ))
    }
    
    
    
    
      

    </div>
  )
}

export default Home
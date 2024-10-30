import { useState } from "react"
import axios from "axios"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState("")
  const {dispatch} = useWorkoutsContext()
  const [emptyFields, setEmptyFields] = useState([])

  const resetState = () => {
    setTitle("");
    setReps("");
    setLoad("");
    setError("");
    setEmptyFields([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post("/api/workouts/", {
        title: title,
        load: load,
        reps: reps
      })
    
      if (response.status === 200 ) {
        resetState();
        dispatch({type: 'CREATE_WORKOUT', payload: response.data})
        return
      }  
      setError(response.data.error)
    } catch (e) {
      if(e.response.data){
        setEmptyFields(e.response.data.emptyFields)
      }
      setError(e.response.data.error)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title: </label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kgs): </label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load} 
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>

      {error !== "" ? <div className="error">{error}</div> : ""}
    </form>
  )
}

export default WorkoutForm
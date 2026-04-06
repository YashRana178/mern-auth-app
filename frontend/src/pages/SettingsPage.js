import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SettingsPage.css";

function SettingsPage(){

  const [items,setItems] = useState([]);

  useEffect(()=>{
    fetchItems();
  },[]);

  const fetchItems = async ()=>{
    const res = await axios.get("http://localhost:5000/api/settings");
    setItems(res.data);
  };

const updateItem = async (item) => {
  console.log("Saving item:", item);  

  try {
    await axios.put(
      `http://localhost:5000/api/settings/${item._id}`,
      item
    );

    alert("Saved successfully ✅");   // ✅ now you’ll see it

    fetchItems();
  } catch (error) {
    console.log("Error:", error);
    alert("Error saving ❌");
  }
};

  const addItem = async ()=>{
    await axios.post("http://localhost:5000/api/settings",{
      title:"",
      image:"",
      isActive:false
    });

    fetchItems();
  };

  const handleImage = (e,index)=>{
    const file = e.target.files[0];
    const updated = [...items];
    updated[index].image = URL.createObjectURL(file);
    setItems(updated);
  };

  const toggleStatus = (index)=>{
    const updated = [...items];
    updated[index].isActive = !updated[index].isActive;
    setItems(updated);
  };

  const removeItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/settings/${id}`);
    fetchItems();
  } catch (error) {
    console.log(error);
  }
};

  return(

    <div className="settings-container">

      <h2>Admin Settings</h2>

      {items.map((item,index)=>(
        <div className="setting-row" key={item._id}>

          <input
            type="text"
            value={item.title}
            onChange={(e)=>{
              const updated=[...items];
              updated[index].title=e.target.value;
              setItems(updated);
            }}
          />

          <input
            type="file"
            onChange={(e)=>handleImage(e,index)}
          />

          {item.image && (
            <img src={item.image} width="80"/>
          )}

          <label className="switch">
            <input
              type="checkbox"
              checked={item.isActive}
              onChange={()=>toggleStatus(index)}
            />
            <span className="slider"></span>
          </label>

          <button onClick={()=>updateItem(item)}>
            Save
          </button>

        </div>
      ))}

      <div className="section-buttons">

  <button className="add-btn" onClick={addItem}>
    + Add Section
  </button>

  <button 
    className="remove-btn"
    onClick={() => {
      if(items.length > 0){
        removeItem(items[items.length-1]._id);
      }
    }}
  >
    - Remove Section
  </button>

 <button 
    className="home-btn"
    onClick={() => window.location.href="/home"}
  >
    Home Page 
  </button>

</div>

    </div>
  );
}

export default SettingsPage;
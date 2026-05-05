import { useState } from "react";
function Name() {
    const [name,setName] =useState("");

    return (
        <div>
            <h1> name:</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            />
            <p>you typed : {name}</p>
            <button onClick={() => setName("")}>clear</button>
        </div>
    )
}
export default Name;
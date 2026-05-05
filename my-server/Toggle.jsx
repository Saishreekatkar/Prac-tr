import { useState } from "react";

function Toggle() {
    const [show,showmess]=useState(false);
    return (
        <div>
            <h1>boolean toggle</h1>
            <button onClick={()=> showmess(true)}>show message</button>
            <button onClick={()=> showmess(false)}>hide message</button>

            {show && <p> hello message visible</p>}
        </div>
    )

}

export default Toggle;
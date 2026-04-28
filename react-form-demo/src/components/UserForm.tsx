import { useState } from "react";
import type { ChangeEvent } from "react";

function UserForm() {
    const [formData, setFormData] = useState({
        fullName : "",
        email: "",
    });


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};


    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10">
            <form className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-slate-900">user form
                </h1>
                <p className="mt-1 text-sm text-slate-500">register for consultation</p>
                <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700"> full name 

                    </label>
                    <input type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="enter full name" 
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border focus:border-blue-500 focus:ring-4 focus:ring-blue-100"></input>

                </div>

                 <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-slate-700"> email

                    </label>
                    <input type="text" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="enter email" 
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border focus:border-blue-500 focus:ring-4 focus:ring-blue-100"></input>

                </div>

                <button type="button" className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">submit

                </button>
          <pre className="mt-6 rounded-xl bg-slate-900 p-4 text-sm text-white">
          {JSON.stringify(formData, null, 2)}
        </pre>
            </form>
        </div>
    )
}

export default UserForm
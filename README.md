This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- 'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
function page() {
   const router=useRouter();
    const[email,setemail]=useState<string>("");
    const[pass,setpass]=useState<string>("");
    const[error,seterror]=useState("")
    const[loading,setloading]=useState(false)
   async function handelsubmit(e:FormEvent){
        e.preventDefault();
          if (!email || !pass) {
    seterror("Email and password are required.");
   
    return;
  }
       const obj={
        email,
        pass
       }
       const req=await fetch("http://localhost:3000/api/userauth/login",{
      method:"POST",
      body:JSON.stringify(obj)
    })
    const resp=await req.json();
    const user=resp.success;
    if(user){
      alert("loggedin")
      window.location.href = "/";
    }
    else{
      alert(":/")
    }
    }
  return (
    <div>
       <div className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-[400px] h-[400px] bg-white shadow-lg rounded-lg flex overflow-hidden">
        
       
        
    
        <div className="w-full p-6 flex flex-col gap-6">
         
          <div className="flex justify-end text-sm text-gray-500">
            <p className="mr-2">Doesn't have an account?</p>
            <Link href="/register" className="text-blue-600 hover:underline">Sign up</Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back!💙</h1>
            <p className="text-sm text-gray-500 mb-6">Login to your account below</p>

            <form onSubmit={handelsubmit} className="flex flex-col gap-4">

              <div>
                <label htmlFor="femail" className="block text-sm font-medium  text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  id="femail"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                />
              </div>

              <div>
                <label htmlFor="fpass" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  id="fpass"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}

            {loading?<div className="text-black mt-2 py-2">Loading...</div>:  <button
               
                className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
              >
                Login
              </button>}
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page -->



'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !pass) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const obj = {
      name,
      email,
      password: pass,
      role
    };

    try {
      const res = await fetch("http://localhost:3000/api/userauth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });

      const data = await res.json();

      if (data.success) {
        alert("Signup successful!");
        window.location.href='/'
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-[500px] h-[550px] bg-white shadow-lg rounded-lg flex overflow-hidden">
        <div className="w-full p-6 flex flex-col gap-6">
          <div className="flex justify-end text-sm text-gray-500">
            <p className="mr-2">Already have an account?</p>
            <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome to JobFinder!</h1>
            <p className="text-sm text-gray-500 mb-6">Register your account below</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="fname"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="femail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="femail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="fpass" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="fpass"
                  placeholder="Enter password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}
              {loading ? (
                <div className="text-blue-700 text-center">Submitting...</div>
              ) : (
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

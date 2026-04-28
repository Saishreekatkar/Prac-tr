function Services() {
  return (
    <main className="min-h-screen bg-slate-200 px-6 py-16 font-sans text-slate-900">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">
        <p className="mb-3 font-bold uppercase tracking-wide text-blue-600">
          Our Services
        </p>

        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Services Page
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          These are the {" "}<span className="fond-bold text-blue-600">services</span>  we provide.
        </p>
        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          Bussiness strats
        </h2>
        <p className="mt-2 text-slate-600">
          we help bussinesses
        </p>
        <h2 className="mt-6 border-t border-slate-200 pt-6  text-2xl font-bold text-slate-900">
          marketing advice </h2>

        <h2 className="mt-6 border-t border-slate-200 pt-6 text-2xl font-bold text-slate-900">
  Growth Planning
        </h2>
    <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition">book now </button>

        
      </section>

      
    </main>
  );
}

export default Services;
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-4">Welcome to Raj Motors</h1>
          <p className="text-xl text-gray-800 mb-8">Rent a bike and explore the city with style and comfort</p>
          <button className="bg-black text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
            Rent Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏍️</div>
              <h3 className="text-xl font-bold mb-2">Premium Bikes</h3>
              <p className="text-gray-600">Well-maintained, latest model bikes for your rides</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Affordable Rates</h3>
              <p className="text-gray-600">Competitive pricing with flexible rental options</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Safe & Insured</h3>
              <p className="text-gray-600">All bikes are insured and professionally maintained</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-lg mb-8">Sign up now and get 20% off on your first rental</p>
          <button className="bg-primary text-black px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
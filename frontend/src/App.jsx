import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
}

export default App;

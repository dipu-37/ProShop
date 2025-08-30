import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Header />
      <div className='relative flex-grow'>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-20">
          <Outlet />
        </main>
      </div>
      <Footer className="absolute bottom-0 left-0 w-full" />
    </div>
  );
}

export default App;
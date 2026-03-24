import Header from './components/Header.tsx';
import Main from './components/Main.tsx';
import Footer from './components/Footer.tsx';

function App() {

  return (
    <div className="px-4 lg:px-8">
      {/* Heading */}
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

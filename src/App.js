import Footer from './components/Footer';
import Header from './components/Header';
import Projects from './components/Projects';

const App = () => (
  <div className="App">
    <Header />
    <h1 className="title">Welcome to My Portfolio</h1>
    <main>
      <Projects />
    </main>
    <Footer />
  </div>
);

export default App;

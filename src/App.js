import Container from 'react-bootstrap/Container'
import Header from "./components/Header/Header";
import TranslationArea from "./components/TranslationArea";
import Row from "react-bootstrap/Row";

function App() {
    return (
    <Container fluid>
        <Row>
            <Header/>
        </Row>
        <Row>
            <TranslationArea/>
        </Row>
    </Container>
  );
}

export default App;

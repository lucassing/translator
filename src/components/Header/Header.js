import {Container} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import "./Header.css"

/**
 * Renders Header
 */

function Header() {
    return (
        <Container fluid className="header">
            <Row className="justify-content-sm-center">
                <Col className='mt-5' sm="auto">
                    <h1>All Out!</h1>
                </Col>
            </Row>
            <Row className="justify-content-sm-center">
                <Col className='mb-5' sm="auto">
                    <h3>Translator</h3>
                </Col>
            </Row>
        </Container>

    );
}

export default Header;

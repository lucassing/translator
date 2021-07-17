import FloatingLabel from 'react-bootstrap/FormText'
import Form from 'react-bootstrap/Form'
import {Container} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";

/**
 * Translation Box
 * Renders Textarea and LanguageSelector to translate from/to
 */

function TranslationBox(props) {
    const placeholder = props.placeholder
    const text = props.text

    return (
        <Container fluid>
            <Row>
                <Col>
                    {/*Language Selector Area*/}
                    {props.children}
                </Col>
            </Row>
            <Row>
                <Col>
                    {/*Textarea*/}
                    <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                        <Form.Control onChange={(e)=>props.changeTextHandler(e.target.value)}
                                      as="textarea"
                                      rows={20}
                                      placeholder={placeholder}
                                      value={text}/>
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>

    );
}

export default TranslationBox;

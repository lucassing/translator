import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {fetchTranslateText} from "../services/DeeplServices";
import TranslationBox from "./TranslationBox";
import LanguageSelector from "./LanguageSelector";
import {targ_languages} from "../config/config"

/**
 * Renders 2 TranslationBox, for the Source Language and Target Language
 */

const styles = {
    translationArea: {
        backgroundColor: "#eef4f7",
    }
}

function TranslationArea() {
    let [sourceData, setSourceData] = useState({"source_lang": "EN", "text": ""})
    let [targetData, setTargetData] = useState({"target_lang": "", "text": ""})
    const [error, setError] = useState({"message": "", "show": false});

    const setSourceText = (sourceText) => {
        setSourceData({...sourceData, "text": sourceText})
    }

    const setSourceLang = (sourceLang) => {
        setSourceData({...sourceData, "source_lang": sourceLang})
    }

    const setTargetText = (targetText) => {
        setTargetData({...targetData, "text": targetText})
        setError({...error, "show":false})

    }

    const setTargetLang = (targetLang) => {
        setTargetData({...targetData, "target_lang": targetLang})
        if(targetLang==""){
            setError({"message":"Please select a target language", "show":true})
        }else{
            setError({...error, "show":false})
        }
    }

    const translateData = async () => {
        setTargetText("")
        if(targetData.target_lang!="") {
            let res = await fetchTranslateText(sourceData.text, sourceData.source_lang, targetData.target_lang)
            if (res.ok) {
                let data = await res.json()
                let text = ""
                data['translations'].forEach(translation => text += translation.text)
                setTargetText(text)
            } else {
                setError({"message":"There was an error with our server, please retry later", "show":true})
            }
        }
        else{
            setError({"message":"Please select a target language", "show":true})
        }
    }

    return (
    <Container style={styles.translationArea} className="p-5">
        <Row className="justify-content-sm-center">
            <Col md className="mx-xxl-5">
                {/*TranslationBox Source*/}
                <TranslationBox
                    changeTextHandler={setSourceText}
                    placeholder="To translate from English">
                    <LanguageSelector
                        selectionEnable={false}
                        options={{"EN": "English"}}
                        changeLangHandler={setSourceLang}
                        title="From:"/>
                </TranslationBox>
            </Col>
            <Col xs="12" md="auto" className="my-sm-5 my-md-auto" align="center">
                <Button className="my-auto" variant="secondary" onClick={translateData}>Translate <FontAwesomeIcon
                    icon={faArrowRight}/></Button>
            </Col>
            <Col md className="mx-5">
                {/*TranslationBox Target*/}
                <TranslationBox text={targetData['text']}
                                changeTextHandler={setTargetText}
                                placeholder="Your Translation">
                    <LanguageSelector
                        changeLangHandler={setTargetLang}
                        options={targ_languages}
                        title="To:"/>
                    <Alert className='my-1 mx-1' variant="danger" show={error.show}>
                        <p className='my-0'>{error.message}</p>
                    </Alert>
                </TranslationBox>
            </Col>
        </Row>
    </Container>)
}
export default TranslationArea

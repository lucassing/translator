import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
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

    const setSourceText = (sourceText) => {
        setSourceData({...sourceData, "text": sourceText})
    }

    const setSourceLang = (sourceLang) => {
        setSourceData({...sourceData, "source_lang": sourceLang})
    }

    const setTargetText = (targetText) => {
        setTargetData({...targetData, "text": targetText})
    }

    const setTargetLang = (targetLang) => {
        setTargetData({...targetData, "target_lang": targetLang})
    }

    const translateData = async () => {
        setTargetText("")
        let res = await fetchTranslateText(sourceData.text, sourceData.source_lang, targetData.target_lang)
        if (res.ok) {
            let data = await res.json()
            let text = ""
            data['translations'].forEach(translation => text += translation.text)
            setTargetText(text)
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
                </TranslationBox>
            </Col>
        </Row>
    </Container>)
}
export default TranslationArea

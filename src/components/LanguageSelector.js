import Form from 'react-bootstrap/Form'

/**
 * Language Selector Box,
 * Renders select field with the languages pass through the props.options as options
 * if only one option is passed, the selector sets it by default and selection is disabled.
 *
 */

function LanguageSelector(props) {
    const title = props.title
    const options = props.options
    const onChangeLanguageSelector = props.changeLangHandler



    return (
        <Form.Group controlId="custom-select">
            <Form.Label>{title}</Form.Label>
            {   Object.keys(options).length===1

                ? <Form.Control onChange={(e)=>props.changeLangHandler(e.target.value)}
                              as="select"
                              className="rounded-0 shadow"
                              disabled={true}>
                    <option className="d-none" key={Object.keys(options)[0]} value={Object.keys(options)[0]}>
                        {Object.values(options)[0]}
                    </option>
                </Form.Control>

                : <Form.Control onChange={(e)=>onChangeLanguageSelector(e.target.value)}
                                as="select"
                                className="rounded-0 shadow"
                                disabled={false}>
                    <option value="">Select Language</option>
                    {
                        Object.entries(options).map(([key, value]) => (<option key={key} value={key}>{value}</option>))
                    }
                </Form.Control>
            }
        </Form.Group>
    );


}
export default LanguageSelector;

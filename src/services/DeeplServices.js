import {key} from '../config/config'

export async function fetchTranslateText(text, source_lang, target_lang){
    // Fetch to deepl endpoint
    return fetch(`https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPLAPI_KEY}&text=${text}&target_lang=${target_lang}`,
        {
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': "translator",
                'Accept': "*/*"
            }
        })
}

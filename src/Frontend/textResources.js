const textResources = {
    /** Welcome screen **/
    'WELCOME_NO': 'Velkommen!',
    'WELCOME_EN': 'Welcome!',
    'WELCOME_SUBTITLE_NO': 'For å kunne gi deg relevant informasjon, trenger vi å vite hvilken gruppe du tilhører. Du kan gå tilbake og endre dette senere!',
    'WELCOME_SUBTITLE_EN': 'To provide you with relevant information, we need to know which group you belong to. You can go back and change this later!',
    'GROUP_PLACEHOLDER_NO': 'Velg gruppe...',
    'GROUP_PLACEHOLDER_EN': 'Select group...',
    'WELCOME_SCREEN_BUTTON_LABEL_NO': 'Jeg er klar',
    'WELCOME_SCREEN_BUTTON_LABEL_EN': 'I\'m ready',
    
    /** Form error labels **/
    'ERROR_TITLE_NO_NO': 'Du må fylle inn norsk tittel',
    'ERROR_TITLE_EN_NO': 'Du må fylle inn engelsk tittel',
    'ERROR_DAY_NO': 'Du må velge en dag',
    'ERROR_START_TIME_NO': 'Velg starttidspunkt (hh:mm)',
    'ERROR_END_TIME_NO': 'Fyll ut hele sluttidspunktet',
    'ERROR_DESC_NO_NO': 'Du må fylle inn norsk beskrivelse',
    'ERROR_DESC_EN_NO': 'Du må fylle inn engelsk beskrivelse',
    'ERROR_GROUPS_NO': 'Du må velge gruppe(r) arrangementet gjelder for',
    'ERROR_LINK_NO': 'Du kan ikke ha lenketekst uten lenke',

    /** PHONE **/
    'EMERGENCY_PHONE_NUMBER_NO': 'Vakttelefon',
    'EMERGENCY_PHONE_NUMBER_EN': 'Mentor board',
    'PHONE_NUMBER_NO': '404 66 599',
    'PHONE_NUMBER_EN': '404 66 599'
}

const selectResource = (label, lang) => {
    const key = `${label}_${lang}`;
    if (key in textResources) 
        return textResources[key]
    else 
        return label
}

export default (label, state) => {
    if (!state || !state.lang) {
        return selectResource(label, 'NO')
    }
    else {
        return selectResource(label, state.lang)
    }  
}
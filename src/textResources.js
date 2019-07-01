const textResources = {
    'WELCOME_NO': 'Velkommen!',
    'WELCOME_EN': 'Welcome!',
    'WELCOME_SUBTITLE_NO': 'For å kunne gi deg relevant informasjon, trenger vi å vite hvilken gruppe du tilhører. Du kan gå tilbake og endre dette senere!',
    'WELCOME_SUBTITLE_EN': 'To provide you with relevant information, we need to know which group you belong to. You can go back and change this later!',
    'GROUP_PLACEHOLDER_NO': 'Velg gruppe...',
    'GROUP_PLACEHOLDER_EN': 'Select group...',
    'WELCOME_SCREEN_BUTTON_LABEL_NO': 'Jeg er klar!',
    'WELCOME_SCREEN_BUTTON_LABEL_EN': 'I\'m ready!'
}

const selectResource = (label, lang) => {
    const key = `${label}_${lang}`;
    if (textResources[key]) 
        return textResources[key]
    else 
        return label 
}

export default (label, state) => {
    if (!state.lang) 
        return selectResource(label, 'NO')
    else 
        return selectResource(label, state.lang)
}
import React from 'react';

const SelectLanguage = ({ state: { lang }, changeLanguage }) => {
    const NO_class = lang === 'NO' ? 'selected-lang' : '';
    const EN_class = lang === 'EN' ? 'selected-lang' : '';

    return (
        <div className="language-select" onClick={changeLanguage}>
            <p className={NO_class}> NO </p> <p>|</p> <p className={EN_class}> EN </p>
        </div>
    );
};

export default SelectLanguage;
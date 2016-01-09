import PersonGeneral from './dictionaries/person/PersonGeneral';
import Common from './dictionaries/Common'
import Races from './dictionaries/Races.js'
    
class Word {
    language = 'en';
    
    dictionaries = {
        common: Common,
        person_general: PersonGeneral,
        races: Races
    };
    
    getDictionary(dictionary) {
        if(this.dictionaries[dictionary] === undefined) {
            throw 'Invalid dictionary: ' + dictionary;
        }
        return this.dictionaries[dictionary][this.language];
    }
}

export default new Word();
import React from 'react';

import Text from './Text.js';


const SPECIAL_CHARS = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGIT_CHARS = '0123456789';
const CharType = {
    SPECIAL: 'SPECIAL',
    DIGIT: 'DIGIT',
    UPPERCASE: 'UPPERCASE',
    LOWERCASE: 'LOWERCASE'
};

export default class PasswordGenerator extends Text {

    constructor(props){
        super(props);
        if(!this.state)this.state = {};
        this.state.passwordStrength = {
            extreme: 'Extreme',
            strong: 'Strong',
            good: 'Good',
            weak: 'Weak',
            empty: null
        };
        this.state.showPassword = false;
    }
    
    buildInput(attributes){
        let strength = this.props.passwordStrength ? this.props.passwordStrength : this.state.passwordStrength;
        let strengthType = this.getStrengthType(this.props.value);
        
        attributes.type = this.state.showPassword ? 'text' : 'password';
        
        let showPasswordText;
        let showPasswordClass;
        let generatePasswordText = this.props.generatePasswordText ? this.props.generatePasswordText : 'Generate';
        if(!this.state.showPassword) {
            showPasswordClass += 'show-pass';
            showPasswordText =  this.props.showPasswordText ? this.props.showPasswordText : 'Show';
        } else {
            showPasswordClass += 'hide-pass';
            showPasswordText =  this.props.hidePasswordText ? this.props.hidePasswordText : 'Hide';
        }
        return <div className="password-strength">
            {super.buildInput(attributes)}
            <span className={'meter ' + strengthType}>{strength[strengthType]}</span>
            <span className="control">
                <a href="#" className="generate" onClick={this.generatePassword.bind(this)}>{generatePasswordText}</a>
                <a href="#" onClick={this.showPassword.bind(this)} className={showPasswordClass}>{showPasswordText}</a>
            </span>
        </div>
    }

    getStrengthType(value){
        if(value) {
            if(this.isExtreme(value)) {
                return 'extreme';
            } else if(this.isStrong(value)) {
                return 'strong';
            } else if(this.isGood(value)) {
                return 'good';
            } else {
                return 'weak';
            }
        } else {
            return 'empty';
        }
    }

    randomBetween(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    removeArrayValue(value, array){
        let index = array.indexOf(value);
        if(index > -1) {
            array.splice(index, 1);
        }
    }
    generatePassword(event) {
        event.preventDefault();
        var length = this.randomBetween(12, 14),
            maxSpecials = this.randomBetween(1, 3),
            specials = 0,
            maxDigits = this.randomBetween(2, 4),
            digits = 0,
            maxUppercase = this.randomBetween(2, 4),
            uppercase = 0,
            maxLowercase = length - maxSpecials - maxDigits - maxUppercase,
            lowercase = 0;

        var result = "";
        var types = [CharType.SPECIAL, CharType.DIGIT, CharType.UPPERCASE, CharType.LOWERCASE];

        for (var i = 0; i < length; i++) {
            var type = types[this.randomBetween(0, types.length - 1)];
            switch (type) {
                case CharType.SPECIAL:
                    if (specials < maxSpecials) {
                        result += SPECIAL_CHARS.charAt(this.randomBetween(0, SPECIAL_CHARS.length - 1));
                        specials++;
                    } else {
                        i--;
                        this.removeArrayValue(CharType.SPECIAL, types);
                    }
                    break;
                case CharType.DIGIT:
                    if (digits < maxDigits) {
                        result += DIGIT_CHARS.charAt(this.randomBetween(0, DIGIT_CHARS.length - 1));
                        digits++;
                    } else {
                        i--;
                        this.removeArrayValue(CharType.DIGIT, types);
                    }
                    break;
                case CharType.UPPERCASE:
                    if (uppercase < maxUppercase) {
                        result += UPPERCASE_CHARS.charAt(this.randomBetween(0, UPPERCASE_CHARS.length - 1));
                        uppercase++;
                    } else {
                        i--;
                        this.removeArrayValue(CharType.UPPERCASE, types);
                    }
                    break;
                case CharType.LOWERCASE:
                    if (lowercase < maxLowercase) {
                        result += LOWERCASE_CHARS.charAt(this.randomBetween(0, LOWERCASE_CHARS.length - 1));
                        lowercase++;
                    } else {
                        i--;
                        this.removeArrayValue(CharType.LOWERCASE, types);
                    }
                    break;
            }
        }
        console.log('Generated ' + length + ' chars password (SP:' + maxSpecials + ', DG:' + maxDigits + ',UC:' + maxUppercase +
            ', LC:' + maxLowercase + ') = ' + result + "  (" + result.length+ ")");
        this.setState({showPassword: true});
        this.setValue(result, null);
    }
    
    isExtreme(value) {
        return value && value.length >= 14 && this.isMixedCase(value) &&
            this.containsDigits(value) && this.containsSpecialChars(value);

    }

    showPassword(event){
        event.preventDefault();
        this.setState({showPassword: !this.state.showPassword});
    }
    
    isStrong(value): boolean {
        return value && value.length >= 10 && this.isMixedCase(value) && this.containsNonAlphabetChars(value);
    }
    
    isGood(value) {
        return value && (value.length >= 8 || 
            (value.length >= 6 && this.isMixedCase(value) && this.containsNonAlphabetChars(value)));
    }

    
    isMixedCase(str) {
        return !(str == str.toUpperCase || str == str.ToLowerCase)
    }

    containsDigits(value) {
        return /\d/.test(value);
    }

    containsSpecialChars(value) {
        return /[^a-z0-9\s]/i.test(value);
    }

    containsNonAlphabetChars(value) {
        return /[^a-z\s]/i.test(value);
    }
}
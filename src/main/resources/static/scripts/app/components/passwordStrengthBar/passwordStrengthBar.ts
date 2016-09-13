import {Component, OnChanges, SimpleChanges, Input, SimpleChange, ElementRef} from '@angular/core';

@Component({
    selector: 'password-strength-bar',
    templateUrl: 'scripts/app/components/passwordStrengthBar/passwordStrengthBar.html'
})
export class PasswordStrengthBar implements OnChanges {
    @Input() passwordToCheck: string;

    private colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

    constructor(private elementRef: ElementRef) {
    }

    private measureStrength(p) {
        var _force = 0;
        var _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);

        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
        var _passedMatches = $.grep(_flags, function (el) {
            return el === true;
        }).length;

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

        return _force;

    }
    private getColor(s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        var password = changes['passwordToCheck'].currentValue;
        if (password) {
            let c = this.getColor(this.measureStrength(password));
            let nativeElement = this.elementRef.nativeElement;
            nativeElement.removeClass('ng-hide');
            nativeElement.find('ul').children('li')
                .css({ 'background-color': '#DDD' })
                .slice(0, c.idx)
                .css({ 'background-color': c.col });
        }
    }
}
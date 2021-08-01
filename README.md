# BBCode Unit Converter

## Setup

Go to the creation form for custom BBCodes as per the instructions of https://www.phpbb.com/support/docs/en/3.1/kb/article/adding-custom-bbcodes-in-phpbb3/

In the first field, enter:

```
[unit]{REGEXP=/^[0-9a-zA-Z'"\.\s\x{00B0}]+$/u}[/unit]
```

In the second field, enter:

```
<span>{REGEXP}
<script>
document.write((function () {
function convert(t){var s=t.match(/^\s*([0-9])+m\s*([0-9]+)?\s*$/);if(null!==s)return convert(s[1]+"."+(s[2]||0)+"m");if(null!==(s=t.match(/^\s*([0-9]+(\.[0-9]+)?)\s*((c)?m)\s*$/))){var r="m"===s[3]?100:1,a=parseFloat(s[1])*r;return(r=Math.floor(a/30.48))+"' "+(a=Math.round((a-30.48*r)/2.54))+'"'}if(null===(s=t.match(/^\s*([0-9]+)'\s*([0-9]+)"?\s*$/)))return null!==(s=t.match(/^\s*([0-9]+(\.[0-9]+)?)\s*°?\s*C\s*$/))?(9*parseFloat(s[1])/5+32).toFixed(2)+"°F":null===(s=t.match(/^\s*([0-9]+(\.[0-9]+)?)\s*°?\s*F\s*$/))?t:(5*(parseFloat(s[1])-32)/9).toFixed(2)+"°C";r=parseInt(s[1]),a=parseInt(s[2]);return Math.round(30.48*r+2.54*a)+" cm"}
return ' / ' + convert(`{REGEXP}`);
})())
</script>
</span>
```

You will get a warning due to the usage of a REGEXP instead of SIMPLETEXT so to be able to support the ', " and ° characters. As you can see above, the REGEXP in question is pretty strict, especially in the context of backquotes, and should offer no security concern.

## Usage

Input:

```
[unit]1m 60[/unit]
[unit]1.85 m[/unit]
[unit]175cm[/unit]
[unit]5'6"[/unit]

[unit]30°C[/unit]
[unit]80 F[/unit]

[unit]aaa[/unit]
[unit]` + alert('Hacker!'));(`[/unit]
```

Output:

```
1m 60 / 5' 3"
1.85 m / 6' 1"
175cm / 5' 9"
5'6" / 168 cm

30°C / 86.00°F
80 F / 26.67°C

aaa / aaa
[unit]` + alert('Hacker!'));(`[/unit]
```

## Known limitations

- Numbers with thousand separators won't be converted.
- Numbers with non-comma decimal separators won't be converted.
- Nothing will be converted on Internet Explorer.

In all cases, the original value will still be shown.

## Technobabble

### Run tests

```
yarn install
yarn test
```

### Build

```
yarn install
./node_modules/uglify-js/bin/uglifyjs --compress --mangle -- converter.js
```

Remove the `module.exports=convert;` at the end manually.

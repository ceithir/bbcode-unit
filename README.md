# BBCode Unit Converter

## Setup

Go to the creation form for custom BBCodes as per the instructions of https://www.phpbb.com/support/docs/en/3.1/kb/article/adding-custom-bbcodes-in-phpbb3/

In the first field, enter:

```
[unit]{REGEXP=/^[0-9a-zA-Z'"\.\s\x{00B0},]+$/u}[/unit]
```

In the second field, enter:

```
<span>{REGEXP}
<script>
document.write((function () {
function convert(t){var e;if(null!==(e=(t=(t=(t=t.replace(/\s+/g,"")).replace(/([0-9]+),([0-9]{3})/g,"$1$2")).replace(/,/g,".")).match(/^([0-9]+(\.[0-9]+)?)((c)?m)$/))){var r=parseFloat(e[1]),l=e[3];if("m"===l&&100<=r)return convert(r/1e3+"km");r=r*("m"===l?100:1);return(l=Math.floor(r/30.48))+"' "+(r=Math.round((r-30.48*l)/2.54))+'"'}if(null!==(e=t.match(/^([0-9]+)m([0-9]+)?$/)))return convert(e[1]+"."+(e[2]||0)+"m");if(null===(e=t.match(/^([0-9]+)'([0-9]+)"?$/)))return null!==(e=t.match(/^([0-9]+(\.[0-9]+)?)°?C$/))?(9*parseFloat(e[1])/5+32).toFixed(2)+"°F":null!==(e=t.match(/^([0-9]+(\.[0-9]+)?)°?F$/))?(5*(parseFloat(e[1])-32)/9).toFixed(2)+"°C":null!==(e=t.match(/^([0-9]+(\.[0-9]+)?)mi(\.|les)?$/))?(1.609344*parseFloat(e[1])).toFixed(2)+" km":null===(e=t.match(/^([0-9]+(\.[0-9]+)?)km$/))?null:(parseFloat(e[1])/1.609344).toFixed(2)+" miles";l=parseInt(e[1]),r=parseInt(e[2]);return Math.round(30.48*l+2.54*r)+" cm"}

var result = convert(`{REGEXP}`);
if (!result) { return ' (???)'; }
return ' (' + result + ')';
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

[unit]1,136 miles[/unit]
[unit]7 mi[/unit]
[unit]241 km[/unit]
[unit]1500 m[/unit]

[unit]30°C[/unit]
[unit]80 F[/unit]

[unit]aaa[/unit]
[unit]` + alert('Hacker!'));(`[/unit]
```

Output:

```
1m 60 (5' 3")
1.85 m (6' 1")
175cm (5' 9")
5'6" (168 cm)

1,136 miles (1828.21 km)
7 mi (11.27 km)
241 km (149.75 miles)
1500 m (0.93 miles)

30°C (86.00°F)
80 F (26.67°C)

aaa (???)
[unit]` + alert('Hacker!'));(`[/unit]
```

## Known limitations

- The tool has no way to differentiate between 1,000 (one thousand with comma thousand separator) and 1,000 (one with comma decimal separator) and will interpret the number as if it was the first.
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
yarn build
```

Remove the `module.exports=convert;` at the end manually.

export const hex2rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
const lin=c=>c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4, delin=c=>c<=0.0031308?12.92*c:1.055*c**(1/2.4)-0.055;
export function rgb2ok([r,g,b]){[r,g,b]=[r,g,b].map(lin);
 const l=Math.cbrt(0.4122214708*r+0.5363325363*g+0.0514459929*b),m=Math.cbrt(0.2119034982*r+0.6806995451*g+0.1073969566*b),s=Math.cbrt(0.0883024619*r+0.2817188376*g+0.6299787005*b);
 const L=0.2104542553*l+0.793617785*m-0.0040720468*s,a=1.9779984951*l-2.428592205*m+0.4505937099*s,B=0.0259040371*l+0.7827717662*m-0.808675766*s;
 return [L,Math.hypot(a,B),(Math.atan2(B,a)*180/Math.PI+360)%360];}
export function ok2rgb([L,C,H]){const a=C*Math.cos(H*Math.PI/180),b=C*Math.sin(H*Math.PI/180);
 const l=(L+0.3963377774*a+0.2158037573*b)**3,m=(L-0.1055613458*a-0.0638541728*b)**3,s=(L-0.0894841775*a-1.291485548*b)**3;
 return [4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.707614701*s].map(delin);}
export const inGamut=rgb=>rgb.every(c=>c>=-1e-4&&c<=1+1e-4);
export function clampOk([L,C,H]){let c=C;while(c>0&&!inGamut(ok2rgb([L,c,H])))c-=0.002;return [L,Math.max(c,0),H];}
export const rgb2hex=rgb=>'#'+rgb.map(c=>Math.round(Math.min(1,Math.max(0,c))*255).toString(16).padStart(2,'0')).join('').toUpperCase();
export const lum=rgb=>{const [r,g,b]=rgb.map(c=>lin(Math.min(1,Math.max(0,c))));return 0.2126*r+0.7152*g+0.0722*b};
export const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)};
export const fmt=([L,C,H])=>`oklch(${(L).toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;

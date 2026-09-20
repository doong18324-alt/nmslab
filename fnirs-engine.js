/* NMS Lab — fNIRS haemodynamic engine (reusable).
   Canonical double-gamma HRF convolved with a block design; precomputed once.
   Exposes NMSfnirs.mount({topo, trace, state}) returning nothing; auto-animates. */
window.NMSfnirs = (function () {
  "use strict";
  var FS = 10, CYCLE = 120, N = FS * CYCLE, NCH = 8, TAU = 2 * Math.PI;
  var BLOCKS = [
    { t0:0,  t1:18,  label:'REST',        state:'rest',     gain:0 },
    { t0:18, t1:48,  label:'SINGLE-TASK', state:'task',     gain:0.42 },
    { t0:48, t1:60,  label:'REST',        state:'rest',     gain:0 },
    { t0:60, t1:90,  label:'DUAL-TASK',   state:'task',     gain:1.0 },
    { t0:90, t1:120, label:'RECOVERY',    state:'recovery', gain:0 }
  ];
  function blockAt(t){ for(var i=0;i<BLOCKS.length;i++) if(t>=BLOCKS[i].t0&&t<BLOCKS[i].t1) return BLOCKS[i]; return BLOCKS[0]; }
  var DUAL = BLOCKS[3];
  var CH = [
    {x:-0.34,y:-0.62,lat:1.0},{x:-0.12,y:-0.72,lat:0.3},{x:0.12,y:-0.72,lat:0.3},{x:0.34,y:-0.62,lat:1.0},
    {x:-0.44,y:-0.40,lat:1.0},{x:-0.16,y:-0.48,lat:0.4},{x:0.16,y:-0.48,lat:0.4},{x:0.44,y:-0.40,lat:1.0}
  ];
  var OPT=[],row,i,f,yr,spread;
  for(row=0;row<2;row++){yr=row?-0.44:-0.67;spread=row?0.50:0.40;
    for(i=0;i<5;i++){f=(i/4-0.5)*2;OPT.push({x:f*spread,y:yr+Math.abs(f)*0.10,src:(i+row)%2===0});}}
  function lgamma(x){var g=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5];var y=x,tmp=x+5.5,ser=1.000000000190015,j;tmp-=(x+0.5)*Math.log(tmp);for(j=0;j<6;j++)ser+=g[j]/++y;return -tmp+Math.log(2.5066282746310005*ser/x);}
  function gammaPdf(t,k){return t<=0?0:Math.exp((k-1)*Math.log(t)-t-lgamma(k));}
  function pseudo(n){var s=Math.sin(n*12.9898)*43758.5453;return s-Math.floor(s);}
  var KLEN=32*FS,HRF=new Float64Array(KLEN),hmax=0,t;
  for(i=0;i<KLEN;i++){t=i/FS;HRF[i]=gammaPdf(t,6)-gammaPdf(t,16)/6;if(HRF[i]>hmax)hmax=HRF[i];}
  for(i=0;i<KLEN;i++)HRF[i]/=hmax;
  var PEAK=0.58,HBR_RATIO=-0.42,HBR_LAG=FS,hbo=[],hbr=[],c,k,kmax,sum,b,boost,u,j;
  for(c=0;c<NCH;c++){hbo.push(new Float64Array(N));hbr.push(new Float64Array(N));u=new Float64Array(N);
    for(i=0;i<N;i++){b=blockAt(i/FS);if(!b.gain)continue;boost=(b===DUAL)?(0.55+0.55*CH[c].lat):0.85;u[i]=b.gain*boost*(0.90+0.20*pseudo(c*7+3));}
    for(i=0;i<N;i++){sum=0;kmax=Math.min(KLEN,i+1);for(k=0;k<kmax;k++)sum+=u[i-k]*HRF[k];hbo[c][i]=sum/FS*PEAK;}
    for(i=0;i<N;i++){j=i-HBR_LAG;hbr[c][i]=HBR_RATIO*(j>=0?hbo[c][j]:0);}
    var p1=pseudo(c+1)*TAU,p2=pseudo(c+11)*TAU,p3=pseudo(c+21)*TAU,p4=pseudo(c+31)*TAU,nz;
    for(i=0;i<N;i++){t=i/FS;nz=0.045*Math.sin(TAU*0.10*t+p1)+0.028*Math.sin(TAU*0.25*t+p2)+0.014*Math.sin(TAU*1.15*t+p3)+0.030*Math.sin(TAU*(1/CYCLE)*t+p4)+0.007*(pseudo(c*997+i)-0.5);hbo[c][i]+=nz;hbr[c][i]+=nz*0.45;}}
  function at(arr,tt){var x=(((tt%CYCLE)+CYCLE)%CYCLE)*FS;var i0=Math.floor(x),fr=x-i0;return arr[i0%N]*(1-fr)+arr[(i0+1)%N]*fr;}

  return {
    CH:CH, OPT:OPT, NCH:NCH, CYCLE:CYCLE, BLOCKS:BLOCKS, DUAL:DUAL,
    blockAt:blockAt, hbo:hbo, hbr:hbr, at:at
  };
})();

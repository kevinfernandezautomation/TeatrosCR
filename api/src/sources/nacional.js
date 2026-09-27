import * as cheerio from 'cheerio';
const URL='https://www.teatronacional.go.cr/';
const months={enero:1,febrero:2,marzo:3,abril:4,mayo:5,junio:6,julio:7,agosto:8,septiembre:9,setiembre:9,octubre:10,noviembre:11,diciembre:12};
export async function teatroNacional(){
 const html=await (await fetch(URL,{headers:{'user-agent':'TeatroCR/1.0 (+directorio cultural)'}})).text(); const $=cheerio.load(html); const text=$('body').text().replace(/\s+/g,' '); const year=new Date().getFullYear(); const out=[];
 // El sitio expone títulos seguidos de día y mes; parser conservador para no inventar funciones.
 const re=/([^.!?]{4,120}?)\s+(\d{1,2})\s+(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Setiembre|Octubre|Noviembre|Diciembre)\b/gi; let m;
 while((m=re.exec(text))){let title=m[1].trim().replace(/^(Calendario completo\s*)+/i,''); if(title.length<4)continue; const mo=months[m[3].toLowerCase()]; const date=`${year}-${String(mo).padStart(2,'0')}-${String(+m[2]).padStart(2,'0')}`; out.push({title,date,time:'',venue:'Teatro Nacional de Costa Rica',province:'San José',price:'',description:'',sourceName:'Teatro Nacional de Costa Rica',sourceUrl:URL,ticketUrl:URL,type:'teatro'});}
 return dedupe(out);
}
function dedupe(a){return [...new Map(a.map(x=>[x.title+'|'+x.date,x])).values()]}

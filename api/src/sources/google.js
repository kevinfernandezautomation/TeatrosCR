export async function googleDiscover(date){
 const key=process.env.GOOGLE_CSE_API_KEY,cx=process.env.GOOGLE_CSE_ID;if(!key||!cx)return [];
 const q=`teatro Costa Rica función ${date} cartelera obra`; const u=new URL('https://www.googleapis.com/customsearch/v1');u.searchParams.set('key',key);u.searchParams.set('cx',cx);u.searchParams.set('q',q);u.searchParams.set('num','10');
 const r=await fetch(u);if(!r.ok)return [];const j=await r.json();return (j.items||[]).map(i=>({title:i.title,date,time:'',venue:'',province:'',price:'',description:i.snippet||'',sourceName:new URL(i.link).hostname,sourceUrl:i.link,ticketUrl:'',type:'teatro',discovered:true}));
}

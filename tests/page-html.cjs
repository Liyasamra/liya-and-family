// The built page loads its app code from assets/ after the cover image. JSDOM tests get the same page with that code inlined.
const fs=require('node:fs');
module.exports=function pageHtml(file='index.html'){
  const html=fs.readFileSync(file,'utf8');
  const m=html.match(/<script>\(function\(\)\{function go\(\)\{var s=document\.createElement\('script'\);s\.src='(assets\/app-[0-9a-f]+\.js)'.*?<\/script>/);
  if(!m)throw new Error('App loader not found in '+file);
  const js=fs.readFileSync(require('node:path').join(require('node:path').dirname(file),m[1]),'utf8').replace(/<\/script/gi,'<\\/script');
  return html.replace(m[0],()=>"<script>if(location.hash.length>1||location.search)document.getElementById('root').textContent=''</script><script>"+js+'</script>');
};

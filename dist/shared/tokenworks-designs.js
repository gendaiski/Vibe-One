
designNames.push('Inference Utility','Open Intelligence');
navigation.push([['discover','Discover'],['products','Products'],['ai-agents','AI Agents'],['my-library/systems','My systems'],['docs','Documentation']],[['discover','Explore'],['ui-components','Components'],['figma-templates','Templates'],['ai-companies','AI Companies'],['my-library/overview','My library']]);
const tokenworksShell=shell;shell=function(){tokenworksShell();if(V>=6){const font=document.createElement('link');font.rel='stylesheet';font.href='https://fonts.bunny.net/css?family=space-grotesk:500,700|ibm-plex-sans:400,500,600|ibm-plex-mono:400,500,600';document.head.append(font);document.body.dataset.theme=V===6?'dark':'light';if($('#theme'))$('#theme').value=document.body.dataset.theme;window.restoreBrandColourTheme?.();}};
const tokenworksSearch=searchView;searchView=function(kind='discover',items=pool(),title){let html=tokenworksSearch(kind,items,title);if(V>=6&&kind==='discover'){html=html.replace(/<h1>[\s\S]*?<\/h1>/,()=>'<h1>'+(V===6?(B.id==='lawyer'?'Legal intelligence.<br>Built to work.':'Intelligence.<br>Ready to build.'):(B.id==='lawyer'?'An open world of<br>legal intelligence.':'Your next company<br>starts with intelligence.'))+'</h1>');html='<div class="tw-direction-label"><span>'+ (V===6?'Inference Utility':'Open Intelligence') +'</span><span>'+esc(B.name)+'</span></div>'+html;}return html;};

/* One accent word across every Inference Utility page, including async details. */
const emphasisShell = shell;
shell = function(){
 emphasisShell();
 if(V !== 6) return;
 const main = document.getElementById('main');
 const emphasize = () => main.querySelectorAll('h1').forEach(heading => {
  if(heading.querySelector('.tw-heading-accent')) return;
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
  const node = nodes.reverse().find(n => /\S/.test(n.textContent));
  if(!node) return;
  const match = node.textContent.match(/^(.*?)(\S+)(\s*)$/s);
  if(!match) return;
  const accent = document.createElement('span'); accent.className = 'tw-heading-accent'; accent.textContent = match[2];
  node.replaceWith(document.createTextNode(match[1]), accent, document.createTextNode(match[3]));
 });
 if(main){new MutationObserver(emphasize).observe(main,{childList:true,subtree:true});emphasize();}
};

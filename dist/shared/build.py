from pathlib import Path
import json,csv,html

ROOT=Path(__file__).resolve().parent.parent
SHARED=ROOT/'shared'
DATE='2026-09-27'

def resource(id,name,mark,type,category,owner,source,license,summary,capabilities,**kw):
    item=dict(id=id,name=name,mark=mark,type=type,category=category,owner=owner,source=source,license=license,
        summary=summary,description=summary,capabilities=capabilities,tags=[category,type],demo=False,
        order=0,ownership='Third-party public repository',commercial='Service and hosting costs may apply',
        status='Not assessed',licenseUrl=source,docs=source,runtime='See original documentation',
        compatibility='Not independently tested',risk='Deployment-dependent; inspect source permissions',
        last_verified_at=DATE,source_status='primary_page_reviewed',security_review_status='not_audited',
        acquisition_status='metadata_only',execution_status='not_executed',source_version_or_commit=None)
    item.update(kw)
    return item

court=resource('courtlistener','CourtListener','CL','Product','Legal research','Free Law Project','https://github.com/freelawproject/courtlistener','AGPL-3.0-or-later',
    'Explore US court materials and the public-source software behind CourtListener.',
    ['US court-data research','CourtListener source architecture','Primary-source links for further review'],
    licenseUrl='https://github.com/freelawproject/courtlistener/blob/main/LICENSE.txt',runtime='Python / Django',
    docs='https://www.courtlistener.com/',description='A legal-data project maintained by Free Law Project. This entry points to its source repository and service; coverage, access limits and service terms should be checked at the original source.')
doc=resource('docassemble','docassemble','da','Product','Document workflows','Jonathan Pyle and contributors','https://github.com/jhpyle/docassemble','MIT',
    'Turn structured interviews into repeatable document-assembly workflows.',
    ['Guided interviews','Document assembly','Python, YAML and Markdown workflows'],
    licenseUrl='https://github.com/jhpyle/docassemble/blob/master/LICENSE.txt',runtime='Python / YAML / Markdown',docs='https://docassemble.org/',
    description='An interview and document-assembly system. Teams can use its source and documentation to evaluate structured intake and document generation; legal content and professional review remain separate responsibilities.')
eye=resource('eyecite','eyecite','ey','Repository','Legal research','Free Law Project and contributors','https://github.com/freelawproject/eyecite','BSD-2-Clause',
    'Extract and organize legal citations from text for a research workflow.',
    ['Citation extraction','Citation aggregation','Text annotation and cleaning'],runtime='Python',
    licenseUrl='https://github.com/freelawproject/eyecite/blob/main/LICENSE',docs='https://freelawproject.github.io/eyecite/',
    description='A citation-processing library focused on patterns found in American legal materials. Extraction is a technical operation; it does not establish the accuracy or legal effect of a cited authority.')
github=resource('github-mcp','GitHub MCP Server','GH','MCP Server','Integrations','GitHub','https://github.com/github/github-mcp-server','MIT',
    'Connect an assistant to repository work with an explicit review of tool permissions.',
    ['Repository and code context','Issue and pull-request workflows','Configurable tool access'],
    runtime='Go / hosted or local deployment',risk='Read and write capabilities; scopes and toolsets must be reviewed',
    licenseUrl='https://github.com/github/github-mcp-server/blob/main/LICENSE',ownership='Provider-owned public repository',
    description='GitHub maintains this MCP server for connecting AI tools with its platform. The available operations can change repository state, so client configuration and credential scope need independent review.')
lang=resource('langflow','Langflow','Lf','Product','Workflows','Langflow contributors','https://github.com/langflow-ai/langflow','MIT',
    'Compose agents and AI workflows through a visual development environment.',
    ['Visual workflow composition','Agent-oriented applications','Provider and component integration'],
    licenseUrl='https://github.com/langflow-ai/langflow/blob/main/LICENSE',runtime='Python / web interface',
    description='A visual environment for developing AI-powered agents and workflows. Its repository is the starting point for evaluating components, deployment requirements and connected-service costs.')
autogen=resource('autogen','AutoGen','AG','Repository','Agents','Microsoft and contributors','https://github.com/microsoft/autogen','MIT code / CC-BY-4.0 docs',
    'Study a multi-agent framework with its current maintenance status in view.',
    ['Multi-agent application patterns','Agent conversation orchestration','Existing-project migration context'],
    status='Maintenance mode',maintenanceNote='The maintainer states that AutoGen is in maintenance mode and directs new projects to Microsoft Agent Framework. Review the migration guidance before adopting it.',
    licenseUrl='https://github.com/microsoft/autogen/blob/main/LICENSE-CODE',runtime='Python / .NET',
    description='A Microsoft-origin framework for agentic applications. It is retained as a reference for existing deployments and architecture research, with a maintenance-mode warning instead of an installation recommendation.')
servers=resource('mcp-reference','MCP reference servers','MC','MCP Server','Infrastructure','Model Context Protocol contributors','https://github.com/modelcontextprotocol/servers','Apache-2.0 new / MIT existing',
    'Review reference server implementations and their permission boundaries.',
    ['Reference server patterns','Tool and resource interfaces','Implementation examples'],
    licenseUrl='https://github.com/modelcontextprotocol/servers/blob/main/LICENSE',
    description='A repository of MCP server implementations and reference material. Licensing distinguishes new contributions from existing code. These examples require deployment and security review before operational use.')
historical=resource('claude-skills-mcp','Claude Skills MCP','CS','MCP Server','Skills','K-Dense AI','https://github.com/K-Dense-AI/claude-skills-mcp','Not independently verified',
    'A historical skill-delivery bridge, retained with a visible deprecation warning.',
    ['Historical architecture reference','Former skill-discovery bridge'],status='Deprecated',
    maintenanceNote='The referenced directory states that the service is no longer hosted or maintained. Do not treat this historical entry as a production recommendation.',
    source_status='directory_notice_reviewed',licenseUrl='',
    description='This historical entry records the deprecation notice found in the reference directory. The directory notice is evidence for the warning, not proof of current compatibility, licence rights or operating status.',
    evidence_url='https://www.claudemarketplace.net/mcp/claude-skills-mcp')

def demo(id,name,mark,type,category,description,owner):
    return resource(id,name,mark,type,category,owner,'','Demo — no licence grant',description,
        ['Illustrative capability structure','Scope and evidence to be reviewed','No live service or installation'],
        demo=True,description=description+' This is a fictional example created solely to demonstrate the directory interface.',
        commercial='Fictional offer — not available to purchase',status='Demo only',runtime='Illustrative only',
        compatibility='Not applicable — fictional',risk='Not assessed — fictional',licenseUrl='',docs='',
        ownership='Fictional demonstration',source_status='fictional',last_verified_at=None)

legal_demo=[demo('matter-map','Matter Map','MM','Product','Practice management','Organize an intake brief into a structured matter overview.','Fictional Matter Map Studio'),
 demo('clause-lens','Clause Lens','CL','Skill','Document workflows','A sample review skill for highlighting clauses that need human attention.','Fictional Clause Lens Lab'),
 demo('evidence-room','Evidence Room','ER','Connector','Integrations','A sample read-only evidence index with source pointers and access notes.','Fictional Evidence Room Team'),
 demo('privacy-desk','Privacy Desk','PD','Workflow Template','Compliance','A demonstration workflow for collecting privacy-review questions.','Fictional Privacy Desk'),
 demo('legal-operations','Legal Operations Studio','LO','Partner Offer','Professional services','A fictional service profile for evaluating intake and document operations.','Fictional Legal Operations Studio'),
 demo('research-practice','Research Practice','RP','Partner Offer','Professional services','A fictional professional-service layout with jurisdiction and scope fields.','Fictional Research Practice')]
ai_demo=[demo('operations-crew','Operations Crew','OC','Agent Package','Agents','A sample agent package for triage, planning and operational follow-through.','Fictional Operations Crew'),
 demo('company-memory','Company Memory Kit','CM','Workflow Template','Company Brain','A sample knowledge package with source-aware retrieval and review notes.','Fictional Memory Works'),
 demo('handoff-skill','Handoff Skill','HS','Skill','Skills','An illustrative skill that turns a work session into a structured handoff.','Fictional Handoff Lab'),
 demo('workspace-bridge','Workspace Bridge','WB','Plugin','Integrations','A sample plugin listing showing permissions, source and compatibility fields.','Fictional Bridge Studio'),
 demo('workflow-partner','Workflow Partners','WP','Partner Offer','Services','A fictional implementation service for evaluating workflow delivery options.','Fictional Workflow Partners'),
 demo('brain-studio','Company Brain Studio','CB','Partner Offer','Company Brain','A fictional knowledge-system service profile with explicit commercial disclosure.','Fictional Brain Studio')]

brands=[dict(id='lawyer',folder='someone-lawyer',other='ai-company-market',name='Someone.lawyer',otherName='AI Company Market',
 logo='someone<span>.lawyer</span>',tagline='A considered legal technology directory',eyebrow='Independent discovery / Legal technology',
 headline='Better tools.<br><em>Sounder judgment.</em>',intro='Find the tools, workflows and expertise behind better legal work. Every resource, with its source in view.',
 editorTitle='The source matters<br>as much as the tool.',editorText='A useful legal workflow begins with evidence. Explore resources with visible ownership, licence information and limits.',
 search='Search legal tools, research, document workflows…',
 disclaimer='Someone.lawyer is an informational directory, not a law firm. Listings are not legal advice and do not establish an attorney-client relationship. Professional and jurisdictional suitability require independent review.',
 extra=[['legal-disclaimer','Legal disclaimer'],['find-a-professional','Find a professional'],['jurisdictions','Jurisdictions'],['legal-workflows','Legal workflows']],data=[court,doc,eye,github]+legal_demo),
 dict(id='ai',folder='ai-company-market',other='someone-lawyer',name='AI Company Market',otherName='Someone.lawyer',logo='AI COMPANY <span>MARKET</span>',
 tagline='The building blocks of an agentic business',eyebrow='Discover / Connect / Build',headline='Build your company.<br><em>One capability at a time.</em>',
 intro='Agents, workflows, skills and infrastructure. Find the building blocks for an AI company—with the context to choose well.',
 editorTitle='A powerful stack.<br>A clear chain of trust.',editorText='Know who built it, what it connects to and where its permissions end. Good infrastructure starts with informed choices.',
 search='Search agents, workflows, skills, MCPs, repositories…',
 disclaimer='Third-party resources belong to their original creators. Listing does not imply endorsement, security auditing, compatibility, ownership or permission to use a resource. Review original licences and service terms.',
 extra=[['ai-company-packages','AI company packages'],['agents','Agents'],['workflows','Workflows'],['integrations','Integrations'],['company-brain','Company Brain'],['mcp-safety','MCP safety']],data=[lang,github,servers,autogen,historical]+ai_demo)]

css=(SHARED/'style.css').read_text(encoding='utf-8')
js=(SHARED/'app.js').read_text(encoding='utf-8')
policy='''# Provenance policy

Each resource keeps its maintainer, primary source, licence evidence, commercial status, review date and maintenance status. Public metadata is not a security audit or endorsement. Summaries are original; third-party source code and media are not redistributed.

Real source samples and fictional demonstrations are separate catalogue modes. Demonstration offers do not represent real partners or transactions. Submissions are local drafts, never automatically published.

Source acquisition status: metadata only. No repositories were cloned or executed. No security scans are claimed. Production ingestion requires documented review, field-level evidence and a refresh policy.
'''
records=[]
for brand in brands:
    out=ROOT/brand['folder'];out.mkdir(parents=True,exist_ok=True);(out/'assets').mkdir(exist_ok=True)
    data=[dict(d,order=i) for i,d in enumerate(brand['data'])]
    config={k:v for k,v in brand.items() if k!='data'}
    payload=json.dumps(data,ensure_ascii=False).replace('</','<\/')
    conf=json.dumps(config,ensure_ascii=False).replace('</','<\/')
    icon='%23315c4a' if brand['id']=='lawyer' else '%23285bdd'
    page=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{brand['name']}</title><meta name="description" content="{html.escape(brand['intro'],quote=True)}"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='{icon}'/%3E%3Cpath d='M8 9h16v3H8zm0 6h12v3H8zm0 6h16v3H8z' fill='white'/%3E%3C/svg%3E"><style>{css}</style></head><body><div id="app"></div><noscript><h1>{brand['name']}</h1><p>Enable JavaScript to use the local directory controls. Source records are also available in data.json.</p></noscript><script>window.BRAND={conf};window.CATALOGUE={payload};</script><script>{js}</script></body></html>'''
    (out/'index.html').write_text(page,encoding='utf-8')
    (out/'data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    (out/'design-tokens.json').write_text(json.dumps(dict(brand=brand['name'],palette='ink / paper / forest' if brand['id']=='lawyer' else 'midnight / slate / electric blue',body_font='Arial',heading_font='Georgia' if brand['id']=='lawyer' else 'Arial',spacing=[4,8,12,16,20,24,32,48,64],radius=[3,5,8],themes=['light','dark','contrast']),indent=2),encoding='utf-8')
    (out/'provenance-policy.md').write_text(policy,encoding='utf-8')
    (out/'research-memo.md').write_text(f"# {brand['name']} research memo\n\nReference-site audit: ../shared/reference-site-audit.md.\n\n{len([d for d in data if not d['demo']])} real source samples and {len([d for d in data if d['demo']])} fictional listings. Reviewed metadata is limited to public source pages; ownership and licence evidence appear on detail pages. Hosting costs, compatibility and security remain unassessed.\n\nOriginal brand direction: "+('editorial typography, source-first legal research and document taxonomy.' if brand['id']=='lawyer' else 'technical typography, capability-first cards and permission-aware metadata.')+'\n',encoding='utf-8')
    records += [dict(brand=brand['name'],id=d['id'],name=d['name'],source=d['source'],owner=d['owner'],licence=d['license'],status=d['status'],source_status=d['source_status'],acquisition='metadata_only' if not d['demo'] else 'fictional',checked=DATE if not d['demo'] else '') for d in data]
with (SHARED/'source-register.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(records[0]));w.writeheader();w.writerows(records)
(SHARED/'source-register.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
print('Built two self-contained HTML websites, brand data and tokens, provenance files and source registers.')

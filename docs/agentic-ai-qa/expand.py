from pathlib import Path
import json
P=Path(__file__).resolve().parent
cats=json.loads((P/'questions-edition-01.json').read_text())
next_id=101
for c in cats:
 for t in c['topics']:
  for q in t['qas']:
   if q['level']=='Mid':q['level']='Intermediate'
def add(t,level,q,a):
 global next_id
 t['qas'].append(dict(id=f'q-{next_id:03}',level=level,question=q,answer=a,origin='Added topic'));next_id+=1
for line in (P/'level-expansion.txt').read_text().splitlines():
 if not line:continue
 ci,ti,level,q,a=line.split('|',4);add(cats[int(ci)]['topics'][int(ti)],level,q,a)
for line in (P/'expansion.txt').read_text().splitlines():
 if line.startswith('# '):
  c=dict(name=line[2:],id=f'category-{len(cats)+1}',topics=[]);cats.append(c)
 elif line.startswith('## '):
  t=dict(name=line[3:],qas=[]);c['topics'].append(t)
 elif '|' in line:
  level,q,a=line.split('|',2);add(t,level,q,a)
allq=[q for c in cats for t in c['topics'] for q in t['qas']]
assert len({q['id'] for q in allq})==len(allq)
assert len({q['question'].casefold() for q in allq})==len(allq)
for c in cats:
 for t in c['topics']:
  assert {q['level'] for q in t['qas']}=={'Basic','Intermediate','Advanced'},(c['name'],t['name'])
assert sum(q['origin']=='Provided images' for q in allq)==72
(P/'questions.json').write_text(json.dumps(cats,indent=2,ensure_ascii=False))
print(f'{len(cats)} categories, {sum(len(c["topics"]) for c in cats)} topics, {len(allq)} Q&As; every topic has all three levels; 100 original IDs preserved.')

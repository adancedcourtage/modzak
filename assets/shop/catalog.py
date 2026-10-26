# Catalogue des photos boutique (s###) : (vues, type, couleur)
import json
T = {  # type: (fr, ar, genre fr m/f/fp, cat, sub, tailles)
 'costume':  ('Costume','بدلة','m','costumes',None,'C'),
 'costume3': ('Costume trois-pièces','بدلة ثلاثية','m','costumes',None,'C'),
 'croise':   ('Costume croisé','بدلة بصفين من الأزرار','m','costumes',None,'C'),
 'blazer':   ('Blazer','سترة بليزر','m','vestes','blazers','C'),
 'blazercr': ('Blazer croisé','سترة بليزر مزدوجة','m','vestes','blazers','C'),
 'cuir':     ('Blouson en cuir','جاكيت جلد','m','vestes','cuir','L'),
 'cuirchem': ('Surchemise en cuir','جاكيت جلد بقصة قميص','f','vestes','cuir','L'),
 'blouson':  ('Blouson','جاكيت','m','vestes','blousons','L'),
 'chemise':  ('Chemise','قميص','f','chemises','unies','L'),
 'chemiseR': ('Chemise rayée','قميص مخطط','f','chemises','rayees','L'),
 'chemiseC': ('Chemise à carreaux','قميص مربعات','f','chemises','carreaux','L'),
 'pull':     ('Pull col V','كنزة بياقة V','m','mailles','pulls','L'),
 'pullR':    ('Pull rayé','كنزة مخططة','m','mailles','pulls','L'),
 'polo':     ('Polo en maille','بولو محبوك','m','mailles','polos','L'),
 'cardigan': ('Cardigan','كارديغان','m','mailles','cardigans','L'),
 'cardiganZ':('Cardigan zippé','كارديغان بسحاب','m','mailles','cardigans','L'),
 'mocassin': ('Mocassins en daim','موكاسان شمواه','mp','chaussures','mocassins','S'),
 'mocassinC':('Mocassins en cuir','موكاسان جلد','mp','chaussures','mocassins','S'),
 'basket':   ('Baskets en cuir','حذاء رياضي جلد','fp','chaussures','baskets','S'),
 'basketD':  ('Baskets en daim','حذاء رياضي شمواه','fp','chaussures','baskets','S'),
 'mule':     ('Mules en daim','شبشب شمواه','fp','chaussures','mules','S'),
 'derby':    ('Derbies en cuir','حذاء ديربي جلد','mp','chaussures','habillees','S'),
 'boucles':  ('Chaussures à double boucle','حذاء بإبزيمين','fp','chaussures','habillees','S'),
}
# couleur: (m, f, mp, fp, ar)
def inv(x, ar): return (x,x,x,x,ar)
C = {
 'noir':('noir','noire','noirs','noires','أسود'), 'blanc':('blanc','blanche','blancs','blanches','أبيض'),
 'gris':('gris','grise','gris','grises','رمادي'), 'vert':('vert','verte','verts','vertes','أخضر'),
 'marine':inv('bleu marine','أزرق كحلي'), 'ciel':inv('bleu ciel','أزرق سماوي'), 'roi':inv('bleu roi','أزرق ملكي'),
 'jean':inv('bleu jean','أزرق جينز'), 'bleu':('bleu','bleue','bleus','bleues','أزرق'), 'glacier':inv('bleu glacier','أزرق فاتح'),
 'grisclair':inv('gris clair','رمادي فاتح'), 'anthracite':inv('anthracite','رمادي داكن'), 'perle':inv('gris perle','رمادي لؤلؤي'),
 'beige':('beige','beige','beiges','beiges','بيج'), 'ecru':('écru','écrue','écrus','écrues','أبيض عاجي'), 'camel':inv('camel','جملي'), 'taupe':inv('taupe','توب'),
 'kaki':inv('kaki','كاكي'), 'olive':inv('vert olive','زيتوني'), 'sapin':inv('vert sapin','أخضر داكن'), 'eau':inv("vert d’eau",'أخضر مائي'),
 'marron':inv('marron','بني'), 'chocolat':inv('chocolat','بني شوكولا'), 'cognac':inv('cognac','كونياك'),
 'bordeaux':inv('bordeaux','خمري'), 'prune':inv('prune','برقوقي'), 'lavande':inv('lavande','لافندر'), 'lilas':inv('lilas','ليلكي'),
 'rose':inv('rose','وردي'), 'rosepale':inv('rose pâle','وردي فاتح'), 'bleugris':inv('bleu-gris','أزرق رمادي'),
 'marinebd':inv('bleu marine à bande écrue','كحلي بشريط عاجي'), 'marinestr':inv('bleu marine et écru','كحلي وعاجي'),
 'noirbeige':inv('noir et beige','أسود وبيج'), 'bordeauxb':inv('bordeaux à bande crème','خمري بشريط كريمي'),
 'bicolore':inv('beige et taupe','بيج وتوب'), 'marinegris':inv('bleu marine et gris','كحلي ورمادي'),
 'carreauxbleu':inv('carreaux bleus','مربعات زرقاء'), 'carreauxgris':inv('à carreaux gris','بمربعات رمادية'),
 'carreauxvert':inv('à carreaux vert-gris','بمربعات خضراء رمادية'), 'rayenoir':inv('à fines rayures','بخطوط رفيعة'),
}
P = [
 # costumes
 ('s163 s001 s131','croise','olive'), ('s012 s019','costume3','carreauxgris'), ('s024 s206','croise','noir'),
 ('s054 s223 s151','croise','rayenoir'), ('s052 s222','croise','marine'), ('s120','croise','marine'), ('s028','costume','marine'),
 ('s171 s085 s168','costume3','grisclair'), ('s202 s087','croise','marron'), ('s121 s200 s129','costume','grisclair'),
 ('s122 s117 s142 s175','costume3','bleu'), ('s191 s137','costume3','anthracite'),
 # vestes
 ('s021','blazer','gris'), ('s058','blazer','camel'), ('s103','blazer','prune'), ('s197 s104','blazer','carreauxvert'),
 ('s128','blazer','grisclair'), ('s185','blazercr','camel'), ('s188','blazer','beige'), ('s189','blazer','bordeaux'),
 ('s213','blazer','marine'), ('s225','blazer','bleugris'),
 ('s060 s025 s156 s166','cuir','noir'), ('s119 s153','cuirchem','noir'), ('s034 s105 s184 s096','cuir','marron'),
 ('s111','cuirchem','marron'), ('s099 s205','cuir','marine'), ('s040','blouson','beige'), ('s220','blouson','marron'),
 # mailles
 ('s018','pullR','bordeaux'), ('s042','pullR','bordeauxb'), ('s080','pullR','marinestr'), ('s159','pullR','noirbeige'),
 ('s130','pullR','marron'), ('s143','polo','marinebd'), ('s035','pull','marron'), ('s182','pull','blanc'),
 ('s106 s023 s115','polo','marine'), ('s069','polo','marine'), ('s050','polo','noir'), ('s212','polo','noir'),
 ('s150','polo','marron'), ('s165','polo','camel'),
 ('s020 s195','cardigan','beige'), ('s051','cardigan','noir'), ('s139','cardigan','taupe'), ('s211','cardigan','marron'),
 ('s217','cardigan','noir'), ('s076 s181','cardiganZ','noir'), ('s098','cardiganZ','beige'), ('s214','cardigan','noir'),
 # chemises unies
 ('s006 s045','chemise','beige'), ('s009','chemise','grisclair'), ('s011 s067','chemise','roi'), ('s013','chemise','jean'),
 ('s017','chemise','blanc'), ('s026','chemise','ciel'), ('s033','chemise','ecru'), ('s038','chemise','eau'),
 ('s039','chemise','jean'), ('s043','chemise','ciel'), ('s046','chemise','gris'), ('s055','chemise','bleugris'),
 ('s057','chemise','gris'), ('s061','chemise','blanc'), ('s062','chemise','beige'), ('s063','chemise','ciel'),
 ('s065','chemise','gris'), ('s071','chemise','jean'), ('s073','chemise','anthracite'), ('s074','chemise','ciel'),
 ('s075','chemise','anthracite'), ('s077','chemise','blanc'), ('s079','chemise','noir'), ('s083','chemise','lilas'),
 ('s084','chemise','ciel'), ('s086','chemise','jean'), ('s088','chemise','blanc'), ('s089 s186','chemise','chocolat'),
 ('s090','chemise','blanc'), ('s091','chemise','perle'), ('s097','chemise','ciel'), ('s110','chemise','rosepale'),
 ('s114','chemise','lilas'), ('s118','chemise','ciel'), ('s126 s123','chemise','rose'), ('s135 s136','chemise','lilas'),
 ('s145','chemise','ciel'), ('s146','chemise','gris'), ('s160','chemise','beige'), ('s162','chemise','eau'),
 ('s167','chemise','bleu'), ('s174','chemise','ciel'), ('s178','chemise','blanc'), ('s183','chemise','beige'),
 ('s187','chemise','glacier'), ('s192','chemise','ciel'), ('s194','chemise','ciel'), ('s198','chemise','ecru'),
 ('s199','chemise','bleu'), ('s208','chemise','blanc'), ('s215','chemise','ciel'), ('s218','chemise','gris'),
 # chemises rayées / carreaux
 ('s044','chemiseR','marine'), ('s059','chemiseR','beige'), ('s066','chemiseR','bleu'), ('s082','chemiseR','noir'),
 ('s108','chemiseR','marine'), ('s109','chemiseR','bleu'), ('s113','chemiseR','ciel'), ('s148','chemiseR','ciel'),
 ('s157','chemiseR','ciel'), ('s169','chemiseR','beige'), ('s173','chemiseR','bleu'), ('s177','chemiseR','marine'),
 ('s216','chemiseR','gris'),
 ('s008','chemiseC','bleu'), ('s027','chemiseC','bleu'), ('s048','chemiseC','ciel'), ('s102 s203','chemiseC','bleugris'),
 ('s127','chemiseC','bleu'),
 # chaussures
 ('s207 s002 s032','mocassin','gris'), ('s081 s004 s196','mocassin','chocolat'), ('s007 s155 s221','mocassin','olive'),
 ('s037 s010 s164','mocassin','lavande'), ('s078 s022','mocassin','noir'), ('s172 s030 s152','mocassin','beige'),
 ('s133 s070 s161','mocassin','cognac'), ('s147 s053 s093','mocassinC','marron'),
 ('s201 s005 s204','basket','marine'), ('s064 s014 s041','basket','sapin'), ('s016 s036','basket','chocolat'),
 ('s068 s029','basket','marinegris'), ('s144 s031 s190','basket','noir'), ('s056 s095 s179','basket','bicolore'),
 ('s154 s100','basket','cognac'), ('s112 s193','basket','cognac'), ('s092','basketD','cognac'), ('s101','basket','marron'),
 ('s158','basketD','cognac'), ('s141','basket','cognac'), ('s176 s170 s209','basket','noir'), ('s224','basket','marron'),
 ('s094','basket','chocolat'),
 ('s219 s003 s047','mule','marine'), ('s149 s015 s132','mule','taupe'), ('s049 s107 s138','mule','kaki'),
 ('s134 s116 s140','mule','noir'),
 ('s125 s124 s180','derby','cognac'), ('s072 s210','boucles','marron'),
]
SZ = {'C':[46,48,50,52,54,56], 'L':['S','M','L','XL','XXL'], 'S':[39,40,41,42,43,44,45]}
GI = {'m':0,'f':1,'mp':2,'fp':3}
used=set(); out=[]
for views,t,c in P:
    v=views.split(); fr,ar,g,cat,sub,sz=T[t]; col=C[c]
    for x in v: assert x not in used, x; used.add(x)
    out.append({'id':v[0],'cat':cat,'sub':sub,'gal':v if len(v)>1 else None,
      'fr':f"{fr} {col[GI[g]]}", 'ar':(f"{ar} {col[4]}" if col[4].startswith(('بمربعات','بخطوط')) else f"{ar} بلون {col[4]}"), 'color':col[0],
      'dfr':'Disponible en boutique à Mohammedia. Tailles et prix sur WhatsApp.',
      'dar':'متوفر في متجرنا بالمحمدية. المقاسات والثمن عبر واتساب.','sizes':SZ[sz]})
allids={f's{i:03d}' for i in range(1,226)}
print('produits',len(out),'photos utilisées',len(used),'non utilisées',sorted(allids-used))
js='/* Catalogue boutique (photos du client) — généré par assets/shop/catalog.py */\nwindow.MZ_SHOP = '+json.dumps([{k:v for k,v in p.items() if v is not None} for p in out],ensure_ascii=False,separators=(',',':'))+';\n'
open('site/js/products.js','w').write(js)
from collections import Counter; print(Counter((p['cat'],p['sub']) for p in out))

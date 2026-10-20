"""Build deterministic, lesson-specific SVG bodies. Never changes lesson content."""
import json,html
from pathlib import Path
out={}; P='#8651ab';B='#62add6';G='#76b895';Y='#efbf53';I='#53376c';C='#fff8eb'
def text(x,y,s,size=18,fill=I):return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="middle" font-family="Ewket Ethiopic,system-ui,sans-serif">{html.escape(str(s))}</text>'
def rect(x,y,w,h,fill=C,stroke=I,rx=0,attr=''):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="1.5" {attr}/>'
def circle(x,y,r=7,fill=B,attr=''):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" {attr}/>'
def path(d,stroke=I,width=2,fill='none',attr=''):return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" {attr}/>'
def group(s,x=0,y=0,scale=1):return f'<g transform="translate({x} {y}) scale({scale})">{s}</g>'
def arrow(x,y,w=25):return path(f'M{x} {y}h{w}m-7-5 7 5-7 5',P,3)
def dots(n,x=20,y=30,cols=5,gap=17,color=B):return ''.join(circle(x+i%cols*gap,y+i//cols*gap,5,color,'data-counter="1"') for i in range(n))
def blocks(t,o,x=15,y=20,scale=1):
 s=''.join(rect(x+i*14,y,10,80,G,attr='data-ten="1"')+''.join(path(f'M{x+i*14} {y+j*8}h10','#52785e',1) for j in range(1,10)) for i in range(t))
 return s+''.join(rect(x+t*14+13+i%5*11,y+14+i//5*11,8,8,B,attr='data-one="1"') for i in range(o))
def bars(parts,shade,x,y,w=150,h=21):return ''.join(rect(x+i*w/parts,y,w/parts,h,P if i<shade else '#eee3f7',attr=f'data-part="1" data-shaded="{str(i<shade).lower()}"') for i in range(parts))
def frame(n,x=10,y=20):return ''.join(rect(x+i%5*18,y+i//5*18,18,18,'#fff',P)+(circle(x+i%5*18+9,y+i//5*18+9,5,B) if i<n else '') for i in range(10))
def apple(x,y):return path(f'M{x} {y}c-17-10-22 13-11 25 6 7 10 3 14 3 6 2 10 1 14-7 8-19-2-28-17-21', '#a75c55',1.5,'#d88376')+path(f'M{x} {y}q0-12 8-14',G,3)
def bird(x,y,dim=False):return f'<g opacity="{.4 if dim else 1}" data-bird="1">'+circle(x,y,9,B)+circle(x+8,y-8,6,B)+path(f'M{x+13} {y-8}l6 3-6 2',Y,1,Y)+path(f'M{x-6} {y-1}q9-7 12 4',P,2)+'</g>'
def add(id,label,body):out[id]={'label':label,'body':body}
add('pre-math','Three apples for counting.', ''.join(apple(x,43) for x in [64,128,192]))
add('pre-math-2','Two red socks grouped together, with one blue sock apart.',rect(20,15,125,93,'#f7e7e2','none',15)+''.join(path(f'M{x} 30h15v38l-18 13-11-15 14-10z',I,1.5,col) for x,col in [(55,'#d88376'),(100,'#d88376'),(194,B)]))
add('pre-math-3','Clap, tap, clap, tap.', ''.join(rect(10+i*62,19,56,74,'#f0e5f7','none',8)+text(38+i*62,66,s,15) for i,s in enumerate(['Clap','Tap','Clap','Tap'])))
add('pre-math-4','A circle, a square with four corners, and a triangle.',circle(49,58,25,Y)+rect(104,33,50,50,B)+path('M208 29l30 54h-60z',I,1.5,G))
add('k-math','A ten-frame with six filled spaces and four empty spaces.',group(frame(6),30,10,1.5))
add('k-math-2','Four blocks beside six blocks.',dots(4,27,35,cols=2,gap=21)+text(47,100,'4')+dots(6,175,35,cols=3,gap=21,color=Y)+text(197,100,'6'))
add('k-math-3','Two apples plus three apples make five.',group(''.join(apple(x,35) for x in [25,70]),0,0,.8)+text(91,54,'+')+group(''.join(apple(x,35) for x in [25,70,115]),110,0,.8)+text(130,106,'2 + 3 = 5'))
add('k-math-4','Five birds: two fly away and three stay on the fence.',path('M25 76h125','#ac8058',6)+''.join(bird(x,58) for x in [40,80,120])+''.join(bird(x,25) for x in [185,225])+arrow(163,49,49)+text(130,108,'5 − 2 = 3'))
add('1-math','Two tens and four ones make twenty-four.',blocks(2,4,63,10)+text(130,110,'24'))
add('1-math-2','Eight plus five make ten and three.',frame(8,12,17)+dots(5,125,30,cols=5,gap=18,color=Y)+arrow(105,79)+text(172,88,'10 + 3 = 13',17))
add('1-math-3','Fourteen take away four leaves ten.',blocks(1,4,30,10)+arrow(140,55)+blocks(1,0,209,10)+text(130,110,'14 − 4 = 10'))
add('1-math-4','A pencil is six equal block units long.',path('M36 32h180l12 7-12 7H36z',I,1.5,Y)+''.join(rect(36+i*32,58,32,27,G,attr='data-unit="1"') for i in range(6))+path('M36 23v68m192-68v68',P,1)+text(130,110,'6 equal units',15))
add('2-math','Three tens and twelve ones regroup as four tens and two ones.',group(blocks(3,12,7,5),0,3,.85)+arrow(133,51,20)+group(blocks(4,2,180,5),15,3,.85)+text(130,110,'27 + 15 = 42'))
add('2-math-2','Forty-two trades one ten, then subtracts seventeen to leave twenty-five.',group(blocks(3,12,8,5),0,0,.8)+arrow(130,51)+group(blocks(2,5,215,5),0,0,.8)+text(130,110,'42 − 17 = 25'))
add('2-math-3','Two dimes and one nickel total twenty-five cents.', ''.join(circle(x,49,r,'#d9dce5','data-coin="1"')+text(x,55,v,18) for x,r,v in [(53,24,'10¢'),(127,24,'10¢'),(204,29,'5¢')])+text(130,110,'10 + 10 + 5 = 25¢',16))
def star(x,y):return path(f'M{x} {y-8}l2 5h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z',Y,1,Y,attr='data-star="1"')
add('2-math-4','Apples have four votes, bananas have two; one star means one vote.',text(43,40,'Apples',14)+text(43,75,'Bananas',14)+''.join(star(96+i*35,35) for i in range(4))+''.join(star(96+i*35,70) for i in range(2))+text(130,110,'★ = 1 vote',14))
add('3-math','Four bowls with exactly three counters each.', ''.join(path(f'M{x-25} 70q25 32 50 0z','#aa7b4f',2,'#e7bf8b')+''.join(circle(x+(j-1)*15,57,6,[B,Y,'#d88376'][j],'data-counter="1"') for j in range(3)) for x in [35,98,161,224]))
add('3-math-2','Three rows of four dots make twelve.',dots(12,58,22,cols=4,gap=31)+text(130,115,'3 × 4 = 12',16))
add('3-math-3','Twelve counters shared among three bowls, four in each.', ''.join(path(f'M{x-29} 70q29 35 58 0z','#aa7b4f',2,'#e7bf8b')+dots(4,x-13,36,2,24) for x in [43,130,217])+text(130,116,'12 ÷ 3 = 4',15))
add('3-math-4','Three rows of four equal square units make twelve square units.', ''.join(rect(82+i%4*24,14+i//4*24,24,24,G,attr='data-square-unit="1"') for i in range(12))+text(130,113,'12 square units',16))
add('4-math','One half equals two fourths, using equal-sized wholes.',bars(2,1,55,18)+bars(4,2,55,65)+text(130,116,'1/2 = 2/4',16))
add('4-math-2','Two thirds is less than three fourths; the wholes are equal.',bars(3,2,55,16)+bars(4,3,55,62)+text(130,114,'2/3 < 3/4',17))
add('4-math-3','Four groups of twenty-three make ninety-two.', ''.join(group(blocks(2,3,0,0),12+i*63,8,.6) for i in range(4))+text(130,108,'23 × 4 = 92',18))
add('4-math-4','A six-by-four centimeter rectangle has a twenty-centimeter perimeter.',rect(70,25,120,80,'none',P)+text(130,16,'6 cm',13)+text(130,121,'6 cm',13)+text(42,68,'4 cm',13)+text(218,68,'4 cm',13))
add('5-math','One half plus one fourth equals three fourths.',bars(2,1,13,26,62)+text(88,44,'+')+bars(4,1,102,26,62)+text(177,44,'=')+bars(4,3,192,26,62)+text(130,100,'1/2 + 1/4 = 3/4',17))
add('5-math-2','Three groups of two fifths make one and one fifth.', ''.join(bars(5,2,10+i*85,21,75,22) for i in range(3))+bars(5,5,50,73,75,22)+bars(5,1,135,73,75,22)+text(130,119,'3 × 2/5 = 1 1/5',14))
add('5-math-3','Four tenths times three tenths shades twelve of one hundred squares.', ''.join(rect(80+c*9,6+r*9,9,9,P if c<4 and r<3 else B if c<4 else Y if r<3 else '#fff', '#cabbd6',attr=f'data-hundredth="1" data-overlap="{str(c<4 and r<3).lower()}"') for r in range(10) for c in range(10))+text(130,116,'0.4 × 0.3 = 0.12',15))
# Four explicitly separated 3-by-2 layers; every unit remains visible.
add('5-math-4','Four layers of three by two unit cubes make twenty-four cubic units.', ''.join(rect(13+layer*63+c*17,26+r*17,17,17,G,attr='data-volume-unit="1"') for layer in range(4) for r in range(2) for c in range(3))+''.join(text(38+layer*63,83,f'Layer {layer+1}',11) for layer in range(4))+text(130,112,'3 × 2 × 4 = 24',17))
add('6-math','Four notebooks cost twelve dollars; one costs three dollars.', ''.join(rect(23+i*52,22,34,53,'#d9c1e8',P,3)+path(f'M{29+i*52} 22v53',P,2) for i in range(4))+text(130,107,'$12 ÷ 4 = $3 each',17))
add('6-math-2','Negative five lies left of negative two; positive five is opposite negative five.',path('M15 58h230')+''.join(path(f'M{20+i*22} 53v10')+text(20+i*22,83,n,11) for i,n in enumerate(range(-5,6)))+''.join(circle(20+i*22,42,6,col) for i,col in [(0,P),(3,B),(10,Y)]))
add('6-math-3','Three groups of four plus two counters make fourteen.', ''.join(rect(8+i*67,14,62,64,'#f2e6fa','none',8)+dots(4,25+i*67,33,2,23) for i in range(3))+text(219,50,'+')+dots(2,245,27,1,25,color=Y)+text(130,112,'3 × 4 + 2 = 14',17))
add('6-math-4','Data at two, three, four, five and sixteen have median four and mean six.',path('M12 65h235')+''.join(path(f'M{17+i*14} 61v8')+text(17+i*14,85,i,8) for i in range(17))+''.join(circle(17+i*14,49,5,B) for i in [2,3,4,5,16])+text(130,112,'Median 4 · Mean 6',16))
# Script exports exactly the intended model and quantitative labels.
# Targeted science and geography covers: diagram labels are real text, never generated lettering.
def leaf(x,y):return path(f'M{x} {y}q-18-25-26-12 6 20 26 12m0 0q20-25 28-11-8 17-28 11',G,2,G)
def plant(x,y):return path(f'M{x} {y}v-36',G,4)+leaf(x,y-15)
def mushroom(x,y):return rect(x-3,y,6,17,'#dec7a8','none')+path(f'M{x-15} {y}q15-27 30 0z',I,1.5,'#c58ca5')
add('2-science-earthchange','A beaver dam slows a stream and creates a pond upstream.',path('M0 45q80 45 165 9t95 0v65H0z',B,1,B)+''.join(path(f'M{130+i*7} 40l-17 48','#a07651',7) for i in range(8))+path('M10 74q35-12 68 0', '#caedf8',2)+circle(76,46,19,'#a67b58')+circle(91,31,11,'#a67b58')+circle(94,28,2,I)+path('M61 51q-37 7-29 22 29 1 36-16',I,1,'#94704f')+text(63,111,'Pond',13)+text(186,111,'Dam',13))
add('2-science-fossils','A three-lobed segmented trilobite fossil in a rock slab.',path('M41 11l163 8 28 76-162 17-40-46z','#9a8f89',2,'#ddd1bb')+path('M92 80q-22-65 34-65 55 0 35 65l-35 23z',I,2,'#a8a094')+''.join(path(f'M92 {35+i*8}q33-9 68 0',I,1) for i in range(6))+path('M113 24v67m24-67v67',I,2))
add('3-science-life','A parent dog and two puppies share features but differ in coat patterns.', ''.join(group(path('M10 35q40-50 80 0v53H10z',I,1.5,'#c69a6f')+path('M10 33Q-6 15 2 70l13-9M88 33q21-17 9 38l-13-9',I,1,'#966847')+circle(35,44,3,I)+circle(65,44,3,I)+path('M44 60h12l-6 8z',I,1,I)+(circle(31,58,13,'#f7e5ca') if i==1 else circle(72,63,12,'#895e45') if i==2 else ''),x,16 if i==0 else 42,scale) for i,(x,scale) in enumerate([(13,.9),(118,.58),(189,.58)])))
add('4-science-fossils','A shaggy mammoth and a modern elephant share trunks and tusks.', ''.join(group(path('M8 63q-5-40 39-38 45 0 43 34l-6 40H70l-3-30H28l-3 30H10z',I,1.5,col)+path('M82 40q27 15 17 58',I,12,col)+path('M78 61q31 26 33 0','#fff5db',5)+circle(79,43,2,I)+( ''.join(path(f'M{x} 43l-2 14', '#80624d',2) for x in range(15,70,9)) if i==0 else ''),10+i*135,1,.95) for i,col in enumerate(['#a28267','#a5a9bb'])))
add('4-science-energy','A whole cracker and all its pieces balance equally.',path('M130 33v73m-37 0h74M35 43h190M51 43l-24 40h48zM208 43l-24 40h48z',P,3)+rect(39,56,24,24,Y)+''.join(rect(193+(i%2)*13,57+(i//2)*13,12,12,Y) for i in range(4))+text(130,24,'Same mass',16))
add('5-science-space','Eight planets in order from the Sun; Mercury first, Jupiter largest, Saturn ringed. Not to scale.',text(130,12,'Planets in order from the Sun',10)+''.join(circle(x,y,r,col)+text(x,y+24,n,11) for x,y,r,col,n in [(40,28,4,'#baaaa0','Mercury'),(100,28,7,'#d9b28a','Venus'),(160,28,7,B,'Earth'),(220,28,5,'#c57e65','Mars'),(40,86,18,'#d6b191','Jupiter'),(100,86,13,Y,'Saturn'),(160,86,9,'#92c7c5','Uranus'),(220,86,9,'#728bc2','Neptune')])+f'<ellipse cx="100" cy="86" rx="23" ry="5" fill="none" stroke="{I}" stroke-width="2" transform="rotate(-18 100 86)"/>'+text(130,65,'Not to scale',9))
add('5-science-cycles','Parallel tilted Earth axes show the Northern Hemisphere toward the Sun in June and away in December.',circle(130,53,20,Y)+''.join(circle(x,53,23,B)+path(f'M{x-15} 79l30-52',P,3)+text(x+19,25,'N',10)+path(f'M{x-5} 35q-19 8-4 27 7-3 15-10',G,2,G)+text(x,105,label,14) for x,label in [(42,'June'),(218,'December')])+text(130,122,'Northern Hemisphere',11))
add('5-science-3','Fungi gradually break down a fallen log and return material to soil.', ''.join(rect(14+i*85,43,65,35,'#a8815b',I,6)+mushroom(38+i*85,40)+(mushroom(64+i*85,57) if i>0 else '')+( ''.join(circle(185+j*10,90,3,'#a8815b') for j in range(6)) if i==2 else '') for i in range(3))+arrow(80,25,15)+arrow(165,25,15)+text(130,120,'Over time',13))
add('6-science-cells','A simplified magnified model shows cells dividing to fill a small gap.', ''.join(rect(12+panel*88,18,77,75,'#f4dfd9','none',6)+''.join(circle(23+panel*88+c*20,33+r*24,9,'#d5a2a1',attr='data-cell="1"')+circle(23+panel*88+c*20,33+r*24,3,P) for r in range(2) for c in range(3) if not(panel==0 and c==1) and not(panel==1 and r==0 and c==1)) for panel in range(3))+text(130,117,'Magnified cell model',13))
add('6-science-motion','A roller-coaster cart at the top has stored energy; descending it gains motion.',path('M8 89Q50-15 100 30t145 66',P,4)+''.join(group(rect(0,0,31,16,Y,P,4)+circle(7,20,4,I)+circle(24,20,4,I),x,y) for x,y in [(64,10),(177,67)])+arrow(142,43,35)+text(62,108,'Top of hill',12)+text(204,118,'Downhill',12))
add('3-science-matter','Ice, liquid water and a symbolic model of invisible water vapor.',rect(15,35,40,40,'#c0e1ed')+path('M79 33h49l-6 52H85z',I,2,'#e8f4f8')+rect(85,57,36,24,B,'none')+rect(158,18,90,69,'#f8f2fa')+dots(6,172,30,3,25)+text(36,109,'Solid',12)+text(104,109,'Liquid',12)+text(201,109,'Gas model',12))
add('6-science-atoms','Particle models show solid, liquid and gas with six particles in each.', ''.join(rect(8+panel*85,10,76,80,'#f4edf8')+''.join(circle(0,0,5,B,attr='data-particle="1"') if False else circle(8+panel*85+x,10+y,5,B,attr='data-particle="1"') for x,y in ([(20+c*14,40+r*14) for r in range(2) for c in range(3)] if panel==0 else [(17,45),(32,38),(46,54),(22,60),(40,68),(57,43)] if panel==1 else [(12,12),(57,16),(36,35),(14,63),(61,64),(60,40)])) +text(46+panel*85,113,['Solid','Liquid','Gas model'][panel],12) for panel in range(3)))
# A precise map grid, with the pond at C2 and playground northeast at D1.
add('2-social-2','A map grid has a pond at C2 and playground northeast at D1.', ''.join(rect(34+c*43,24+r*31,43,31,'#f2f7ed','#b5c8b1') for r in range(2) for c in range(4))+''.join(text(55+c*43,16,ch,13) for c,ch in enumerate('ABCD'))+text(22,45,'1',13)+text(22,76,'2',13)+circle(143,70,10,B)+path('M176 42h21m-18 0v9m15-9v9',P,4)+path('M227 79V31m0 0-5 8m5-8 5 8',P,2)+text(227,21,'N',13))
add('3-social-2','Three equal map inches represent thirty miles.',circle(39,32,6,P)+circle(207,32,6,P)+path('M39 32h168',P,2)+''.join(path(f'M{39+i*56} 46v13') for i in range(4))+text(122,80,'3 inches = 30 miles',15)+path('M45 98h56m-56-4v8m56-8v8',P,2)+text(171,106,'1 inch = 10 miles',11))
# Geographic coordinates are a coordinate model rather than a generated, distorted map.
add('6-social-2','Addis Ababa is near 9 degrees north and 39 degrees east on this coordinate model.', ''.join(path(f'M{26+i*38} 12v80','#d1c1de',1)+text(26+i*38,101,f'{i*10}° E',9) for i in range(6))+''.join(path(f'M26 {80-i*20}h190','#d1c1de',1)+text(12,84-i*20,f'{i*5}°',9) for i in range(4))+circle(26+39*3.8,80-9*4,5,P)+text(157,26,'Addis Ababa',13)+text(130,122,'9° N, 39° E · Coordinate model',11))
add('6-social-4','Winter has more customers and fewer snow shovels; summer has fewer customers and more shovels.', ''.join(rect(13+panel*130,27,104,62,'#eee3f7',P,5)+rect(20+panel*130,13,90,15,Y,P,2)+''.join(circle(28+panel*130+i*22,76,6,P) for i in range(4 if panel==0 else 1))+''.join(path(f'M{76+panel*130+i*10} 33v26m-4-6h8v9h-8z',I,2) for i in range(1 if panel==0 else 4))+text(65+panel*130,115,'Winter' if panel==0 else 'Summer',14) for panel in range(2)))
# Official Ohio OGRIP land boundary, simplified by its service to 0.01 degrees.
geo=json.loads(Path('content-src/ohio-boundary.geojson').read_text())['features'][0]['geometry']
rings=geo['coordinates'] if geo['type']=='Polygon' else [ring for polygon in geo['coordinates'] for ring in polygon]
ring=max(rings,key=len);minx=min(p[0] for p in ring);maxx=max(p[0] for p in ring);miny=min(p[1] for p in ring);maxy=max(p[1] for p in ring)
def xy(lon,lat):return (87+(lon-minx)/(maxx-minx)*94,14+(maxy-lat)/(maxy-miny)*94)
coords=[xy(*p[:2]) for p in ring];outline='M'+'L'.join(f'{x:.2f} {y:.2f}' for x,y in coords)+'Z'
body=path(outline,P,1.5,'#e8f1db')+text(130,11,'Lake Erie',10, B)+path('M225 43V15m0 0-4 7m4-7 4 7',P,2)+text(225,11,'N',10)
for name,lon,lat,tx,ty in [('Cleveland',-81.6944,41.4993,207,36),('Columbus',-82.9988,39.9612,209,74),('Cincinnati',-84.512,39.1031,42,96)]:
 x,y=xy(lon,lat);body+=circle(x,y,2.5,P)+path(f'M{x} {y}L{tx-16 if tx>130 else tx+20} {ty-4}',P,1)+text(tx,ty,name,9)
body+=text(194,115,'Ohio River',10,B)+path('M169 103l12 8',B,1.5)
add('4-social-2','Ohio map: Cleveland near Lake Erie, Columbus near the center, and Cincinnati in the southwest by the Ohio River.',body)

add('2-reading-3','A nonfiction page with a Bee Homes heading, hive picture and explanatory caption.',rect(36,4,188,115,'#fff','#cbb6dd',5)+text(130,24,'Bee Homes',17)+path('M95 72q-2-43 35-38 33 0 35 38z',I,1.5,Y)+''.join(path(f'M{100-i*2} {44+i*8}h{60+i*4}',I,1) for i in range(3))+circle(131,65,5,I)+text(130,96,'Bees live together',12)+text(130,111,'in this hive.',12))
Path('lib/audited-diagrams.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')

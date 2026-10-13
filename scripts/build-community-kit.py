"""Build printable community materials. Requires reportlab (pip install reportlab)."""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("KitSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("KitSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("KitSans", normal="KitSans", bold="KitSans-Bold")
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.graphics.barcode.qr import QrCodeWidget

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/community-kit';OUT.mkdir(parents=True,exist_ok=True)
URL='https://liyasamra.github.io/liya-and-family/'
INK='#39314e';PURPLE='#675090';MUTED='#655d72';CREAM='#fffaf2'
qr=QrCodeWidget(URL);qr.qr.make();matrix=qr.qr.modules;n=len(matrix);side=n+8
rects=''.join(f'<rect x="{x+4}" y="{y+4}" width="1" height="1"/>' for y,row in enumerate(matrix) for x,on in enumerate(row) if on)
(OUT/'learning-qr.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}"><title>Liya and Family learning website QR code</title><rect width="{side}" height="{side}" fill="white"/><g fill="black">{rects}</g></svg>')

def para(c,text,x,y,w,size=11,color=INK,leading=None):
 style=ParagraphStyle('p',fontName='KitSans',fontSize=size,leading=leading or size*1.35,textColor=HexColor(color))
 p=Paragraph(text,style);_,h=p.wrap(w,1000);p.drawOn(c,x,y-h);return y-h

def page(name,kicker,title,subtitle):
 c=canvas.Canvas(str(OUT/name),pagesize=(612,792));c.setTitle(title);c.setAuthor('Liya & Family');c.setFillColor(HexColor(CREAM));c.rect(0,0,612,792,fill=1,stroke=0)
 c.setFillColor(HexColor(PURPLE));c.roundRect(42,734,32,32,9,fill=1,stroke=0);c.setFillColor(HexColor('#ffffff'));c.setFont('KitSans-Bold',20);c.drawCentredString(58,742,'L')
 c.setFillColor(HexColor(INK));c.setFont('KitSans-Bold',15);c.drawString(85,751,'Liya & Family');c.setFont('KitSans',9);c.drawString(85,737,'Free learning. Shared possibility.')
 y=para(c,escape(kicker.upper()),42,702,528,9,PURPLE)
 y=para(c,'<b>'+escape(title)+'</b>',42,y-13,528,24)
 y=para(c,subtitle,42,y-14,528,11,MUTED)
 return c,y-22

def block(c,y,title,text):
 y=para(c,'<b>'+title+'</b>',42,y,528,13,PURPLE)
 y=para(c,text,42,y-7,528,10)
 return y-15

def finish(c):
 c.setStrokeColor(HexColor('#ddd4e5'));c.line(42,54,570,54)
 para(c,'Family-led free practice. A supplement, not a complete curriculum.',42,43,528,9,MUTED)
 c.save()

def draw_qr(c,x,y,size=118):
 unit=size/side;c.setFillColor(HexColor('#ffffff'));c.rect(x,y,size,size,fill=1,stroke=0);c.setFillColor(HexColor('#000000'))
 for row,line in enumerate(matrix):
  for col,on in enumerate(line):
   if on:c.rect(x+(col+4)*unit,y+(side-row-5)*unit,unit,unit,fill=1,stroke=0)

c,y=page('family-flyer.pdf','Preschool through Grade 6','Small steps. Bright futures.','A free place to practice Math, Reading, and Science, with a grown-up nearby when needed.')
y=block(c,y,'What your family gets','96 lessons across eight levels: 12 per level, with four in each subject. Every lesson includes an explanation, a worked example, an off-screen activity, and practice with answer feedback.')
y=block(c,y,'Start without an account','Choose a comfortable level. Try one short lesson, talk about it, and return when your family has time. No payment, ads, chat, or required child names.')
y=block(c,y,'A few weeks of practice - with honest limits','Try one lesson per subject each week for a four-week path. This is a supplement, not a full school-year curriculum, diagnosis, or live tutoring service. Preschool and kindergarten need adult help.')
y=block(c,y,'See progress on the learning device','Up to four local learner profiles. Print a weekly report or send a read-only report link privately to a parent’s phone. Links are snapshots, not automatic synchronization.')
draw_qr(c,42,94,126)
para(c,'<b>Scan to start learning</b>',190,211,380,16,PURPLE)
para(c,'liyasamra.github.io/liya-and-family/',190,174,380,12)
para(c,'For technical corrections, open About &amp; contact on the website. Public GitHub reports require an account; never include child information.',190,147,380,10,MUTED)
c.linkURL(URL,(42,94,570,224),relative=0,thickness=0);finish(c)

c,y=page('family-start-guide.pdf','A gentle routine','Your first four weeks','Short, steady practice works best when the learner feels supported. Adjust the pace to your family.')
y=block(c,y,'1. Choose a comfortable level','Open Learn and select Preschool, Kindergarten, or Grade 1-6. These are starting points, not placement decisions. Read the goal together and move down a level if the lesson feels too difficult.')
y=block(c,y,'2. Separate siblings on a shared device','Use Manage learners to add up to four profiles. Generic nicknames such as Learner 1 are enough. Check Learning as before each session so the right learner receives the record.')
y=block(c,y,'3. Follow the four-step path','Week 1: the first lesson in each subject. Weeks 2-4: the next numbered lesson in each subject. Try three short sessions a week. Read, work through the example, do the activity, and discuss the practice feedback. Repeat whenever helpful.')
y=block(c,y,'4. Use the report as a conversation starter','Parent report shows dated attempts, reading minutes, and skills to revisit for the selected week. Three questions do not establish mastery or readiness. Ask: What felt easier? What should we try again?')
y=block(c,y,'5. Protect your records','Progress is saved only in the learning browser. In Parent report, create a snapshot link to send privately. Anyone with the link can read it. Use My routine to download a full backup. Restore it on another device when needed. Anyone with the file can see its records. Avoid full names and private information; keep backups in a place you trust.')
y=block(c,y,'After week four','Revisit difficult lessons, read library books together, and follow your school guidance. The For families page links to reading ideas and math skill references. Additional lessons and automatic parent access are future work.')
assert y>85, 'Family guide needs more room above the footer'
para(c,'<b>Start here:</b> liyasamra.github.io/liya-and-family/',42,y,528,11,PURPLE);finish(c)

c,y=page('group-leader-guide.pdf','For trusted community spaces','A four-week learning pilot','For libraries, churches, and community centers supporting families with a small, supervised practice group.')
y=block(c,y,'Before the first session','Use your organization\'s safeguarding and guardian-permission procedures. Arrange approved adult supervision, especially for younger children. Select comfortable levels and print lessons when devices or internet are limited.')
y=block(c,y,'A 30-minute session','<b>5 min:</b> welcome, choose a level, and discuss the goal.<br/><b>10 min:</b> read the explanation and work through the example.<br/><b>10 min:</b> try the activity and practice with feedback.<br/><b>5 min:</b> reflect together and send a printed lesson or report home.')
y=block(c,y,'Shared devices are not a group dashboard','Each browser supports four local profiles. Larger groups need multiple devices or paper activities. Use generic labels and consistent device assignments. Anyone using the browser can see its records. Snapshot links let parents view a selected week on another phone; links do not update automatically.')
y=block(c,y,'Keep the pilot small and useful','Try 5-10 families for four weeks. Follow one numbered lesson per subject each week or adjust the pace. Ask which levels were used, what was missing, and whether the report helped. Record general feedback without identifying children.')
y=block(c,y,'Be clear about what you recommend','This is a free, family-led supplement with 12 lessons per level. It is not an accredited school, complete curriculum, assessment, or staffed tutoring service. No partner affiliation is implied by using the materials.')
y=block(c,y,'Share safely','Use the public flyer and QR code. Follow your organization\'s rules before keeping or sharing progress reports. Never put child details, backups, or reports into the public GitHub feedback channel.')
assert y>85, 'Leader guide needs more room above the footer'
para(c,'<b>Community kit:</b> liyasamra.github.io/liya-and-family/#community',42,y,528,11,PURPLE);finish(c)
print('Created 3 one-page PDFs and a QR code linking to',URL)

"""Render a precise share-card graphic from project branding (Pillow required)."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
out=Path(__file__).resolve().parents[1]/'public/social-preview.png';out.parent.mkdir(exist_ok=True)
im=Image.new('RGB',(1200,630),'#fffaf2');d=ImageDraw.Draw(im)
def font(size,bold=False):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold' if bold else '')+'.ttf',size)
d.ellipse((905,-170,1330,255),fill='#eee5fa');d.rounded_rectangle((64,58,600,121),radius=28,fill='#eee5fa');d.text((86,73),'PRESCHOOL THROUGH GRADE 6',font=font(25,True),fill='#675090')
d.text((64,161),'Ewket Kids',font=font(79,True),fill='#39314e');d.text((64,272),'Free practice. Small steps. Bright futures.',font=font(33),fill='#655d72')
for x,label in [(64,'Math'),(415,'Reading'),(766,'Science')]:
 d.rounded_rectangle((x,364,x+306,451),radius=20,fill='#eee5fa',outline='#d9cbe9',width=2);d.text((x+29,386),label,font=font(32,True),fill='#675090')
d.text((64,488),'96 lessons · picture activities · family reports',font=font(27),fill='#39314e');d.text((64,555),'liyasamra.github.io/liya-and-family/',font=font(23),fill='#655d72');im.save(out)
print(out)

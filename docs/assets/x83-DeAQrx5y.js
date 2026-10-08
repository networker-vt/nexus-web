import{p as Q}from"./parseX83-NRueUD5Q.js";import{g as S,z as w,n as b}from"./ausschreiben-CD_Uxian.js";import"./preload-helper-BjLlLVzV.js";/* empty css                  */import"./index-CxfYsGbW.js";import"./_commonjsHelpers-IkB594pC.js";import"./client-t3WC2QCc.js";import"./jsx-runtime-zGFS8chU.js";import"./upload-DoHLHrCg.js";import"./beta-2ORoPBF4.js";const l=e=>String(e??"").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),k=(e,r)=>String(e||"").replace(/\r\n?/g,`
`).split(`
`).map(o=>o.trim()?`${r}<p><span>${l(o)}</span></p>`:`${r}<p />`).join(`
`);function P(e){const r=w(e);return(r??0).toFixed(3)}function M(e,r=new Date){const m=new Date(r.getTime()-r.getTimezoneOffset()*6e4).toISOString(),o=m.slice(0,10),p=m.slice(11,19),g=S(e),u=e.lose.aufteilen&&e.lose.liste.length>0;let i=0;const n=()=>`LP_${++i}`,a=new Map;for(const s of e.positionen)s.art==="alternativ"&&s.alternativZu&&!a.has(s.alternativZu)&&a.set(s.alternativZu,a.size+1);const f=new Map,d=a.size+1,$=(s,t)=>s.map(({pos:c,rno:z})=>{const x=[];if(c.art==="bedarf"&&x.push(`${t}  <Provis>WithoutTotal</Provis>`),c.art==="alternativ"){const L=c.alternativZu&&a.get(c.alternativZu)||d,T=(f.get(L)||0)+1;f.set(L,T),x.push(`${t}  <ALNGroupNo>${String(L).padStart(2,"0")}</ALNGroupNo>`,`${t}  <ALNSerNo>${T}</ALNSerNo>`)}else a.has(c.id)&&x.push(`${t}  <ALNGroupNo>${String(a.get(c.id)).padStart(2,"0")}</ALNGroupNo>`,`${t}  <ALNSerNo>0</ALNSerNo>`);const D=c.langtext.trim()?c.langtext:c.kurztext;return`${t}<Item ID="${n()}" RNoPart="${z}">
${x.length?x.join(`
`)+`
`:""}${t}  <Qty>${P(c.menge)}</Qty>
${t}  <QU>${l(c.einheit.trim()||"St")}</QU>
${t}  <Description>
${t}    <CompleteText>
${t}      <DetailTxt>
${t}        <Text>
${k(D,`${t}          `)}
${t}        </Text>
${t}      </DetailTxt>
${t}      <OutlineText>
${t}        <OutlTxt>
${t}          <TextOutlTxt>
${t}            <p><span>${l(c.kurztext.trim().slice(0,70))}</span></p>
${t}          </TextOutlTxt>
${t}        </OutlTxt>
${t}      </OutlineText>
${t}    </CompleteText>
${t}  </Description>
${t}</Item>`}).join(`
`),A=g.map(s=>`        <BoQCtgy ID="${n()}" RNoPart="${s.nr}">
          <LblTx>
            <p><span>${l(s.los?`Los ${Number(s.nr)}: ${s.titel}`:s.titel)}</span></p>
          </LblTx>
          <BoQBody>
            <Itemlist>
${$(s.positionen,"              ")}
            </Itemlist>
          </BoQBody>
        </BoQCtgy>`).join(`
`),h=e.auftraggeber,B=e.leistung.titel||"Ausschreibung";return`<?xml version="1.0" encoding="UTF-8"?>
<!-- Erstellt mit Lospilot (Auftraggeber-Assistent). GAEB DA XML 3.2, X83. Nicht schema-zertifiziert – vor Veröffentlichung in einem GAEB-Programm prüfen. -->
<GAEB xmlns="http://www.gaeb.de/GAEB_DA_XML/DA83/3.2">
  <GAEBInfo>
    <Version>3.2</Version>
    <VersDate>2013-10</VersDate>
    <Date>${o}</Date>
    <Time>${p}</Time>
    <ProgSystem>Lospilot</ProgSystem>
    <ProgName>Lospilot Auftraggeber-Assistent</ProgName>
  </GAEBInfo>
  <PrjInfo>
    <NamePrj>${l(e.leistung.vergabenummer||B)}</NamePrj>
    <LblPrj>${l(B)}</LblPrj>
    <Cur>EUR</Cur>
    <CurLbl>Euro</CurLbl>
  </PrjInfo>
  <Award>
    <DP>83</DP>
    <AwardInfo>
      <Cur>EUR</Cur>
      <CurLbl>Euro</CurLbl>
    </AwardInfo>
    <OWN>
      <Address>
        <Name1>${l(h.name)}</Name1>${h.abteilung?`
        <Name2>${l(h.abteilung)}</Name2>`:""}
        <Street>${l(h.strasse)}</Street>
        <PCode>${l(h.plz)}</PCode>
        <City>${l(h.ort)}</City>
      </Address>
    </OWN>
    <BoQ ID="${n()}">
      <BoQInfo>
        <Name>${l((e.leistung.vergabenummer||B).slice(0,20))}</Name>
        <LblBoQ>${l(B)}</LblBoQ>
        <Date>${o}</Date>
        <OutlCompl>AllTxt</OutlCompl>
        <BoQBkdn>
          <Type>BoQLevel</Type>
          <LblBoQBkdn>${u?"Los":"Titel"}</LblBoQBkdn>
          <Length>2</Length>
          <Num>Yes</Num>
        </BoQBkdn>
        <BoQBkdn>
          <Type>Item</Type>
          <LblBoQBkdn>Position</LblBoQBkdn>
          <Length>3</Length>
          <Num>Yes</Num>
        </BoQBkdn>
      </BoQInfo>
      <BoQBody>
${A}
      </BoQBody>
    </BoQ>
  </Award>
</GAEB>
`}function U(e){if(e[0]===239&&e[1]===187&&e[2]===191)return new TextDecoder("utf-8").decode(e.subarray(3));if(e[0]===255&&e[1]===254)return new TextDecoder("utf-16le").decode(e.subarray(2));if(e[0]===254&&e[1]===255)return new TextDecoder("utf-16be").decode(e.subarray(2));const r=new TextDecoder("latin1").decode(e.subarray(0,240)),m=((/encoding\s*=\s*["']([^"']+)["']/i.exec(r)||[])[1]||"").toLowerCase();if(/^(iso-8859-1|iso-8859-15|latin1|windows-1252)$/.test(m))return new TextDecoder("windows-1252").decode(e);const o=new TextDecoder("utf-8").decode(e);return(o.match(/\uFFFD/g)||[]).length>4?new TextDecoder("windows-1252").decode(e):o}function K(e,r,m=""){const o=Q(e,r),p=[];for(const g of o.positions){const u=(g.langtext||"").trim();let i=(g.bezeichnung||"").trim();(i.length>140||u&&i===u.replace(/\s+/g," "))&&(i=(u.split(`
`).find(n=>n.trim())||i).slice(0,140)),p.push({id:b("pos"),losId:m,kurztext:i,langtext:u&&u!==i?u:"",menge:String(w(g.menge)??g.menge).replace(".",","),einheit:g.einheit||"St",art:"normal"})}return{positionen:p,quelle:`${r} (GAEB ${o.format})`,hinweise:o.warnings}}const N={oz:/^(oz|pos\.?|position|ordnungszahl|nr\.?)$/i,kurz:/^(kurztext|bezeichnung|leistung|text|beschreibung)$/i,lang:/^(langtext|beschreibung lang|details?)$/i,menge:/^(menge|anzahl|stk\.?|qty)$/i,einheit:/^(einheit|me|eh|unit)$/i,art:/^(art|positionsart)$/i};function V(e,r,m=""){const o=[];let p=-1,g={};for(let i=0;i<Math.min(e.length,30)&&p<0;i++){const n={};(e[i]||[]).forEach((a,f)=>{const d=String(a??"").trim();for(const $ of Object.keys(N))n[$]==null&&N[$].test(d)&&(n[$]=f)}),n.kurz!=null&&n.menge!=null&&(p=i,g=n)}if(p<0)return{positionen:[],quelle:r,hinweise:["Keine Kopfzeile gefunden. Erwartet werden Spalten wie „Kurztext“ und „Menge“ (optional „Einheit“, „Langtext“)."]};const u=[];for(const i of e.slice(p+1)){const n=$=>g[$]==null?"":String(i?.[g[$]]??"").trim(),a=n("kurz"),f=n("menge");if(!a||!f&&!n("einheit")||/^(summe|gesamt|zwischensumme)/i.test(a))continue;const d=n("art").toLowerCase();u.push({id:b("pos"),losId:m,kurztext:a.slice(0,200),langtext:n("lang"),menge:f.replace(".",","),einheit:n("einheit")||"St",art:/bedarf|eventual/.test(d)?"bedarf":/alternativ|wahl/.test(d)?"alternativ":"normal"})}return u.length||o.push("Unter der Kopfzeile wurden keine Positionen gefunden."),{positionen:u,quelle:r,hinweise:o}}export{M as buildX83,U as dekodiere,K as importGaeb,V as importTabelle};

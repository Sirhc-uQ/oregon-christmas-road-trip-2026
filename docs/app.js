const places = [
  {name:'Cannon Beach',rating:'★★★★★',desc:'Haystack Rock 与冬季海浪；留一晚，给海边晨昏光线一点余地。',duration:'半天＋1 晚',weather:'多风雨，少雪'},
  {name:'Silverton Christmas Market',rating:'★★★★☆',desc:'26 日有官方售票场次。适合安排在抵达 Silverton 后的晚上。',duration:'1.5–2 小时',weather:'湿冷，可能下雨'},
  {name:'Redwood National & State Parks',rating:'★★★★☆',desc:'选近 US‑101 的短步道感受巨木；雨后核对步道与道路状态。',duration:'2–3 小时',weather:'潮湿、可能有雨'},
  {name:'Multnomah Falls',rating:'★★★☆☆',desc:'峡谷瀑布值得绕访，冰雪天气只看安全可达区域。',duration:'45–90 分钟',weather:'湿冷，结冰风险'},
  {name:'Oregon Coast · Newport / Florence',rating:'★★★☆☆',desc:'海岸风景很美，但七日版只够选一处短停，不宜两城都深游。',duration:'单点 30–60 分钟',weather:'风雨、浪大'},
  {name:'Crater Lake National Park',rating:'★★☆☆☆',desc:'雪景壮观，但冬季绕行大、湖景看能见度；不进入主线。',duration:'至少半天',weather:'大雪、低能见度'},
  {name:'Ashland',rating:'★★☆☆☆',desc:'I‑5 北上可作午餐与休息点；不安排专程游览。',duration:'30–60 分钟',weather:'冷雨或偶有雪'},
  {name:'Portland',rating:'★★☆☆☆',desc:'城市餐饮选择多，但这版路线不需要为它增加过夜。',duration:'路过或跳过',weather:'冷雨为主'},
  {name:'Redding / Eureka',rating:'★☆☆☆☆',desc:'分别承担北上与返程的补给功能，不算本次观光核心。',duration:'休息补给',weather:'雨或阴冷'}
];
document.querySelector('#place-list').innerHTML=places.map((p,i)=>`<article class="place-card"><div class="place-card-top"><span class="num">${String(i+2).padStart(2,'0')} / DESTINATION</span><span class="rating">${p.rating}</span></div><h3>${p.name}</h3><p>${p.desc}</p><div class="place-card-bottom"><span>建议 <b>${p.duration}</b></span><span>天气 <b>${p.weather}</b></span></div></article>`).join('');

const legs=[
 {from:'San Francisco',to:'Redding',time:'约 4.1 小时',miles:'约 217 英里',url:'https://www.google.com/maps/dir/San+Francisco,+CA/Redding,+CA'},
 {from:'Redding',to:'Silverton',time:'约 7.8 小时',miles:'约 388 英里，经 Ashland',url:'https://www.google.com/maps/dir/Redding,+CA/Ashland,+OR/Silverton,+OR'},
 {from:'Silverton',to:'Mount Hood',time:'约 3.3 小时',miles:'约 141 英里，经瀑布及 Hood River',url:'https://www.google.com/maps/dir/Silverton,+OR/Multnomah+Falls,+OR/Hood+River,+OR/Government+Camp,+OR'},
 {from:'Mount Hood',to:'Cannon Beach',time:'约 3.2 小时',miles:'约 136 英里',url:'https://www.google.com/maps/dir/Government+Camp,+OR/Cannon+Beach,+OR'},
 {from:'Cannon Beach',to:'Crescent City',time:'约 8.6 小时',miles:'约 341 英里，沿 US‑101',url:'https://www.google.com/maps/dir/Cannon+Beach,+OR/Newport,+OR/Florence,+OR/Coos+Bay,+OR/Gold+Beach,+OR/Crescent+City,+CA'},
 {from:'Crescent City',to:'San Francisco',time:'约 8.3 小时',miles:'约 373 英里，经红杉林与 Eureka',url:'https://www.google.com/maps/dir/Crescent+City,+CA/Jedediah+Smith+Redwoods+State+Park/Eureka,+CA/San+Francisco,+CA'}
];
document.querySelector('#route-grid').innerHTML=legs.map((l,i)=>`<a class="route-leg" href="${l.url}" target="_blank" rel="noopener"><b>${String(i+1).padStart(2,'0')} · ${l.from} → ${l.to} ↗</b><span>${l.time}</span><small>${l.miles}</small></a>`).join('');

const days=[
 {date:'12.25',weekday:'周五 · 第 1 天',title:'San Francisco → Redding',body:'假设下午 15:00 左右已取车并离开 SF。沿 I‑5 北上，以 Redding 为首晚中转，不安排夜间观光。若飞机或取车延误，改住 Sacramento／Chico。',times:['15:00 出发（假设）','19:30–21:00 抵达'],drive:'约 217 英里 · 基础车程 4.1 小时',stay:'住 Redding',risk:'节日交通、天黑后驾驶'},
 {date:'12.26',weekday:'周六 · 第 2 天',title:'Redding → Ashland → Silverton',body:'尽早跨越 Siskiyou Pass；Ashland 只安排短暂休息。正常路况下傍晚抵达 Silverton，晚上逛 Christmas Market。官方售票页已列 12 月 26 日场次；若山口延误明显，市集应取消。',times:['07:00 出发','09:30–10:30 Ashland','17:00 前后抵达'],drive:'约 388 英里 · 基础车程 7.8 小时',stay:'住 Silverton／Salem',risk:'Siskiyou Pass 冰雪与交通管制'},
 {date:'12.27',weekday:'周日 · 第 3 天',title:'Silverton → Multnomah Falls → Mount Hood',body:'上午前往 Columbia River Gorge，天气安全时短访 Multnomah Falls。之后沿已开放的主干道到 Mount Hood 住宿区；若峡谷结冰或 OR‑35 路况差，跳过瀑布，从 Portland 方向沿 US‑26 进山。',times:['08:00 出发','10:00–11:30 瀑布','16:00 前后入住'],drive:'约 141 英里 · 基础车程 3.3 小时',stay:'住 Mount Hood · 第 1 晚',risk:'峡谷结冰、山路牵引要求'},
 {date:'12.28',weekday:'周一 · 第 4 天',title:'Mount Hood 留一整天',body:'轻量玩雪、雪林散步、拍照和木屋休息。优先选择正式开放的 Sno‑Park／雪区，避免为了景点开上未经清雪的支路。',times:['上午看雪况','白天山景活动','傍晚回木屋'],drive:'当地短途 · 视天气而定',stay:'住 Mount Hood · 第 2 晚',risk:'降雪、停车与山路结冰'},
 {date:'12.29',weekday:'周二 · 第 5 天',title:'Mount Hood → Cannon Beach',body:'早上离山，下午到 Cannon Beach 看 Haystack Rock。海边只在安全距离内活动，不靠近大浪；傍晚和第二天清晨是最从容的拍照窗口。',times:['08:30 出发','午后抵达海岸','傍晚海滩散步'],drive:'约 136 英里 · 基础车程 3.2 小时',stay:'住 Cannon Beach',risk:'山区冰雪、海岸风雨与高浪'},
 {date:'12.30',weekday:'周三 · 第 6 天',title:'Cannon Beach → Crescent City',body:'这是全程最长的景观驾驶日。沿 US‑101 南下，在 Newport 或 Florence 二选一短暂停靠；即使不游览，基础车程也要约 8.6 小时。遇风暴、落石或道路延误时取消中途观光，并考虑改走内陆。',times:['07:00 出发','午间单点短停','18:00–20:00 抵达'],drive:'约 341 英里 · 基础车程 8.6 小时',stay:'住 Crescent City',risk:'长时间驾驶、沿海风雨与路况'},
 {date:'12.31',weekday:'周四 · 第 7 天',title:'Redwood Forest → San Francisco',body:'早上在 Crescent City／Jedediah Smith 附近走一条开放的短步道，随后直接南返 SF。经 Eureka 但不专程观光。基础车程约 8.3 小时，加上红杉短访与休息，回到 SF 可能已是晚上。',times:['07:00 红杉林短访','09:00 前开始南返','19:00–21:00 回到 SF'],drive:'约 373 英里 · 基础车程 8.3 小时',stay:'当晚返回 SF',risk:'雨林步道湿滑、返程疲劳'}
];
document.querySelector('#timeline').innerHTML=days.map(d=>`<article class="day"><div class="day-date"><strong>${d.date}</strong><span>${d.weekday}</span></div><div class="day-body"><div><h3>${d.title}</h3><p>${d.body}</p><div class="day-schedule">${d.times.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="day-aside"><b>${d.drive}</b><span>${d.stay}</span><small class="day-risk">留意：${d.risk}</small></div></div></article>`).join('');

if(window.L){
 const map=L.map('map',{scrollWheelZoom:false,zoomControl:false}).setView([43.1,-122.9],6);
 L.control.zoom({position:'bottomright'}).addTo(map);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap 贡献者',maxZoom:18}).addTo(map);
 const main=[['San Francisco',37.7749,-122.4194],['Redding',40.5865,-122.3917],['Ashland',42.1946,-122.7095],['Silverton',45.0051,-122.7832],['Multnomah Falls',45.5785,-122.1158],['Mount Hood / Government Camp',45.3046,-121.7561],['Cannon Beach',45.8918,-123.9615],['Newport',44.6368,-124.0535],['Florence',43.9826,-124.0998],['Crescent City',41.7558,-124.2026],['Redwood / Jedediah Smith',41.7885,-124.1067],['Eureka',40.8021,-124.1637]];
 const skipped=new Set(['Ashland','Newport','Florence','Eureka']);
 const coord={};main.forEach(([name,lat,lng])=>{coord[name]=[lat,lng];const state=skipped.has(name)?'skip':'';L.marker([lat,lng],{icon:L.divIcon({className:'',html:`<div class="map-pin ${state}"></div>`,iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map).bindPopup(`<b>${name}</b><br>${skipped.has(name)?'原计划景点 / 本版仅路过或短停':'推荐路线节点'}`)});
 L.marker([42.9446,-122.109],{icon:L.divIcon({className:'',html:'<div class="map-pin optional"></div>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map).bindPopup('<b>Crater Lake</b><br>冬季仅从西／南入口尝试进入；不在主线');
 const path=['San Francisco','Redding','Ashland','Silverton','Multnomah Falls','Mount Hood / Government Camp','Cannon Beach','Newport','Florence','Crescent City','Redwood / Jedediah Smith','Eureka','San Francisco'];
 L.polyline(path.map(n=>coord[n]),{color:'#e5744c',weight:3,opacity:.85,dashArray:'7,7'}).addTo(map);
 L.polyline([coord.Ashland,[42.9446,-122.109],coord.Silverton],{color:'#70acc3',weight:2,opacity:.8,dashArray:'3,8'}).addTo(map);
 [['4.1h',39.2,-122.45],['7.8h',43.5,-123.15],['3.3h',45.35,-122.35],['3.2h',45.65,-122.9],['8.6h',43.15,-124.55],['8.3h',39.8,-123.2]].forEach(([label,lat,lng])=>L.circleMarker([lat,lng],{radius:0,opacity:0,fillOpacity:0}).addTo(map).bindTooltip(label,{permanent:true,direction:'center',className:'route-label'}));
}

const days=[
 {date:'12.25',weekday:'周五 · 第 1 天',title:'San Francisco → Redding',body:'假设下午 15:00 左右已取车并离开 SF。沿 I‑5 北上，以 Redding 为首晚中转，不安排夜间观光。若飞机或取车延误，改住 Sacramento／Chico。',times:['15:00 出发（假设）','19:30–21:00 抵达'],drive:'约 217 英里 · 基础车程 4.1 小时',stay:'住 Redding',risk:'节日交通、天黑后驾驶'},
 {date:'12.26',weekday:'周六 · 第 2 天',title:'Redding → Ashland → Silverton',body:'尽早跨越 Siskiyou Pass；Ashland 只安排短暂休息。正常路况下傍晚抵达 Silverton，晚上逛 Christmas Market。官方售票页已列 12 月 26 日场次；若山口延误明显，市集应取消。',times:['07:00 出发','09:30–10:30 Ashland','17:00 前后抵达'],drive:'约 388 英里 · 基础车程 7.8 小时',stay:'住 Silverton／Salem',risk:'Siskiyou Pass 冰雪与交通管制'},
 {date:'12.27',weekday:'周日 · 第 3 天',title:'Silverton → Multnomah Falls → Mount Hood',body:'上午前往 Columbia River Gorge，天气安全时短访 Multnomah Falls。之后沿已开放的主干道到 Mount Hood 住宿区；若峡谷结冰或 OR‑35 路况差，跳过瀑布，从 Portland 方向沿 US‑26 进山。',times:['08:00 出发','10:00–11:30 瀑布','16:00 前后入住'],drive:'约 141 英里 · 基础车程 3.3 小时',stay:'住 Mount Hood · 第 1 晚',risk:'峡谷结冰、山路牵引要求'},
 {date:'12.28',weekday:'周一 · 第 4 天',title:'Mount Hood 留一整天',body:'轻量玩雪、雪林散步、拍照和木屋休息。优先选择正式开放的 Sno‑Park／雪区，避免为了景点开上未经清雪的支路。',times:['上午看雪况','白天山景活动','傍晚回木屋'],drive:'当地短途 · 视天气而定',stay:'住 Mount Hood · 第 2 晚',risk:'降雪、停车与山路结冰'},
 {date:'12.29',weekday:'周二 · 第 5 天',title:'Mount Hood → Cannon Beach',body:'早上离山，下午到 Cannon Beach 看 Haystack Rock。海边只在安全距离内活动，不靠近大浪；傍晚和第二天清晨是最从容的拍照窗口。',times:['08:30 出发','午后抵达海岸','傍晚海滩散步'],drive:'约 136 英里 · 基础车程 3.2 小时',stay:'住 Cannon Beach',risk:'山区冰雪、海岸风雨与高浪'},
 {date:'12.30',weekday:'周三 · 第 6 天',title:'Cannon Beach → Crescent City',body:'这是全程最长的景观驾驶日。沿 US‑101 南下，在 Newport 或 Florence 二选一短暂停靠；即使不游览，基础车程也要约 8.6 小时。遇风暴、落石或道路延误时取消中途观光，并考虑改走内陆。',times:['07:00 出发','午间单点短停','18:00–20:00 抵达'],drive:'约 341 英里 · 基础车程 8.6 小时',stay:'住 Crescent City',risk:'长时间驾驶、沿海风雨与路况'},
 {date:'12.31',weekday:'周四 · 第 7 天',title:'Redwood Forest → San Francisco',body:'早上在 Crescent City／Jedediah Smith 附近走一条开放的短步道，随后直接南返 SF。经 Eureka 但不专程观光。基础车程约 8.3 小时，加上红杉短访与休息，回到 SF 可能已是晚上。',times:['07:00 红杉林短访','09:00 前开始南返','19:00–21:00 回到 SF'],drive:'约 373 英里 · 基础车程 8.3 小时',stay:'当晚返回 SF',risk:'雨林步道湿滑、返程疲劳'}
];
const relaxedDays=[
 days[0],
 {date:'12.26',weekday:'周六 · 第 2 天',title:'Redding → Eugene',body:'早上沿 I‑5 北上，在白天跨越 Siskiyou Pass。Ashland 或 Medford 只作为午餐、补能和休息点；抵达 Eugene 后正常吃晚饭，不再赶夜间活动。',times:['早上出发','白天越过山口','下午抵达 Eugene'],drive:'约 315 英里 · 基础车程 5–5.5 小时',stay:'住 Eugene',risk:'Siskiyou Pass 冰雪与牵引管制'},
 {date:'12.27',weekday:'周日 · 第 3 天',title:'Eugene → Mount Hood',body:'经 I‑5、Portland 与 US‑26 前往 Government Camp 一带，留出补能和路况变化的余量，尽量在天黑前入住木屋。若进山道路受管制，以安全可达的山脚住宿为备选。',times:['上午出发','白天经 US‑26 进山','下午入住'],drive:'约 152 英里 · 基础车程 3–4 小时',stay:'住 Mount Hood · 第 1 晚',risk:'US‑26 积雪、停车与牵引要求'},
 days[3],days[4],
 {date:'12.30',weekday:'周三 · 第 6 天',title:'Cannon Beach → Medford',body:'清晨看一眼海边，再经 Portland 接 I‑5 南下。把这天用于返程，不安排 Newport 或南部海岸观光；晚间在 Medford 正常休息。',times:['日出后海边短停','上午出发','傍晚前后抵达'],drive:'约 340 英里 · 基础车程约 6 小时',stay:'住 Medford',risk:'长途驾驶、沿途充电与降雨'},
 {date:'12.31',weekday:'周四 · 第 7 天',title:'Medford → San Francisco',body:'日出后查看 Siskiyou Pass 与加州路况，沿 I‑5 返回 SF。31 日是硬性截止日期时，山口封闭可能使抵达时间失去保证；若预报恶劣，应提前一天调整海岸停留。',times:['日出后核对路况','白天越过山口','傍晚前后回 SF'],drive:'约 360 英里 · 基础车程 6–7 小时',stay:'当晚返回 SF',risk:'Siskiyou Pass 封路与返程疲劳'}
];
const coastDays=[
 relaxedDays[0],relaxedDays[1],relaxedDays[2],relaxedDays[3],relaxedDays[4],
 {date:'12.30',weekday:'周三 · 第 6 天',title:'Cannon Beach → Florence',body:'沿 US‑101 南下，把 Newport、Cape Perpetua 一带当作候选，只选 1–2 处短停。留时间吃午饭，并在日落前抵达 Florence。',times:['早上出发','白天沿海观景','傍晚前入住'],drive:'约 158 英里 · 基础车程 4–4.5 小时',stay:'住 Florence',risk:'海岸风雨、弯道与临时封路'},
 {date:'12.31',weekday:'周四 · 第 7 天',title:'Florence → Bandon → Gold Beach',body:'继续沿 US‑101 南下，在 Bandon 看海、吃午饭并补足电量，下午前往 Gold Beach。Gold Beach 住宿充电须单独核实，不把当地 Tesla 超充当作已确认设施。',times:['上午出发','Bandon 午餐与补能','下午抵达 Gold Beach'],drive:'约 130–150 英里 · 基础车程 3–3.5 小时',stay:'住 Gold Beach',risk:'海岸天气、Bandon 至 Crescent City 补能余量'},
 {date:'1.1',weekday:'周五 · 第 8 天',title:'Gold Beach → 红杉林 → Eureka',body:'白天经过 Samuel H. Boardman 海岸，按电量在 Crescent City 补能。红杉首选开放时的 Newton B. Drury Scenic Parkway 与 Big Tree 短步道；若冬季封闭，继续走 US‑101，把短访留到次日开放路段。',times:['早上出发','南海岸短停','午后红杉短访'],drive:'约 140 英里 · 基础车程 3–4 小时',stay:'住 Eureka',risk:'海岸风雨、红杉观景路临时关闭'},
 {date:'1.2',weekday:'周六 · 第 9 天',title:'Eureka → San Francisco',body:'沿 US‑101 返回 SF。若前一天的红杉观景路关闭、且当天路况允许，可在 Founders Grove 作一次短停；否则专心返程。',times:['早上出发','午间休息与补能','傍晚前后回 SF'],drive:'约 270 英里 · 基础车程 5–6 小时',stay:'当晚返回 SF',risk:'连续驾驶、雨天与充电时间'}
];
const planVariants={
 original:{name:'七日特种兵版',returnDate:'12.31',eyebrow:'04 / 每日安排 · 七日特种兵版 · 7 天 6 晚',title:'12 月 25 日出发，<br><em>31 日晚上回到 SF。</em>',miles:'约 1,600–1,700 英里',hours:'约 35–39 小时纯驾驶',warning:'这条七日闭环仍然紧凑，12 月 26 日、30 日和 31 日的基础车程分别约 7.8、8.6 和 8.3 小时，休息与游览另计。为了保住 Mount Hood 两晚、Cannon Beach 一晚与红杉林，必须放弃 Newport、Florence 的从容游玩，只选一个短暂停靠点。若不愿意在 30 日长开车，建议延长到 1 月 1 日返回。',days,dropped:['Portland 市区过夜','Ashland 深度停留','Newport 完整游玩','Florence 过夜','Eureka 专程观光','Crater Lake 主线'],droppedNote:'Newport 或 Florence 可在 30 日二选一短停，不能把两处都当成完整景点日。Ashland、Eureka 仍可作为补给或休息点。'},
 relaxed:{name:'七日轻松版',returnDate:'12.31',eyebrow:'04 / 每日安排 · 七日轻松版 · 7 天 6 晚',title:'12 月 25 日出发，<br><em>31 日返回 SF。</em>',miles:'约 1,500–1,600 英里',hours:'约 28–31 小时纯驾驶',warning:'保留 Mount Hood 两晚与 Cannon Beach 一晚，把单日基础驾驶尽量控制在约 6 小时内。12 月 31 日仍须经 Siskiyou Pass 返回；遇到封路，不能保证当天抵达 SF。若临近 29 日预报明显恶化，应缩短或取消海岸停留，提前南返。',days:relaxedDays,dropped:['Silverton Christmas Market','Multnomah Falls','南部 US‑101 海岸','Redwood 红杉林','Newport／Florence 游览','Portland 市区过夜','Crater Lake 主线'],droppedNote:'把节省的时间留给白天进山、正常用餐和分段返程。Eugene 与 Medford 是休息住宿点，不安排额外观光。'},
 coast:{name:'九日沿海版',returnDate:'1.2',eyebrow:'04 / 每日安排 · 九日沿海版 · 9 天 8 晚',title:'12 月 25 日出发，<br><em>1 月 2 日回到 SF。</em>',miles:'约 1,500–1,600 英里',hours:'约 32–35 小时纯驾驶',warning:'这版把海岸线拆为多个白天路段，并保留 Mount Hood 两晚与红杉短访。12 月 31 日在 Bandon 按车载规划补能，Gold Beach 不预设有 Tesla 超充；1 月 1 日的红杉观景路如因冰雪或倒树关闭，直接走 US‑101。所有车程均未含充电、用餐和天气延误。',days:coastDays,dropped:['Silverton Christmas Market','Multnomah Falls','Portland 市区过夜','Newport 深度游玩','Ashland 深度停留','Eureka 专程观光','Crater Lake 主线'],droppedNote:'Florence、Bandon、Gold Beach 与红杉林保留在主线；沿海每天只挑 1–2 处停靠，Eureka 用作返程前一晚的住宿点。'}
};
const routeLegs = {
 original:[
  ['San Francisco','Redding','约 4.1 小时','约 217 英里','San+Francisco,+CA/Redding,+CA'],
  ['Redding','Silverton','约 7.8 小时','约 388 英里，经 Ashland','Redding,+CA/Ashland,+OR/Silverton,+OR'],
  ['Silverton','Mount Hood','约 3.3 小时','约 141 英里，经瀑布及 Hood River','Silverton,+OR/Multnomah+Falls,+OR/Hood+River,+OR/Government+Camp,+OR'],
  ['Mount Hood','Cannon Beach','约 3.2 小时','约 136 英里','Government+Camp,+OR/Cannon+Beach,+OR'],
  ['Cannon Beach','Crescent City','约 8.6 小时','约 341 英里，沿 US‑101','Cannon+Beach,+OR/Newport,+OR/Florence,+OR/Coos+Bay,+OR/Gold+Beach,+OR/Crescent+City,+CA'],
  ['Crescent City','San Francisco','约 8.3 小时','约 373 英里，经红杉林','Crescent+City,+CA/Jedediah+Smith+Redwoods+State+Park/Eureka,+CA/San+Francisco,+CA']
 ],
 relaxed:[
  ['San Francisco','Redding','约 4.1 小时','约 217 英里','San+Francisco,+CA/Redding,+CA'],
  ['Redding','Eugene','约 5–5.5 小时','约 315 英里，经 Siskiyou Pass','Redding,+CA/Ashland,+OR/Eugene,+OR'],
  ['Eugene','Mount Hood','约 3–4 小时','约 152 英里，经 Portland','Eugene,+OR/Portland,+OR/Government+Camp,+OR'],
  ['Mount Hood','Cannon Beach','约 3.2 小时','约 136 英里','Government+Camp,+OR/Cannon+Beach,+OR'],
  ['Cannon Beach','Medford','约 6 小时','约 340 英里，经 Portland','Cannon+Beach,+OR/Portland,+OR/Medford,+OR'],
  ['Medford','San Francisco','约 6–7 小时','约 360 英里，经 I‑5','Medford,+OR/San+Francisco,+CA']
 ],
 coast:[
  ['San Francisco','Redding','约 4.1 小时','约 217 英里','San+Francisco,+CA/Redding,+CA'],
  ['Redding','Eugene','约 5–5.5 小时','约 315 英里','Redding,+CA/Eugene,+OR'],
  ['Eugene','Mount Hood','约 3–4 小时','约 152 英里','Eugene,+OR/Government+Camp,+OR'],
  ['Mount Hood','Cannon Beach','约 3.2 小时','约 136 英里','Government+Camp,+OR/Cannon+Beach,+OR'],
  ['Cannon Beach','Florence','约 4–4.5 小时','约 158 英里，经 Newport','Cannon+Beach,+OR/Newport,+OR/Florence,+OR'],
  ['Florence','Gold Beach','约 3–3.5 小时','约 130–150 英里，经 Bandon','Florence,+OR/Bandon,+OR/Gold+Beach,+OR'],
  ['Gold Beach','Eureka','约 3–4 小时','约 140 英里，经红杉林','Gold+Beach,+OR/Crescent+City,+CA/Redwood+National+and+State+Parks/Eureka,+CA'],
  ['Eureka','San Francisco','约 5–6 小时','约 270 英里','Eureka,+CA/San+Francisco,+CA']
 ]
};
const routePaths = {
 original:['San Francisco','Redding','Ashland','Silverton','Multnomah Falls','Mount Hood','Cannon Beach','Newport','Florence','Gold Beach','Crescent City','Redwood Forest','Eureka','San Francisco'],
 relaxed:['San Francisco','Redding','Ashland','Eugene','Portland','Mount Hood','Portland','Cannon Beach','Portland','Medford','Ashland','Redding','San Francisco'],
 coast:['San Francisco','Redding','Ashland','Eugene','Portland','Mount Hood','Portland','Cannon Beach','Newport','Florence','Bandon','Gold Beach','Crescent City','Redwood Forest','Eureka','San Francisco']
};
const routeStops = {
 original:['San Francisco','Redding','Silverton','Multnomah Falls','Mount Hood','Cannon Beach','Crescent City','Redwood Forest'],
 relaxed:['San Francisco','Redding','Eugene','Mount Hood','Cannon Beach','Medford'],
 coast:['San Francisco','Redding','Eugene','Mount Hood','Cannon Beach','Newport','Florence','Bandon','Gold Beach','Redwood Forest','Eureka']
};
const coordinates = {
 'San Francisco':[37.7749,-122.4194],Redding:[40.5865,-122.3917],Ashland:[42.1946,-122.7095],Silverton:[45.0051,-122.7832],
 'Multnomah Falls':[45.5785,-122.1158],'Mount Hood':[45.3046,-121.7561],'Cannon Beach':[45.8918,-123.9615],
 Newport:[44.6368,-124.0535],Florence:[43.9826,-124.0998],Bandon:[43.1189,-124.4084],'Gold Beach':[42.4073,-124.4218],
 'Crescent City':[41.7558,-124.2026],'Redwood Forest':[41.7885,-124.1067],Eureka:[40.8021,-124.1637],
 Eugene:[44.0521,-123.0868],Portland:[45.5152,-122.6784],Medford:[42.3265,-122.8756],'Crater Lake':[42.9446,-122.109]
};
const renderDay=d=>`<article class="day"><div class="day-date"><strong>${d.date}</strong><span>${d.weekday}</span></div><div class="day-body"><div><h3>${d.title}</h3><p>${d.body}</p><div class="day-schedule">${d.times.map(t=>`<span>${t}</span>`).join('')}</div></div><div class="day-aside"><b>${d.drive}</b><span>${d.stay}</span><small class="day-risk">留意：${d.risk}</small></div></div></article>`;
let map, routeLayer;
if(window.L){
 map=L.map('map',{scrollWheelZoom:false,zoomControl:false}).setView([43.1,-122.9],6);
 L.control.zoom({position:'bottomright'}).addTo(map);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap 贡献者',maxZoom:18}).addTo(map);
 routeLayer=L.layerGroup().addTo(map);
}
function renderRoute(key){
 const legs=routeLegs[key];
 document.querySelector('#map-plan-name').textContent=planVariants[key].name;
 document.querySelector('#route-grid').innerHTML=legs.length?legs.map((leg,i)=>`<a class="route-leg" href="https://www.google.com/maps/dir/${leg[4]}" target="_blank" rel="noopener"><b>${String(i+1).padStart(2,'0')} · ${leg[0]} → ${leg[1]} ↗</b><span>${leg[2]}</span><small>${leg[3]}</small></a>`).join(''):'<p class="route-empty">选择出发地点并完成每天的住宿地后，这里会显示分段路线和导航链接。</p>';
 const fullRoute=document.querySelector('#full-route-link');
 fullRoute.hidden=!legs.length;
 if(legs.length)fullRoute.href=`https://www.google.com/maps/dir/${legs.map((leg,i)=>i===0?leg[4]:leg[4].split('/').slice(1).join('/')).join('/')}`;
 else fullRoute.removeAttribute('href');
 if(!map)return;
 routeLayer.clearLayers();
 const active=new Set(routeStops[key]);
 const path=routePaths[key];
 if(path.length>1)L.polyline(path.map(name=>coordinates[name]),{color:'#e5744c',weight:3,opacity:.9,dashArray:'7,7'}).addTo(routeLayer);
 Object.entries(coordinates).filter(([name])=>name!=='Crater Lake').forEach(([name,coord])=>{
  const state=active.has(name)?'':'skip';
  L.marker(coord,{icon:L.divIcon({className:'',html:`<div class="map-pin ${state}"></div>`,iconSize:[18,18],iconAnchor:[9,9]})}).addTo(routeLayer)
   .bindPopup(`<b>${name}</b><br>${active.has(name)?'当前方案节点':'当前方案不安排停留'}`);
 });
 const craterSelected=active.has('Crater Lake');
 L.marker(coordinates['Crater Lake'],{icon:L.divIcon({className:'',html:`<div class="map-pin ${craterSelected?'':'optional'}"></div>`,iconSize:[18,18],iconAnchor:[9,9]})}).addTo(routeLayer).bindPopup(`<b>Crater Lake</b><br>${craterSelected?'已加入自定义计划；出发前核查道路开放':'天气备选，不在当前路线'}`);
 document.querySelector('#crater-legend-dot').className=`legend-dot ${craterSelected?'orange':'blue'}`;
 document.querySelector('#crater-legend-label').textContent=craterSelected?'火山口湖已选，注意封路':'火山口湖天气备选';
 const labels=legs.map((leg,i)=>{
  const from=coordinates[leg[0]],to=coordinates[leg[1]];
  return {time:leg[2].replace('约 ','').replace(' 小时','h'),point:[(from[0]+to[0])/2,(from[1]+to[1])/2],index:i};
 });
 labels.filter(({time})=>time!=='0h').forEach(({time,point,index})=>L.circleMarker(point,{radius:0,opacity:0,fillOpacity:0}).addTo(routeLayer).bindTooltip(`${index+1} · ${time}`,{permanent:true,direction:'center',className:'route-label'}));
 if(path.length>1)map.fitBounds(L.latLngBounds(path.map(name=>coordinates[name])),{padding:[35,35]});
 else map.setView(path.length?coordinates[path[0]]:[43.1,-122.9],path.length?7:6);
}
let lastPreset='relaxed';
function showPlan(key){
 const plan=planVariants[key];
 if(!plan)return;
 if(key!=='custom')lastPreset=key;
 document.querySelector('#plan-eyebrow').textContent=plan.eyebrow;
 document.querySelector('#plan-title').innerHTML=plan.title;
 document.querySelector('#plan-miles').textContent=plan.miles;
 document.querySelector('#plan-hours').textContent=plan.hours;
 document.querySelector('#plan-warning').textContent=plan.warning;
 document.querySelector('#timeline').innerHTML=plan.days.length?plan.days.map(renderDay).join(''):'<p class="plan-empty">选择出发地点并完成每天的住宿地后，这里会显示每日安排。</p>';
 document.querySelector('#plan-dropped-tags').innerHTML=plan.dropped.map(tag=>`<span class="drop-tag">${tag} <b>✕</b></span>`).join('');
 document.querySelector('#plan-dropped-note').textContent=plan.droppedNote;
 document.querySelector('#plan-dropped').hidden=key==='custom'&&!plan.ready;
 document.querySelector('#footer-route').innerHTML=key==='custom'?`${plan.start?`${plan.start} → SF<br>`:''}自定义计划 · 不绑定日期`:`SF → OREGON → SF<br>2026.12.25 出发 · ${plan.returnDate} 返回`;
 document.querySelector('#hero-intro').textContent=key==='custom'?'选择出发地点，再按自己的节奏安排雪山、海岸与北加州的每日路线。':'12 月 25 日从旧金山出发，从三条预设路线挑一条，也可以按自己的节奏安排雪山、海岸与北加州。';
 document.querySelector('#hero-depart-pill').textContent=key==='custom'?'不绑定日期':'12.25 出发';
 document.querySelector('#hero-origin-pill').textContent=key==='custom'?(plan.start?`${plan.start} 出发`:'出发地点待选'):'旧金山往返';
 document.querySelectorAll('.plan-option').forEach(button=>{const active=button.dataset.plan===key;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
 document.querySelector('#custom-builder').hidden=key!=='custom';
 document.querySelector('#custom-trigger').classList.toggle('is-active',key==='custom');
 document.querySelector('#custom-trigger').setAttribute('aria-pressed',String(key==='custom'));
 document.querySelector('#route-estimate-explain').textContent=key==='custom'?'自定义车程按已整理路段的道路走廊粗估，不是实时路由；未含交通、休息、游览或冬季延误。':'里程与基础车程为规划估算；未含交通、休息、游览或冬季延误。';
 renderRoute(key);
}
document.querySelectorAll('.plan-option').forEach(button=>button.addEventListener('click',()=>showPlan(button.dataset.plan)));
showPlan('relaxed');

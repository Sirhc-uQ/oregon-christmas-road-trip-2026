// The custom planner uses a small, curated road graph. Its numbers are planning estimates, not live routing.
const customTemplates = {
  relaxed: [
    {stay:'Redding',stops:[]},{stay:'Eugene',stops:[]},{stay:'Mount Hood',stops:[]},
    {stay:'Mount Hood',stops:[]},{stay:'Cannon Beach',stops:[]},{stay:'Medford',stops:[]},
    {stay:'San Francisco',stops:[]}
  ],
  coast: [
    {stay:'Redding',stops:[]},{stay:'Eugene',stops:[]},{stay:'Mount Hood',stops:[]},
    {stay:'Mount Hood',stops:[]},{stay:'Cannon Beach',stops:[]},{stay:'Florence',stops:['Newport']},
    {stay:'Gold Beach',stops:['Bandon']},{stay:'Eureka',stops:['Redwood Forest']},
    {stay:'San Francisco',stops:[]}
  ],
  original: [
    {stay:'Redding',stops:[]},{stay:'Silverton',stops:['Ashland']},
    {stay:'Mount Hood',stops:['Multnomah Falls']},{stay:'Mount Hood',stops:[]},
    {stay:'Cannon Beach',stops:[]},{stay:'Crescent City',stops:['Newport']},
    {stay:'San Francisco',stops:['Redwood Forest']}
  ]
};
const lodgingPlaces=['Redding','Ashland','Medford','Eugene','Silverton','Portland','Mount Hood','Cannon Beach','Newport','Florence','Bandon','Gold Beach','Crescent City','Eureka'];
const attractionPlaces=['Silverton','Multnomah Falls','Mount Hood','Cannon Beach','Newport','Florence','Bandon','Gold Beach','Redwood Forest','Crater Lake'];
const transitPlaces=['Redding','Ashland','Medford','Eugene','Portland','Crescent City','Eureka'];
const mapSearch={
  'San Francisco':'San Francisco, CA',Redding:'Redding, CA',Ashland:'Ashland, OR',Medford:'Medford, OR',
  Eugene:'Eugene, OR',Silverton:'Silverton, OR',Portland:'Portland, OR',
  'Mount Hood':'Government Camp, OR','Cannon Beach':'Cannon Beach, OR',Newport:'Newport, OR',
  Florence:'Florence, OR',Bandon:'Bandon, OR','Gold Beach':'Gold Beach, OR',
  'Crescent City':'Crescent City, CA','Redwood Forest':'Jedediah Smith Redwoods State Park',
  Eureka:'Eureka, CA','Multnomah Falls':'Multnomah Falls, OR','Crater Lake':'Crater Lake Rim Village, OR'
};
const roadEdges=[
  ['San Francisco','Redding',217,4.1],['Redding','Ashland',130,2.4],['Ashland','Medford',13,.3],
  ['Medford','Eugene',170,3.3],['Eugene','Portland',110,2],['Portland','Silverton',43,.9],
  ['Ashland','Silverton',258,5.4],
  ['Silverton','Multnomah Falls',59,1.3],['Multnomah Falls','Mount Hood',55,1.4],
  ['Portland','Mount Hood',55,1.7],['Portland','Cannon Beach',80,1.7],
  ['Cannon Beach','Newport',120,3],['Newport','Florence',50,1.3],
  ['Florence','Bandon',70,1.8],['Bandon','Gold Beach',60,1.6],
  ['Gold Beach','Crescent City',55,1.3],['Crescent City','Redwood Forest',15,.4],
  ['Redwood Forest','Eureka',85,1.8],['Eureka','San Francisco',270,5.5],
  ['Medford','San Francisco',360,6.5],['Redding','Eugene',315,5.3],
  ['Eugene','Mount Hood',152,3.5],['Mount Hood','Cannon Beach',136,3.2],
  ['Cannon Beach','Medford',340,6],['Florence','Gold Beach',140,3.3],
  ['Gold Beach','Eureka',140,3.5],['Cannon Beach','Crescent City',341,8.6],
  ['Medford','Crater Lake',80,2.3],['Crater Lake','Eugene',160,4.1]
];
const roadGraph={};
roadEdges.forEach(([from,to,miles,hours])=>{
  (roadGraph[from]??=[]).push({to,miles,hours});
  (roadGraph[to]??=[]).push({to:from,miles,hours});
});
function roadRoute(from,to){
  if(from===to)return {nodes:[from],miles:0,hours:0};
  const distance={[from]:0},previous={},pending=new Set(Object.keys(roadGraph));
  while(pending.size){
    const current=[...pending].reduce((best,name)=>distance[name]<(distance[best]??Infinity)?name:best);
    if(distance[current]===undefined)break;
    pending.delete(current);
    if(current===to)break;
    roadGraph[current].forEach(edge=>{
      if(!pending.has(edge.to))return;
      const next=distance[current]+edge.hours;
      if(next<(distance[edge.to]??Infinity)){distance[edge.to]=next;previous[edge.to]={from:current,edge};}
    });
  }
  if(!previous[to])throw new Error(`No road corridor: ${from} → ${to}`);
  const nodes=[to];let miles=0,hours=0;
  while(nodes[0]!==from){
    const step=previous[nodes[0]];
    miles+=step.edge.miles;hours+=step.edge.hours;nodes.unshift(step.from);
  }
  return {nodes,miles,hours};
}
const numberLabel=n=>Number(n.toFixed(1)).toString();
const googlePath=names=>names.map(name=>encodeURIComponent(mapSearch[name])).join('/');
const startPlaces=['San Francisco',...lodgingPlaces];
const validStops=new Set([...attractionPlaces,...transitPlaces]);
const customStorageKey='oregon-road-trip-custom-v2';
const oldCustomStorageKey='oregon-road-trip-custom-v1';
let customStart,customDays;
function loadCustomTemplate(key){
  customStart='San Francisco';
  customDays=customTemplates[key].map(day=>({stay:day.stay,stops:[...day.stops]}));
}
function validDraft(start,days){
  return startPlaces.includes(start)||start===''
    ? Array.isArray(days)&&days.length<=10&&days.every((day,index)=>day&&
      (index===days.length-1?day.stay==='San Francisco':day.stay===''||lodgingPlaces.includes(day.stay))&&
      Array.isArray(day.stops)&&day.stops.every(name=>validStops.has(name)))
    : false;
}
function loadSavedCustom(){
  try{
    const saved=JSON.parse(localStorage.getItem(customStorageKey));
    if(saved&&validDraft(saved.start,saved.days)){
      customStart=saved.start;
      customDays=saved.days.map(day=>({stay:day.stay,stops:[...new Set(day.stops)]}));
      return true;
    }
    const old=JSON.parse(localStorage.getItem(oldCustomStorageKey));
    if(Array.isArray(old)&&validDraft('San Francisco',old)){
      customStart='San Francisco';
      customDays=old.map(day=>({stay:day.stay,stops:[...new Set(day.stops)]}));
      return true;
    }
  }catch{}
  return false;
}
function buildCustomPlan(){
  const ready=Boolean(customStart&&customDays.length&&customDays.every(day=>day.stay));
  if(!ready){
    routeLegs.custom=[];
    routePaths.custom=customStart?[customStart]:[];
    routeStops.custom=customStart?[customStart]:[];
    planVariants.custom={name:'自定义计划',start:customStart,ready:false,
      eyebrow:'04 / 每日安排 · 自定义计划',title:'自定义计划，<br><em>按自己的节奏出发。</em>',
      miles:'里程待计算',hours:'驾驶时间待计算',
      warning:!customStart?'请选择出发地点，然后逐日添加路线。':
        !customDays.length?'点击「增加一天」，开始安排路线。':'请为每个非终点日选择住宿地，完成路线后会计算里程和车程。',
      days:[],dropped:[],droppedNote:''};
    return {dayEstimates:customDays.map(()=>null)};
  }
  const legs=[],path=[customStart],active=new Set([customStart]);
  const days=[],dayEstimates=[];let totalMiles=0,totalHours=0,maxHours=0;
  customDays.forEach((day,index)=>{
    const origin=index?customDays[index-1].stay:customStart;
    const visits=[origin,...day.stops,day.stay].filter((name,i,items)=>i===0||name!==items[i-1]);
    let dayMiles=0,dayHours=0;
    for(let i=1;i<visits.length;i++){
      const segment=roadRoute(visits[i-1],visits[i]);
      dayMiles+=segment.miles;dayHours+=segment.hours;
      path.push(...segment.nodes.slice(1));
    }
    visits.forEach(name=>active.add(name));
    totalMiles+=dayMiles;totalHours+=dayHours;maxHours=Math.max(maxHours,dayHours);
    const miles=Math.round(dayMiles),hours=numberLabel(dayHours);
    const title=origin===day.stay?`${origin} 当地停留`:`${origin} → ${day.stay}`;
    const risk=[dayHours>=7?'驾驶时间偏长':dayHours>=5.5?'留足休息与补能时间':'按天气调整停靠',
      visits.includes('Mount Hood')?'山区冰雪与牵引要求':'',
      visits.includes('Crater Lake')?'Crater Lake 道路可能关闭':'',
      visits.some(name=>['Cannon Beach','Newport','Florence','Bandon','Gold Beach'].includes(name))?'海岸风雨与高浪':''].filter(Boolean).join('；');
    days.push({date:`第 ${index+1} 天`,weekday:'',title,
      body:day.stops.length?`依次停靠 ${day.stops.join(' → ')}，再前往 ${day.stay}。车程按已整理道路走廊估算，实际导航和冬季路况可能改变用时。`:
        origin===day.stay?`把这一天留给 ${origin}；当地短途与活动时间未计入基础车程。`:
        `从 ${origin} 前往 ${day.stay}，沿途按路况安排休息与补能。`,
      times:day.stops.length?day.stops.map(name=>`停靠 ${name}`):['按路况休息与补能'],
      drive:dayMiles?`约 ${miles} 英里 · 基础车程 ${hours} 小时`:'当地活动 · 基础车程 0 小时',
      stay:index===customDays.length-1?'终点 San Francisco':`住 ${day.stay}`,risk});
    dayEstimates.push({miles,hours});
    legs.push([origin,day.stay,`约 ${hours} 小时`,`约 ${miles} 英里 · 第 ${index+1} 天`,googlePath(visits)]);
  });
  routeLegs.custom=legs;routePaths.custom=path;routeStops.custom=[...active];
  const dropped=attractionPlaces.filter(name=>!active.has(name)).map(name=>name==='Redwood Forest'?'红杉森林':name);
  const longDays=dayEstimates.flatMap((estimate,index)=>Number(estimate.hours)>=7?[`第 ${index+1} 天`]:[]);
  const warnings=[];
  if(longDays.length)warnings.push(`${longDays.join('、')} 的基础车程达到或超过 7 小时，应减少停靠或增加一天。`);
  if(active.has('Crater Lake'))warnings.push('Crater Lake 冬季道路可能关闭，不能作为必到点；出发前核查 NPS 路况。');
  warnings.push('所有时间都是静态道路走廊粗估，未含充电、游览、用餐、休息与冬季延误。');
  planVariants.custom={name:'自定义计划',start:customStart,ready:true,
    eyebrow:`04 / 每日安排 · 自定义计划 · ${customDays.length} 天`,
    title:'自定义计划，<br><em>按自己的节奏出发。</em>',
    miles:`约 ${Math.round(totalMiles)} 英里`,hours:`约 ${numberLabel(totalHours)} 小时基础驾驶`,
    warning:warnings.join(' '),days,dropped:dropped.length?dropped:['没有未选的候选景点'],
    droppedNote:`最长单日基础驾驶约 ${numberLabel(maxHours)} 小时。以上取舍仅根据明确选择的停靠点和住宿地判断；途经城市不算游览。`};
  return {dayEstimates};
}
function renderCustomEditor(){
  const estimates=buildCustomPlan().dayEstimates;
  document.querySelector('#custom-start').value=customStart;
  document.querySelector('#custom-total-summary').textContent=`${customDays.length} 天 · ${planVariants.custom.miles} · ${planVariants.custom.hours}`;
  document.querySelector('#custom-day-list').innerHTML=customDays.length?customDays.map((day,index)=>{
    const origin=index?customDays[index-1].stay:customStart;
    const last=index===customDays.length-1;
    const lodging=last?'<strong class="custom-fixed-stay">San Francisco · 行程终点</strong>':
      `<select class="custom-stay" data-day="${index}" aria-label="第 ${index+1} 天住宿地"><option value="">请选择住宿地</option>${lodgingPlaces.map(name=>`<option value="${name}" ${name===day.stay?'selected':''}>${name}</option>`).join('')}</select>`;
    const stopOptions=`<option value="">选择沿途停靠点</option><optgroup label="景点与活动">${attractionPlaces.map(name=>`<option value="${name}">${name}</option>`).join('')}</optgroup><optgroup label="中转城市">${transitPlaces.map(name=>`<option value="${name}">${name}</option>`).join('')}</optgroup>`;
    const chips=day.stops.length?day.stops.map((name,stopIndex)=>`<div class="custom-stop-chip"><span>${stopIndex+1}. ${name}</span><button type="button" data-action="up" data-day="${index}" data-stop="${stopIndex}" aria-label="将 ${name} 提前" ${stopIndex===0?'disabled':''}>↑</button><button type="button" data-action="down" data-day="${index}" data-stop="${stopIndex}" aria-label="将 ${name} 后移" ${stopIndex===day.stops.length-1?'disabled':''}>↓</button><button type="button" data-action="remove" data-day="${index}" data-stop="${stopIndex}" aria-label="移除 ${name}">×</button></div>`).join(''):'<small class="custom-empty">这天尚未加入额外停靠点</small>';
    return `<article class="custom-day"><div class="custom-day-top"><div><b>第 ${index+1} 天</b></div><strong>${estimates[index]?`约 ${estimates[index].miles} 英里 · ${estimates[index].hours} 小时`:'里程与车程待计算'}</strong></div><p class="custom-day-origin">从 ${origin||'待选地点'} 出发</p><div class="custom-stop-list">${chips}</div><div class="custom-day-fields"><label>添加停靠点<select class="custom-stop-select" data-day="${index}" aria-label="第 ${index+1} 天添加停靠点">${stopOptions}</select></label><button type="button" data-action="add-stop" data-day="${index}">添加 ↗</button><label>当晚住宿地${lodging}</label></div></article>`;
  }).join(''):'<div class="custom-blank">还没有安排天数。选择出发地点后，点击「增加一天」开始规划。</div>';
  document.querySelector('#custom-add-day').disabled=customDays.length>=10;
  document.querySelector('#custom-remove-day').disabled=customDays.length===0;
}
function refreshCustom(){
  renderCustomEditor();showPlan('custom');
  try{
    if(customStart||customDays.length)localStorage.setItem(customStorageKey,JSON.stringify({start:customStart,days:customDays}));
    else{localStorage.removeItem(customStorageKey);localStorage.removeItem(oldCustomStorageKey);}
  }catch{}
}
document.querySelector('#custom-start').innerHTML+=[...startPlaces].map(name=>`<option value="${name}">${name}</option>`).join('');
document.querySelector('#custom-trigger').addEventListener('click',()=>{
  if(!customDays){if(!loadSavedCustom()){customStart='';customDays=[];}}
  refreshCustom();
});
document.querySelector('#custom-clear').addEventListener('click',()=>{
  customStart='';customDays=[];
  try{localStorage.removeItem(customStorageKey);localStorage.removeItem(oldCustomStorageKey);}catch{}
  refreshCustom();
});
document.querySelectorAll('[data-import]').forEach(button=>button.addEventListener('click',()=>{
  loadCustomTemplate(button.dataset.import);refreshCustom();
}));
document.querySelector('#custom-start').addEventListener('change',event=>{
  customStart=event.target.value;refreshCustom();
});
document.querySelector('#custom-add-day').addEventListener('click',()=>{
  if(customDays.length>=10)return;
  if(customDays.length===0)customDays.push({stay:'San Francisco',stops:[]});
  else customDays.splice(-1,0,{stay:'',stops:[]});
  refreshCustom();
});
document.querySelector('#custom-remove-day').addEventListener('click',()=>{
  if(customDays.length===0)return;
  if(customDays.length===1)customDays.pop();
  else customDays.splice(-2,1);
  refreshCustom();
});
document.querySelector('#custom-day-list').addEventListener('change',event=>{
  if(!event.target.matches('.custom-stay'))return;
  customDays[Number(event.target.dataset.day)].stay=event.target.value;refreshCustom();
});
document.querySelector('#custom-day-list').addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');
  if(!button)return;
  const dayIndex=Number(button.dataset.day),stopIndex=Number(button.dataset.stop);
  const stops=customDays[dayIndex].stops;
  if(button.dataset.action==='add-stop'){
    const selected=button.closest('.custom-day-fields').querySelector('.custom-stop-select').value;
    if(selected&&!stops.includes(selected))stops.push(selected);
  }else if(button.dataset.action==='remove')stops.splice(stopIndex,1);
  else if(button.dataset.action==='up'&&stopIndex>0)[stops[stopIndex-1],stops[stopIndex]]=[stops[stopIndex],stops[stopIndex-1]];
  else if(button.dataset.action==='down'&&stopIndex<stops.length-1)[stops[stopIndex+1],stops[stopIndex]]=[stops[stopIndex],stops[stopIndex+1]];
  refreshCustom();
});
